import React from 'react';
import { ThemeProvider, CssBaseline, Box, Paper, Typography } from '@mui/material';
import Header from './components/Header/Header';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import PlayerIndicator from './components/PlayerIndicator/PlayerIndicator';
import GameBoard from './components/GameBoard/GameBoard';
import GameStatus from './components/GameStatus/GameStatus';
import GameControls from './components/GameControls/GameControls';
import { theme, COLORS } from './theme/theme';
import useTicTacToe from './hooks/useTicTacToe';

const App = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningCombo,
    isDraw,
    isGameOver,
    scores,
    gameMode,
    aiDifficulty,
    isAiThinking,
    soundEnabled,
    handleCellClick,
    startNextRound,
    resetGame,
    switchGameMode,
    setAiDifficulty,
    toggleSound,
  } = useTicTacToe();

  const isBoardEmpty = board.every((cell) => cell === null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: '0.75rem 0.5rem', sm: '1.5rem 1rem' },
          background: 'radial-gradient(circle at 50% 0%, #172136 0%, #090d16 65%)',
        }}
      >
        <Paper
          component="main"
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 440,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 1.25, sm: 1.5 },
            p: { xs: '1rem 0.875rem', sm: 2 },
            backgroundColor: 'rgba(17, 24, 39, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${COLORS.borderSubtle}`,
            borderRadius: { xs: 3, sm: 4 },
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6)',
            position: 'relative',
          }}
        >
          {/* Header */}
          <Header
            gameMode={gameMode}
            onModeChange={switchGameMode}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
          />

          {/* Scoreboard */}
          <ScoreBoard scores={scores} gameMode={gameMode} />

          {/* Active Player Indicator */}
          <PlayerIndicator
            currentPlayer={currentPlayer}
            isGameOver={isGameOver}
            gameMode={gameMode}
            isAiThinking={isAiThinking}
          />

          {/* Match Status / Winner Banner */}
          <GameStatus
            winner={winner}
            isDraw={isDraw}
            isGameOver={isGameOver}
            currentPlayer={currentPlayer}
            gameMode={gameMode}
            isAiThinking={isAiThinking}
            onPlayAgain={startNextRound}
          />

          {/* 3x3 Game Board */}
          <GameBoard
            board={board}
            winningCombo={winningCombo}
            onCellClick={handleCellClick}
            currentPlayer={currentPlayer}
            isGameOver={isGameOver}
            isAiThinking={isAiThinking}
          />

          {/* Controls */}
          <GameControls
            onNextRound={startNextRound}
            onResetGame={resetGame}
            isGameOver={isGameOver}
            isBoardEmpty={isBoardEmpty}
            gameMode={gameMode}
            aiDifficulty={aiDifficulty}
            onChangeDifficulty={setAiDifficulty}
          />

          {/* Footer keyboard hint */}
          <Box sx={{ mt: 0.5, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontSize: '0.71875rem', color: '#64748b' }}>
              Use <Box component="kbd" sx={{ px: 0.5, py: 0.15, borderRadius: 1, backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.borderMedium}`, color: 'text.secondary' }}>Tab</Box> and <Box component="kbd" sx={{ px: 0.5, py: 0.15, borderRadius: 1, backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.borderMedium}`, color: 'text.secondary' }}>Enter</Box> to play with keyboard
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default App;
