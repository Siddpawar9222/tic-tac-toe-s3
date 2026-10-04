import React from 'react';
import { PLAYERS, GAME_MODES } from '../../constants/gameConstants';
import './ScoreBoard.css';

const ScoreBoard = ({ scores, gameMode }) => {
  const oLabel = gameMode === GAME_MODES.AI ? 'AI (O)' : 'Player O';

  return (
    <section className="scoreboard" aria-label="Game Scoreboard">
      <div className="score-card score-x">
        <span className="score-label">Player X</span>
        <span className="score-value" aria-label={`Player X score: ${scores[PLAYERS.X]}`}>
          {scores[PLAYERS.X]}
        </span>
      </div>

      <div className="score-card score-draw">
        <span className="score-label">Draws</span>
        <span className="score-value" aria-label={`Draws count: ${scores.draws}`}>
          {scores.draws}
        </span>
      </div>

      <div className="score-card score-o">
        <span className="score-label">{oLabel}</span>
        <span className="score-value" aria-label={`${oLabel} score: ${scores[PLAYERS.O]}`}>
          {scores[PLAYERS.O]}
        </span>
      </div>
    </section>
  );
};

export default React.memo(ScoreBoard);
