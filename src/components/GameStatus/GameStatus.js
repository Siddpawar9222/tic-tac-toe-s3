import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { FiAward, FiRotateCcw } from 'react-icons/fi';
import { PLAYERS, GAME_MODES } from '../../constants/gameConstants';
import { COLORS, pulseDot, slideDown } from '../../theme/theme';

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
      <Box
        aria-live="polite"
        sx={{
          py: 0.65,
          px: 1.5,
          backgroundColor: COLORS.bgCard,
          border: `1px solid ${COLORS.borderSubtle}`,
          borderRadius: 9999,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          alignSelf: 'center',
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#6366f1',
            animation: `${pulseDot} 1.5s infinite`,
          }}
        />
        <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary' }}>
          {turnText}
        </Typography>
      </Box>
    );
  }

  // Result Banner
  const isWinnerX = winner === PLAYERS.X;
  let titleText = '';
  let bgColor = COLORS.drawBg;
  let borderColor = 'rgba(234, 179, 8, 0.3)';
  let textColor = '#fef08a';
  let iconColor = COLORS.draw;

  if (winner) {
    if (gameMode === GAME_MODES.AI) {
      titleText = isWinnerX ? 'You Won! 🎉' : 'AI Won! 🤖';
    } else {
      titleText = `Player ${winner} Wins! 🎉`;
    }
    bgColor = isWinnerX ? COLORS.playerXBg : COLORS.playerOBg;
    borderColor = isWinnerX ? COLORS.playerXBorder : COLORS.playerOBorder;
    textColor = isWinnerX ? COLORS.playerXLight : COLORS.playerOLight;
    iconColor = isWinnerX ? COLORS.playerX : COLORS.playerO;
  } else if (isDraw) {
    titleText = 'Game Draw! 🤝';
  }

  return (
    <Paper
      role="status"
      aria-live="assertive"
      elevation={0}
      sx={{
        width: '100%',
        py: 1,
        px: 1.75,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 3.5,
        animation: `${slideDown} 300ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="span" sx={{ color: iconColor, display: 'inline-flex', fontSize: '1.25rem' }}>
            <FiAward />
          </Box>
          <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: textColor }}>
            {titleText}
          </Typography>
        </Box>

        <Button
          size="small"
          onClick={onPlayAgain}
          autoFocus
          startIcon={<FiRotateCcw size={14} />}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            borderRadius: 9999,
            backgroundColor: '#f8fafc',
            color: '#000',
            fontWeight: 600,
            fontSize: '0.8125rem',
            textTransform: 'none',
            px: 1.75,
            py: 0.5,
            '&:hover': {
              backgroundColor: '#fff',
              transform: 'translateY(-1px)',
              boxShadow: 1,
            },
          }}
        >
          Play Again
        </Button>
      </Box>
    </Paper>
  );
};

export default React.memo(GameStatus);
