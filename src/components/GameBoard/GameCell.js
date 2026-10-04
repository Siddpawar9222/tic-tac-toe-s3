import React from 'react';
import { PLAYERS } from '../../constants/gameConstants';

const GameCell = ({
  index,
  value,
  isWinningCell,
  onClick,
  disabled,
  currentPlayer,
  isGameOver,
  isAiThinking,
}) => {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  const accessibleLabel = value
    ? `Row ${row}, Column ${col}, Player ${value}`
    : `Row ${row}, Column ${col}, empty cell`;

  const isInteractive = !value && !disabled && !isGameOver && !isAiThinking;

  return (
    <button
      type="button"
      className={`game-cell ${value ? `cell-${value.toLowerCase()}` : ''} ${
        isWinningCell ? 'cell-winning' : ''
      } ${isInteractive ? 'cell-interactive' : ''}`}
      onClick={() => onClick(index)}
      disabled={disabled || !isInteractive}
      aria-label={accessibleLabel}
      data-index={index}
      data-preview={isInteractive ? currentPlayer : undefined}
    >
      {value === PLAYERS.X && (
        <svg
          className="symbol-svg symbol-x"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <line
            x1="22"
            y1="22"
            x2="78"
            y2="78"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <line
            x1="78"
            y1="22"
            x2="22"
            y2="78"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      )}

      {value === PLAYERS.O && (
        <svg
          className="symbol-svg symbol-o"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )}

      {!value && isInteractive && (
        <span className="ghost-preview" aria-hidden="true">
          {currentPlayer}
        </span>
      )}
    </button>
  );
};

export default React.memo(GameCell);
