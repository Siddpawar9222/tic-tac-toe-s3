import React from 'react';
import { Box } from '@mui/material';
import GameCell from './GameCell';
import { COLORS } from '../../theme/theme';

const GameBoard = ({
  board,
  winningCombo,
  onCellClick,
  currentPlayer,
  isGameOver,
  isAiThinking,
}) => {
  return (
    <Box
      component="section"
      aria-label="Tic-Tac-Toe Board"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        role="grid"
        aria-label="3 by 3 game board"
        sx={{
          width: '100%',
          maxWidth: { xs: 320, sm: 380 },
          aspectRatio: '1 / 1',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: { xs: 1, sm: 1.25 },
          p: { xs: 1, sm: 1.25 },
          backgroundColor: COLORS.bgCard,
          borderRadius: 4,
          border: `1px solid ${COLORS.borderSubtle}`,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          userSelect: 'none',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default React.memo(GameBoard);
