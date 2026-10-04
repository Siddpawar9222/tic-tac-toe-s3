import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  PLAYERS,
  GAME_MODES,
  AI_DIFFICULTIES,
  INITIAL_BOARD,
  INITIAL_SCORES,
} from '../constants/gameConstants';
import { checkWinner, isBoardFull, getAIMove } from '../utils/gameLogic';
import { playSound } from '../utils/audio';

const useTicTacToe = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.X);
  const [startingPlayer, setStartingPlayer] = useState(PLAYERS.X);
  const [gameMode, setGameMode] = useState(GAME_MODES.PVP);
  const [aiDifficulty, setAiDifficulty] = useState(AI_DIFFICULTIES.HARD);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem('tictactoe_scores');
      return saved ? JSON.parse(saved) : INITIAL_SCORES;
    } catch {
      return INITIAL_SCORES;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('tictactoe_sound');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const scoreRecordedRef = useRef(false);

  const winnerInfo = useMemo(() => checkWinner(board), [board]);
  const winner = winnerInfo.winner;
  const winningCombo = winnerInfo.winningCombo;

  const isDraw = useMemo(() => !winner && isBoardFull(board), [winner, board]);
  const isGameOver = Boolean(winner || isDraw);

  useEffect(() => {
    try {
      localStorage.setItem('tictactoe_scores', JSON.stringify(scores));
    } catch (e) {
      console.warn('Unable to persist scores to localStorage', e);
    }
  }, [scores]);

  useEffect(() => {
    try {
      localStorage.setItem('tictactoe_sound', JSON.stringify(soundEnabled));
    } catch (e) {
      console.warn('Unable to persist sound setting to localStorage', e);
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (isGameOver && !scoreRecordedRef.current) {
      scoreRecordedRef.current = true;
      if (winner) {
        playSound('win', soundEnabled);
        setScores((prev) => ({
          ...prev,
          [winner]: prev[winner] + 1,
        }));
      } else if (isDraw) {
        playSound('draw', soundEnabled);
        setScores((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
      }
    }
  }, [isGameOver, winner, isDraw, soundEnabled]);

  const makeMove = useCallback(
    (index, player) => {
      setBoard((prev) => {
        if (prev[index] !== null) return prev;
        const newBoard = [...prev];
        newBoard[index] = player;
        return newBoard;
      });

      playSound(player === PLAYERS.X ? 'move-x' : 'move-o', soundEnabled);
      setCurrentPlayer(player === PLAYERS.X ? PLAYERS.O : PLAYERS.X);
    },
    [soundEnabled]
  );

  const handleCellClick = useCallback(
    (index) => {
      if (board[index] !== null || isGameOver || isAiThinking) {
        return;
      }

      if (gameMode === GAME_MODES.AI && currentPlayer === PLAYERS.O) {
        return;
      }

      makeMove(index, currentPlayer);
    },
    [board, isGameOver, isAiThinking, gameMode, currentPlayer, makeMove]
  );

  useEffect(() => {
    let timerId;

    if (
      gameMode === GAME_MODES.AI &&
      currentPlayer === PLAYERS.O &&
      !isGameOver
    ) {
      setIsAiThinking(true);

      timerId = setTimeout(() => {
        const aiMove = getAIMove([...board], PLAYERS.O, aiDifficulty);
        if (aiMove !== null) {
          makeMove(aiMove, PLAYERS.O);
        }
        setIsAiThinking(false);
      }, 420);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [gameMode, currentPlayer, isGameOver, board, aiDifficulty, makeMove]);

  const startNextRound = useCallback(() => {
    playSound('reset', soundEnabled);
    scoreRecordedRef.current = false;
    const nextStarter = startingPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
    setStartingPlayer(nextStarter);
    setCurrentPlayer(nextStarter);
    setBoard(INITIAL_BOARD);
    setIsAiThinking(false);
  }, [startingPlayer, soundEnabled]);

  const resetGame = useCallback(() => {
    playSound('reset', soundEnabled);
    scoreRecordedRef.current = false;
    setStartingPlayer(PLAYERS.X);
    setCurrentPlayer(PLAYERS.X);
    setBoard(INITIAL_BOARD);
    setScores(INITIAL_SCORES);
    setIsAiThinking(false);
  }, [soundEnabled]);

  const switchGameMode = useCallback(
    (mode) => {
      if (mode === gameMode) return;
      playSound('reset', soundEnabled);
      scoreRecordedRef.current = false;
      setGameMode(mode);
      setStartingPlayer(PLAYERS.X);
      setCurrentPlayer(PLAYERS.X);
      setBoard(INITIAL_BOARD);
      setScores(INITIAL_SCORES);
      setIsAiThinking(false);
    },
    [gameMode, soundEnabled]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    winningCombo,
    isDraw,
    isGameOver,
    scores,
    gameMode,
    aiDifficulty,
    isAiThinking,
    soundEnabled,
    handleCellClick,
    startNextRound,
    resetGame,
    switchGameMode,
    setAiDifficulty,
    toggleSound,
  };
};

export default useTicTacToe;

