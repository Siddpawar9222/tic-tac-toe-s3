import {
  checkWinner,
  isBoardFull,
  getAvailableMoves,
  getAIMove,
} from './gameLogic';
import { PLAYERS, AI_DIFFICULTIES } from '../constants/gameConstants';

describe('gameLogic utilities', () => {
  describe('checkWinner', () => {
    test('returns null winner for an empty board', () => {
      const board = Array(9).fill(null);
      const result = checkWinner(board);
      expect(result.winner).toBeNull();
      expect(result.winningCombo).toBeNull();
    });

    test('detects top row win for X', () => {
      const board = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null,
      ];
      const result = checkWinner(board);
      expect(result.winner).toBe(PLAYERS.X);
      expect(result.winningCombo).toEqual([0, 1, 2]);
    });

    test('detects middle column win for O', () => {
      const board = [
        'X', 'O', 'X',
        null, 'O', 'X',
        null, 'O', null,
      ];
      const result = checkWinner(board);
      expect(result.winner).toBe(PLAYERS.O);
      expect(result.winningCombo).toEqual([1, 4, 7]);
    });

    test('detects diagonal win for X', () => {
      const board = [
        'X', 'O', null,
        'O', 'X', null,
        null, null, 'X',
      ];
      const result = checkWinner(board);
      expect(result.winner).toBe(PLAYERS.X);
      expect(result.winningCombo).toEqual([0, 4, 8]);
    });

    test('detects anti-diagonal win for O', () => {
      const board = [
        'X', 'X', 'O',
        null, 'O', 'X',
        'O', null, null,
      ];
      const result = checkWinner(board);
      expect(result.winner).toBe(PLAYERS.O);
      expect(result.winningCombo).toEqual([2, 4, 6]);
    });
  });

  describe('isBoardFull', () => {
    test('returns false when at least one cell is empty', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', null];
      expect(isBoardFull(board)).toBe(false);
    });

    test('returns true when all cells are filled', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(isBoardFull(board)).toBe(true);
    });
  });

  describe('getAvailableMoves', () => {
    test('returns all 9 indices for an empty board', () => {
      const board = Array(9).fill(null);
      expect(getAvailableMoves(board)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test('returns remaining empty indices', () => {
      const board = [
        'X', null, 'O',
        null, 'X', null,
        'O', null, 'X',
      ];
      expect(getAvailableMoves(board)).toEqual([1, 3, 5, 7]);
    });
  });

  describe('getAIMove', () => {
    test('takes immediate winning move if available', () => {
      const board = [
        'O', 'O', null,
        'X', 'X', null,
        null, null, null,
      ];
      const move = getAIMove(board, PLAYERS.O, AI_DIFFICULTIES.HARD);
      expect(move).toBe(2);
    });

    test('blocks opponent from winning', () => {
      const board = [
        'X', 'X', null,
        'O', null, null,
        null, null, null,
      ];
      const move = getAIMove(board, PLAYERS.O, AI_DIFFICULTIES.HARD);
      expect(move).toBe(2);
    });

    test('returns null if no moves are available', () => {
      const fullBoard = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(getAIMove(fullBoard, PLAYERS.O)).toBeNull();
    });
  });
});
