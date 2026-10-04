/**
 * Constants governing Tic-Tac-Toe gameplay, symbols, and settings.
 */

export const PLAYERS = {
  X: 'X',
  O: 'O',
};

export const GAME_MODES = {
  PVP: 'pvp', // Player vs Player (Local)
  AI: 'ai',   // Player vs AI
};

export const AI_DIFFICULTIES = {
  EASY: 'easy',
  HARD: 'hard', // Unbeatable minimax algorithm
};

/**
 * All 8 possible winning combinations on a standard 3x3 board.
 * Stored as index triplets [0..8].
 */
export const WINNING_COMBINATIONS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

export const INITIAL_BOARD = Array(9).fill(null);

export const INITIAL_SCORES = {
  [PLAYERS.X]: 0,
  [PLAYERS.O]: 0,
  draws: 0,
};
