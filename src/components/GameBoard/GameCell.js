import React from 'react';
import { Box } from '@mui/material';
import { PLAYERS } from '../../constants/gameConstants';
import { COLORS, popIn, winPulse } from '../../theme/theme';

const GameCell = ({
  index,
  value,
  isWinningCell,
  onClick,
  disabled,
  currentPlayer,
  isGameOver,
  isAiThinking,
}) => {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  const accessibleLabel = value
    ? `Row ${row}, Column ${col}, Player ${value}`
    : `Row ${row}, Column ${col}, empty cell`;

  const isInteractive = !value && !disabled && !isGameOver && !isAiThinking;

  return (
    <Box
      component="button"
      type="button"
      onClick={() => onClick(index)}
      disabled={disabled || !isInteractive}
      aria-label={accessibleLabel}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: isWinningCell ? COLORS.bgElevated : COLORS.bgCell,
        borderRadius: { xs: 1.5, sm: 2 },
        border: isWinningCell
          ? `2px solid ${value === PLAYERS.X ? COLORS.playerX : COLORS.playerO}`
          : `1px solid ${COLORS.borderSubtle}`,
        boxShadow: isWinningCell
          ? `0 0 20px ${value === PLAYERS.X ? COLORS.playerXGlow : COLORS.playerOGlow}`
          : 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 1, sm: 1.5 },
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'all 150ms ease',
        animation: isWinningCell ? `${winPulse} 1.8s ease-in-out infinite alternate` : 'none',
        zIndex: isWinningCell ? 2 : 1,
        outline: 'none',
        '&:focus-visible': {
          outline: '2px solid #6366f1',
          outlineOffset: '2px',
        },
        '&:hover': isInteractive
          ? {
              backgroundColor: COLORS.bgCellHover,
              borderColor: COLORS.borderMedium,
              transform: 'translateY(-2px)',
              boxShadow: 1,
              '& .ghost-mark': {
                opacity: 0.22,
              },
            }
          : {},
        '&:active': isInteractive ? { transform: 'translateY(0)' } : {},
      }}
    >
      {/* Symbol X */}
      {value === PLAYERS.X && (
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          style={{
            width: '70%',
            height: '70%',
            color: COLORS.playerX,
            filter: `drop-shadow(0 0 8px ${COLORS.playerXGlow})`,
            animation: `${popIn} 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
          }}
        >
          <line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
        </svg>
      )}

      {/* Symbol O */}
      {value === PLAYERS.O && (
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          style={{
            width: '70%',
            height: '70%',
            color: COLORS.playerO,
            filter: `drop-shadow(0 0 8px ${COLORS.playerOGlow})`,
            animation: `${popIn} 250ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
          }}
        >
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="13" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {/* Hover Preview for Current Player */}
      {!value && isInteractive && (
        <Box
          className="ghost-mark"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 800,
            opacity: 0,
            transition: 'opacity 150ms ease',
            pointerEvents: 'none',
            color: currentPlayer === PLAYERS.X ? COLORS.playerX : COLORS.playerO,
          }}
        >
          {currentPlayer}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(GameCell);
