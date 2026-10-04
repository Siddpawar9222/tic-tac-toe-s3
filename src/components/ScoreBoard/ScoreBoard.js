import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PLAYERS, GAME_MODES } from '../../constants/gameConstants';
import { COLORS } from '../../theme/theme';

const ScoreBoard = ({ scores, gameMode }) => {
  const oLabel = gameMode === GAME_MODES.AI ? 'AI (O)' : 'Player O';

  const cards = [
    {
      label: 'Player X',
      value: scores[PLAYERS.X],
      labelColor: COLORS.playerXLight,
      valColor: COLORS.playerX,
      ariaLabel: `Player X score: ${scores[PLAYERS.X]}`,
    },
    {
      label: 'Draws',
      value: scores.draws,
      labelColor: '#fde047',
      valColor: COLORS.draw,
      ariaLabel: `Draws count: ${scores.draws}`,
    },
    {
      label: oLabel,
      value: scores[PLAYERS.O],
      labelColor: COLORS.playerOLight,
      valColor: COLORS.playerO,
      ariaLabel: `${oLabel} score: ${scores[PLAYERS.O]}`,
    },
  ];

  return (
    <Box
      component="section"
      aria-label="Game Scoreboard"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: { xs: 1, sm: 1.5 },
        width: '100%',
      }}
    >
      {cards.map((card, i) => (
        <Paper
          key={i}
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 1, sm: 1.25 },
            px: 0.75,
            backgroundColor: COLORS.bgCard,
            border: `1px solid ${COLORS.borderSubtle}`,
            borderRadius: 2.5,
            transition: 'all 200ms ease',
            '&:hover': {
              backgroundColor: COLORS.bgCardHover,
              borderColor: COLORS.borderMedium,
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: { xs: '0.6875rem', sm: '0.75rem' },
              color: card.labelColor,
              mb: 0.35,
            }}
          >
            {card.label}
          </Typography>
          <Typography
            variant="h4"
            aria-label={card.ariaLabel}
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1,
              color: card.valColor,
            }}
          >
            {card.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default React.memo(ScoreBoard);
