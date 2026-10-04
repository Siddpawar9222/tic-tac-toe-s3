import React from 'react';
import { FiVolume2, FiVolumeX, FiUsers, FiCpu } from 'react-icons/fi';
import { GAME_MODES } from '../../constants/gameConstants';
import './Header.css';

const Header = ({ gameMode, onModeChange, soundEnabled, onToggleSound }) => {
  return (
    <header className="game-header">
      <div className="header-top">
        <div className="mode-toggle" role="group" aria-label="Game Mode Selection">
          <button
            type="button"
            className={`mode-btn ${gameMode === GAME_MODES.PVP ? 'active' : ''}`}
            onClick={() => onModeChange(GAME_MODES.PVP)}
            aria-pressed={gameMode === GAME_MODES.PVP}
          >
            <FiUsers className="mode-icon" aria-hidden="true" />
            <span>2 Players</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${gameMode === GAME_MODES.AI ? 'active' : ''}`}
            onClick={() => onModeChange(GAME_MODES.AI)}
            aria-pressed={gameMode === GAME_MODES.AI}
          >
            <FiCpu className="mode-icon" aria-hidden="true" />
            <span>vs AI</span>
          </button>
        </div>

        <button
          type="button"
          className="sound-toggle-btn"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundEnabled ? (
            <FiVolume2 className="sound-icon" aria-hidden="true" />
          ) : (
            <FiVolumeX className="sound-icon muted" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="header-content">
        <h1 className="game-title">Tic-Tac-Toe</h1>
        <p className="game-subtitle">Classic strategy. Simple rules.</p>
      </div>
    </header>
  );
};

export default React.memo(Header);
