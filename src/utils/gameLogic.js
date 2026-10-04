import { WINNING_COMBINATIONS, PLAYERS, AI_DIFFICULTIES } from '../constants/gameConstants';

/**
 * Evaluates the current board state to determine if a player has won.
 * 
 * @param {Array<string|null>} board - Current 9-element board state.
 * @returns {{ winner: string|null, winningCombo: number[]|null }}
 */
export const checkWinner = (board) => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCombo: [a, b, c],
      };
    }
  }

  return {
    winner: null,
    winningCombo: null,
  };
};

/**
 * Checks if all board cells are occupied.
 * 
 * @param {Array<string|null>} board
 * @returns {boolean}
 */
export const isBoardFull = (board) => {
  return board.every((cell) => cell !== null);
};

/**
 * Returns an array of indices that are currently empty.
 * 
 * @param {Array<string|null>} board
 * @returns {number[]}
 */
export const getAvailableMoves = (board) => {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
};

/**
 * Minimax recursive algorithm to compute the optimal move for AI.
 */
const minimax = (board, player, aiPlayer, humanPlayer, depth = 0) => {
  const { winner } = checkWinner(board);

  if (winner === aiPlayer) return { score: 10 - depth };
  if (winner === humanPlayer) return { score: depth - 10 };
  if (isBoardFull(board)) return { score: 0 };

  const availableMoves = getAvailableMoves(board);
  const moves = [];

  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    board[move] = player;

    const nextPlayer = player === aiPlayer ? humanPlayer : aiPlayer;
    const result = minimax(board, nextPlayer, aiPlayer, humanPlayer, depth + 1);

    moves.push({
      move,
      score: result.score,
    });

    board[move] = null; // Backtrack
  }

  // Choose the best move according to max/min strategy
  if (player === aiPlayer) {
    let bestScore = -Infinity;
    let bestMoveIndex = 0;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
    return moves[bestMoveIndex];
  } else {
    let bestScore = Infinity;
    let bestMoveIndex = 0;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
    return moves[bestMoveIndex];
  }
};

/**
 * Calculates the next move for the AI opponent.
 * 
 * @param {Array<string|null>} board
 * @param {string} aiPlayer
 * @param {string} difficulty
 * @returns {number|null} Index of the chosen cell (0..8) or null if no moves
 */
export const getAIMove = (board, aiPlayer = PLAYERS.O, difficulty = AI_DIFFICULTIES.HARD) => {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return null;

  const humanPlayer = aiPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;

  // In EASY mode: 40% random move, otherwise looks for immediate win or block
  if (difficulty === AI_DIFFICULTIES.EASY) {
    if (Math.random() < 0.4) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }

    // 1. Can AI win immediately?
    for (let move of availableMoves) {
      board[move] = aiPlayer;
      if (checkWinner(board).winner === aiPlayer) {
        board[move] = null;
        return move;
      }
      board[move] = null;
    }

    // 2. Can Human win immediately? Block it.
    for (let move of availableMoves) {
      board[move] = humanPlayer;
      if (checkWinner(board).winner === humanPlayer) {
        board[move] = null;
        return move;
      }
      board[move] = null;
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // In HARD mode: optimal Minimax (unbeatable)
  if (availableMoves.length === 9) {
    const openings = [0, 2, 4, 6, 8];
    return openings[Math.floor(Math.random() * openings.length)];
  }

  const best = minimax(board, aiPlayer, aiPlayer, humanPlayer);
  return best.move !== undefined ? best.move : availableMoves[0];
};
