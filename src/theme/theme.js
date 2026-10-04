import { createTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

export const popIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

export const winPulse = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.03); }
`;

export const pulseDot = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

export const slideDown = keyframes`
  from { transform: translateY(-8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const pulseOpacity = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const COLORS = {
  playerX: '#06b6d4',
  playerXLight: '#67e8f9',
  playerXGlow: 'rgba(6, 182, 212, 0.35)',
  playerXBg: 'rgba(6, 182, 212, 0.08)',
  playerXBorder: 'rgba(6, 182, 212, 0.3)',

  playerO: '#f43f5e',
  playerOLight: '#fda4af',
  playerOGlow: 'rgba(244, 63, 94, 0.35)',
  playerOBg: 'rgba(244, 63, 94, 0.08)',
  playerOBorder: 'rgba(244, 63, 94, 0.3)',

  draw: '#eab308',
  drawLight: '#fef08a',
  drawGlow: 'rgba(234, 179, 8, 0.3)',
  drawBg: 'rgba(234, 179, 8, 0.08)',

  bgApp: '#090d16',
  bgCard: '#111827',
  bgCardHover: '#172136',
  bgElevated: '#1e293b',
  bgCell: '#131b2e',
  bgCellHover: '#1a253e',

  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderMedium: 'rgba(255, 255, 255, 0.14)',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: COLORS.bgApp,
      paper: COLORS.bgCard,
    },
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 12,
  },
});
