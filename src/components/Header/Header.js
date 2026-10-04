import React from 'react';
import { Box, Stack, Typography, Button, IconButton } from '@mui/material';
import { FiVolume2, FiVolumeX, FiUsers, FiCpu } from 'react-icons/fi';
import { GAME_MODES } from '../../constants/gameConstants';
import { COLORS } from '../../theme/theme';

const Header = ({ gameMode, onModeChange, soundEnabled, onToggleSound }) => {
  return (
    <Box component="header" sx={{ width: '100%', mb: 0.5 }}>
      {/* Top Bar: Mode Switcher & Sound Toggle */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', mb: 1 }}>
        <Box
          role="group"
          aria-label="Game Mode Selection"
          sx={{
            display: 'inline-flex',
            backgroundColor: COLORS.bgCard,
            border: `1px solid ${COLORS.borderSubtle}`,
            borderRadius: 9999,
            p: 0.35,
            gap: 0.5,
          }}
        >
          <Button
            size="small"
            onClick={() => onModeChange(GAME_MODES.PVP)}
            aria-pressed={gameMode === GAME_MODES.PVP}
            startIcon={<FiUsers size={15} />}
            sx={{
              borderRadius: 9999,
              textTransform: 'none',
              px: 1.5,
              py: 0.4,
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: gameMode === GAME_MODES.PVP ? '#fff' : 'text.secondary',
              backgroundColor: gameMode === GAME_MODES.PVP ? COLORS.bgElevated : 'transparent',
              border: gameMode === GAME_MODES.PVP ? `1px solid ${COLORS.borderMedium}` : '1px solid transparent',
              boxShadow: gameMode === GAME_MODES.PVP ? 1 : 0,
              '&:hover': {
                color: '#fff',
                backgroundColor: gameMode === GAME_MODES.PVP ? COLORS.bgElevated : COLORS.bgCardHover,
              },
            }}
          >
            2 Players
          </Button>

          <Button
            size="small"
            onClick={() => onModeChange(GAME_MODES.AI)}
            aria-pressed={gameMode === GAME_MODES.AI}
            startIcon={<FiCpu size={15} />}
            sx={{
              borderRadius: 9999,
              textTransform: 'none',
              px: 1.5,
              py: 0.4,
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: gameMode === GAME_MODES.AI ? '#fff' : 'text.secondary',
              backgroundColor: gameMode === GAME_MODES.AI ? COLORS.bgElevated : 'transparent',
              border: gameMode === GAME_MODES.AI ? `1px solid ${COLORS.borderMedium}` : '1px solid transparent',
              boxShadow: gameMode === GAME_MODES.AI ? 1 : 0,
              '&:hover': {
                color: '#fff',
                backgroundColor: gameMode === GAME_MODES.AI ? COLORS.bgElevated : COLORS.bgCardHover,
              },
            }}
          >
            vs AI
          </Button>
        </Box>

        <IconButton
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: COLORS.bgCard,
            border: `1px solid ${COLORS.borderSubtle}`,
            color: soundEnabled ? 'text.secondary' : COLORS.playerO,
            '&:hover': {
              backgroundColor: COLORS.bgCardHover,
              borderColor: COLORS.borderMedium,
              color: soundEnabled ? '#fff' : COLORS.playerOLight,
            },
          }}
        >
          {soundEnabled ? <FiVolume2 size={17} /> : <FiVolumeX size={17} />}
        </IconButton>
      </Stack>

      {/* Header Title & Subtitle */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.85rem', sm: '2.25rem' },
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Tic-Tac-Toe
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.35, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
          Classic strategy. Simple rules.
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(Header);
