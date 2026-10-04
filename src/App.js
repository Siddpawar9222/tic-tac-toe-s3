import React from 'react';
import Header from './components/Header/Header';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import PlayerIndicator from './components/PlayerIndicator/PlayerIndicator';
import GameBoard from './components/GameBoard/GameBoard';
import GameStatus from './components/GameStatus/GameStatus';
import GameControls from './components/GameControls/GameControls';
import { useTicTacToe } from './hooks/useTicTacToe';
import './App.css';

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
    <div className="app-container">
      <main className="game-card">
        {/* Header Section */}
        <Header
          gameMode={gameMode}
          onModeChange={switchGameMode}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Scoreboard */}
        <ScoreBoard scores={scores} gameMode={gameMode} />

        {/* Active Player Turn Banner */}
        <PlayerIndicator
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
          gameMode={gameMode}
          isAiThinking={isAiThinking}
        />

        {/* Status Alert / Winner Banner */}
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

        {/* Action Controls & AI Difficulty */}
        <GameControls
          onNextRound={startNextRound}
          onResetGame={resetGame}
          isGameOver={isGameOver}
          isBoardEmpty={isBoardEmpty}
          gameMode={gameMode}
          aiDifficulty={aiDifficulty}
          onChangeDifficulty={setAiDifficulty}
        />

        {/* Accessible Keyboard & Portfolio Footer */}
        <footer className="game-footer">
          <span>Use <kbd>Tab</kbd> and <kbd>Enter</kbd> to play with keyboard</span>
        </footer>
      </main>
    </div>
  );
};

export default App;