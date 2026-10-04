import React from 'react';
import { FiRotateCcw, FiRefreshCw, FiZap } from 'react-icons/fi';
import { GAME_MODES, AI_DIFFICULTIES } from '../../constants/gameConstants';
import './GameControls.css';

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
    <div className="game-controls-container" aria-label="Game Controls">
      {gameMode === GAME_MODES.AI && (
        <div className="difficulty-toggle" role="group" aria-label="AI Difficulty">
          <span className="difficulty-label">
            <FiZap className="diff-icon" aria-hidden="true" />
            AI Level:
          </span>
          <div className="diff-buttons">
            <button
              type="button"
              className={`diff-btn ${aiDifficulty === AI_DIFFICULTIES.EASY ? 'active' : ''}`}
              onClick={() => onChangeDifficulty(AI_DIFFICULTIES.EASY)}
              aria-pressed={aiDifficulty === AI_DIFFICULTIES.EASY}
            >
              Casual
            </button>
            <button
              type="button"
              className={`diff-btn ${aiDifficulty === AI_DIFFICULTIES.HARD ? 'active' : ''}`}
              onClick={() => onChangeDifficulty(AI_DIFFICULTIES.HARD)}
              aria-pressed={aiDifficulty === AI_DIFFICULTIES.HARD}
            >
              Master
            </button>
          </div>
        </div>
      )}

      <div className="action-buttons-group">
        <button
          type="button"
          className="control-btn btn-secondary"
          onClick={onNextRound}
          disabled={isBoardEmpty && !isGameOver}
          title="Clear the board and start next round (keeps score)"
        >
          <FiRotateCcw className="btn-icon" aria-hidden="true" />
          <span>New Round</span>
        </button>

        <button
          type="button"
          className="control-btn btn-danger-subtle"
          onClick={onResetGame}
          title="Reset board and all scores"
        >
          <FiRefreshCw className="btn-icon" aria-hidden="true" />
          <span>Reset Match</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(GameControls);
