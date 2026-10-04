import React from 'react';
import GameCell from './GameCell';
import './GameBoard.css';

const GameBoard = ({
  board,
  winningCombo,
  onCellClick,
  currentPlayer,
  isGameOver,
  isAiThinking,
}) => {
  return (
    <section className="game-board-container" aria-label="Tic-Tac-Toe Board">
      <div className="game-board" role="grid" aria-label="3 by 3 game board">
        {board.map((cellValue, index) => {
          const isWinningCell = Boolean(winningCombo && winningCombo.includes(index));

          return (
            <GameCell
              key={index}
              index={index}
              value={cellValue}
              isWinningCell={isWinningCell}
              onClick={onCellClick}
              disabled={Boolean(cellValue || isGameOver || isAiThinking)}
              currentPlayer={currentPlayer}
              isGameOver={isGameOver}
              isAiThinking={isAiThinking}
            />
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(GameBoard);
