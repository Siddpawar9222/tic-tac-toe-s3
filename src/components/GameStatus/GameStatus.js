import React from 'react';
import { FiAward, FiRotateCcw } from 'react-icons/fi';
import { PLAYERS, GAME_MODES } from '../../constants/gameConstants';
import './GameStatus.css';

const GameStatus = ({
  winner,
  isDraw,
  isGameOver,
  currentPlayer,
  gameMode,
  isAiThinking,
  onPlayAgain,
}) => {
  if (!isGameOver) {
    let turnText;
    if (isAiThinking) {
      turnText = 'AI is thinking...';
    } else if (gameMode === GAME_MODES.AI) {
      turnText = currentPlayer === PLAYERS.X ? "Your turn (Player X)" : "AI's turn (Player O)";
    } else {
      turnText = `Player ${currentPlayer}'s turn`;
    }

    return (
      <div className="status-container status-active" aria-live="polite">
        <span className="status-dot"></span>
        <span className="status-message">{turnText}</span>
      </div>
    );
  }

  const isWinnerX = winner === PLAYERS.X;

  let titleText = '';
  let badgeClass = '';

  if (winner) {
    if (gameMode === GAME_MODES.AI) {
      titleText = isWinnerX ? 'You Won! 🎉' : 'AI Won! 🤖';
    } else {
      titleText = `Player ${winner} Wins! 🎉`;
    }
    badgeClass = isWinnerX ? 'status-won-x' : 'status-won-o';
  } else if (isDraw) {
    titleText = 'Game Draw! 🤝';
    badgeClass = 'status-drawn';
  }

  return (
    <div
      className={`status-container status-completed ${badgeClass}`}
      role="status"
      aria-live="assertive"
    >
      <div className="status-result-content">
        <div className="result-headline">
          <FiAward className="result-icon" aria-hidden="true" />
          <span className="result-title">{titleText}</span>
        </div>
        <button
          type="button"
          className="btn-play-again"
          onClick={onPlayAgain}
          autoFocus
        >
          <FiRotateCcw className="btn-icon" aria-hidden="true" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(GameStatus);
