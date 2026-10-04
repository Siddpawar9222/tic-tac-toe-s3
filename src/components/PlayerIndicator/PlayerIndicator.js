import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PLAYERS, GAME_MODES } from '../../constants/gameConstants';
import { COLORS, pulseOpacity } from '../../theme/theme';

const PlayerIndicator = ({ currentPlayer, isGameOver, gameMode, isAiThinking }) => {
  const isXTurn = currentPlayer === PLAYERS.X && !isGameOver;
  const isOTurn = currentPlayer === PLAYERS.O && !isGameOver;
  const oName = gameMode === GAME_MODES.AI ? 'AI (O)' : 'Player O';

  return (
    <Box sx={{ width: '100%' }} aria-label="Current Player Turn Information">
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          backgroundColor: COLORS.bgCard,
          p: { xs: 0.75, sm: 1 },
          borderRadius: 3.5,
          border: `1px solid ${COLORS.borderSubtle}`,
        }}
      >
        {/* Player X Badge */}
        <Box
          aria-current={isXTurn ? 'true' : 'false'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            p: { xs: '0.35rem 0.5rem', sm: '0.4rem 0.75rem' },
            borderRadius: 2,
            flex: 1,
            opacity: isXTurn ? 1 : 0.65,
            backgroundColor: isXTurn ? COLORS.bgElevated : 'transparent',
            border: isXTurn ? `1px solid ${COLORS.playerXBorder}` : '1px solid transparent',
            boxShadow: isXTurn ? `0 0 15px -3px ${COLORS.playerXGlow}` : 'none',
            transition: 'all 250ms ease',
          }}
        >
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              backgroundColor: COLORS.playerXBg,
              color: COLORS.playerX,
              border: `1px solid ${COLORS.playerXBorder}`,
            }}
          >
            X
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' }, fontWeight: 600, color: 'text.primary', whiteSpace: 'nowrap' }}>
              Player X
            </Typography>
            {isXTurn && (
              <Typography
                sx={{
                  fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: COLORS.playerX,
                  animation: `${pulseOpacity} 1.5s ease-in-out infinite`,
                }}
              >
                Your Turn
              </Typography>
            )}
          </Box>
        </Box>

        {/* VS Divider */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              fontSize: '0.75rem',
              color: '#64748b',
              backgroundColor: COLORS.bgApp,
              px: 1,
              py: 0.35,
              borderRadius: 9999,
              border: `1px solid ${COLORS.borderSubtle}`,
            }}
          >
            VS
          </Typography>
        </Box>

        {/* Player O Badge */}
        <Box
          aria-current={isOTurn ? 'true' : 'false'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            p: { xs: '0.35rem 0.5rem', sm: '0.4rem 0.75rem' },
            borderRadius: 2,
            flex: 1,
            opacity: isOTurn ? 1 : 0.65,
            backgroundColor: isOTurn ? COLORS.bgElevated : 'transparent',
            border: isOTurn ? `1px solid ${COLORS.playerOBorder}` : '1px solid transparent',
            boxShadow: isOTurn ? `0 0 15px -3px ${COLORS.playerOGlow}` : 'none',
            transition: 'all 250ms ease',
          }}
        >
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              backgroundColor: COLORS.playerOBg,
              color: COLORS.playerO,
              border: `1px solid ${COLORS.playerOBorder}`,
            }}
          >
            O
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' }, fontWeight: 600, color: 'text.primary', whiteSpace: 'nowrap' }}>
              {oName}
            </Typography>
            {isOTurn && (
              <Typography
                sx={{
                  fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: COLORS.playerO,
                  animation: `${pulseOpacity} 1.5s ease-in-out infinite`,
                }}
              >
                {isAiThinking ? 'Thinking...' : 'Your Turn'}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default React.memo(PlayerIndicator);
