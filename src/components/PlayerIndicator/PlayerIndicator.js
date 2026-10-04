import React from 'react';
import { PLAYERS, GAME_MODES } from '../../constants/gameConstants';
import './PlayerIndicator.css';

const PlayerIndicator = ({ currentPlayer, isGameOver, gameMode, isAiThinking }) => {
  const isXTurn = currentPlayer === PLAYERS.X && !isGameOver;
  const isOTurn = currentPlayer === PLAYERS.O && !isGameOver;

  const oName = gameMode === GAME_MODES.AI ? 'AI (O)' : 'Player O';

  return (
    <div className="player-indicator-wrapper" aria-label="Current Player Turn Information">
      <div className="players-vs-container">
        <div
          className={`player-badge badge-x ${isXTurn ? 'active' : ''}`}
          aria-current={isXTurn ? 'true' : 'false'}
        >
          <div className="player-avatar-mark">X</div>
          <div className="player-meta">
            <span className="player-name">Player X</span>
            {isXTurn && <span className="turn-pulse-text">Your Turn</span>}
          </div>
        </div>

        <div className="vs-badge" aria-hidden="true">
          <span>VS</span>
        </div>

        <div
          className={`player-badge badge-o ${isOTurn ? 'active' : ''}`}
          aria-current={isOTurn ? 'true' : 'false'}
        >
          <div className="player-avatar-mark">O</div>
          <div className="player-meta">
            <span className="player-name">{oName}</span>
            {isOTurn && (
              <span className="turn-pulse-text">
                {isAiThinking ? 'Thinking...' : 'Your Turn'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlayerIndicator);
