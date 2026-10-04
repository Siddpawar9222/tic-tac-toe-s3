import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FiRotateCcw, FiRefreshCw, FiZap } from 'react-icons/fi';
import { GAME_MODES, AI_DIFFICULTIES } from '../../constants/gameConstants';
import { COLORS } from '../../theme/theme';

const diffBtnBase = {
  borderRadius: 9999,
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'none',
  px: 1.5,
  py: 0.4,
  minWidth: 'auto',
  lineHeight: 1.4,
  border: '1px solid transparent',
  transition: 'all 0.15s ease',
};

const GameControls = ({
  onNextRound,
  onResetGame,
  isGameOver,
  isBoardEmpty,
  gameMode,
  aiDifficulty,
  onChangeDifficulty,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 1.25,
        width: '100%',
      }}
    >
      {/* AI Difficulty Selector */}
      {gameMode === GAME_MODES.AI && (
        <Box
          role="group"
          aria-label="AI Difficulty"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            py: 0.875,
            backgroundColor: COLORS.bgElevated,
            border: `1px solid ${COLORS.borderSubtle}`,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.625, color: 'text.secondary' }}>
            <FiZap size={13} />
            <Typography sx={{ fontSize: '0.78125rem', fontWeight: 500, color: 'text.secondary' }}>
              AI Level
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {/* Casual */}
            <Button
              size="small"
              onClick={() => onChangeDifficulty(AI_DIFFICULTIES.EASY)}
              aria-pressed={aiDifficulty === AI_DIFFICULTIES.EASY}
              sx={{
                ...diffBtnBase,
                color: aiDifficulty === AI_DIFFICULTIES.EASY ? '#fff' : 'text.secondary',
                backgroundColor:
                  aiDifficulty === AI_DIFFICULTIES.EASY
                    ? COLORS.playerX
                    : 'transparent',
                borderColor:
                  aiDifficulty === AI_DIFFICULTIES.EASY
                    ? COLORS.playerXBorder
                    : 'transparent',
                '&:hover': {
                  backgroundColor:
                    aiDifficulty === AI_DIFFICULTIES.EASY
                      ? COLORS.playerX
                      : COLORS.bgCardHover,
                  borderColor: COLORS.borderMedium,
                  color: '#fff',
                },
              }}
            >
              Casual
            </Button>

            {/* Master */}
            <Button
              size="small"
              onClick={() => onChangeDifficulty(AI_DIFFICULTIES.HARD)}
              aria-pressed={aiDifficulty === AI_DIFFICULTIES.HARD}
              sx={{
                ...diffBtnBase,
                color: aiDifficulty === AI_DIFFICULTIES.HARD ? '#fff' : 'text.secondary',
                backgroundColor:
                  aiDifficulty === AI_DIFFICULTIES.HARD
                    ? COLORS.playerO
                    : 'transparent',
                borderColor:
                  aiDifficulty === AI_DIFFICULTIES.HARD
                    ? COLORS.playerOBorder
                    : 'transparent',
                '&:hover': {
                  backgroundColor:
                    aiDifficulty === AI_DIFFICULTIES.HARD
                      ? COLORS.playerO
                      : COLORS.bgCardHover,
                  borderColor: COLORS.borderMedium,
                  color: '#fff',
                },
              }}
            >
              Master
            </Button>
          </Box>
        </Box>
      )}

      {/* Main Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
        <Button
          fullWidth
          startIcon={<FiRotateCcw size={14} />}
          onClick={onNextRound}
          disabled={isBoardEmpty && !isGameOver}
          title="Clear the board and start next round (keeps score)"
          sx={{
            py: 0.875,
            backgroundColor: COLORS.bgElevated,
            color: '#fff',
            border: `1px solid ${COLORS.borderSubtle}`,
            borderRadius: 2,
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover:not(:disabled)': {
              backgroundColor: COLORS.bgCardHover,
              borderColor: COLORS.borderMedium,
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              opacity: 0.35,
              color: 'text.secondary',
            },
          }}
        >
          New Round
        </Button>

        <Button
          fullWidth
          startIcon={<FiRefreshCw size={14} />}
          onClick={onResetGame}
          title="Reset board and all scores"
          sx={{
            py: 0.875,
            backgroundColor: COLORS.bgElevated,
            color: 'text.secondary',
            border: `1px solid ${COLORS.borderSubtle}`,
            borderRadius: 2,
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(244, 63, 94, 0.12)',
              color: COLORS.playerOLight,
              borderColor: COLORS.playerOBorder,
              transform: 'translateY(-1px)',
            },
          }}
        >
          Reset Match
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(GameControls);
