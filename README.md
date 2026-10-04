# Tic-Tac-Toe — Modern SaaS Edition

A modern, responsive, and accessible Tic-Tac-Toe web application built with React, modular CSS architecture, and the Minimax algorithm for intelligent AI gameplay. Designed for portfolio presentation with clean component hierarchy, zero redundant state, and Web Audio API synthesis.

---

## ✨ Features

- **🎮 Dual Game Modes**:
  - **Local 2-Player (PvP)**: Play head-to-head on the same device.
  - **vs AI (PvE)**: Challenge an intelligent computer player with **Casual** and **Master (Unbeatable Minimax)** difficulty settings.
- **🎨 Modern SaaS UI/UX**:
  - Glassmorphic dark theme with subtle neon accents for Player X (Cyan) and Player O (Coral).
  - Fluid hover previews showing ghost placement on valid cells.
  - Dynamic winning combination highlight with subtle glowing animations.
  - Distinct active player turn indicators with turn heartbeat animations.
- **📊 Real-Time Scoreboard**:
  - Automatically records Player X wins, Player O / AI wins, and Draws.
  - State persisted to browser `localStorage` across page reloads.
- **🔊 Native Web Audio Synthesizer**:
  - Custom audio effects for moves, wins, draws, and resets synthesized in real-time via the Web Audio API (0 external assets, 0 latency).
  - Quick-access sound mute/unmute toggle.
- **♿ First-Class Accessibility (a11y)**:
  - Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<button>`).
  - Full keyboard navigation with visible focus rings (`Tab`, `Enter`, `Space`).
  - Screen-reader friendly with dynamic `aria-label` attributes for each cell (`Row X, Column Y`) and `aria-live="polite"` match status announcements.
  - Fully honors `prefers-reduced-motion`.
- **📱 Ultra Responsive**:
  - Perfect square aspect ratio on all viewports (Mobile, Tablet, Desktop).
  - 44px+ touch-friendly hit areas for comfortable one-handed mobile play.

---

## 🏗️ Architecture & Project Structure

```
src/
├── components/                 # Reusable, single-responsibility UI components
│   ├── GameBoard/              # 3x3 board container & individual SVG cells
│   │   ├── GameBoard.js
│   │   ├── GameCell.js
│   │   └── GameBoard.css
│   ├── GameControls/           # New Round, Reset Match & AI difficulty selector
│   │   ├── GameControls.js
│   │   └── GameControls.css
│   ├── GameStatus/             # Turn status & animated result banner with "Play Again"
│   │   ├── GameStatus.js
│   │   └── GameStatus.css
│   ├── Header/                 # Title, mode toggle (PvP / AI), and audio control
│   │   ├── Header.js
│   │   └── Header.css
│   ├── PlayerIndicator/        # Active player visual badge with pulsing turn marker
│   │   ├── PlayerIndicator.js
│   │   └── PlayerIndicator.css
│   └── ScoreBoard/             # 3-column scorecard for X, Draws, and O
│       ├── ScoreBoard.js
│       └── ScoreBoard.css
│
├── constants/
│   └── gameConstants.js        # Core constants (PLAYERS, WINNING_COMBINATIONS, MODES)
│
├── hooks/
│   └── useTicTacToe.js         # Custom hook managing state, turns, AI timing, and audio
│
├── styles/
│   ├── variables.css           # Design tokens (colors, gradients, shadows, radius)
│   └── global.css              # Global reset, typography, and accessibility styles
│
├── utils/
│   ├── audio.js                # Web Audio API synthetic sound engine
│   ├── gameLogic.js            # Pure logic: checkWinner, isBoardFull, minimax AI
│   └── gameLogic.test.js       # Unit tests for game logic and minimax algorithm
│
├── App.js                      # Root application layout
├── App.css                     # Container and glassmorphism styling
├── App.test.js                 # Integration tests for UI rendering and interactions
├── index.js                    # React 18 createRoot with StrictMode
└── setupTests.js               # Jest-DOM matchers configuration
```

---

## 🧠 State Flow

```
┌──────────────────────────────────────────────┐
│                  App.js                      │
└──────────────────────┬───────────────────────┘
                       │ consumes
┌──────────────────────▼───────────────────────┐
│               useTicTacToe()                 │
│  State: board, currentPlayer, scores, mode   │
│  Derived: winner, winningCombo, isDraw, etc. │
└──────────────┬───────────────────────────────┘
               │ delegates pure calculations
┌──────────────▼───────────────────────────────┐
│           utils/gameLogic.js                 │
│  - checkWinner(board)                        │
│  - isBoardFull(board)                        │
│  - getAIMove(board, player, difficulty)      │
└──────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ or v18+)
- npm (v8+)

### Installation

```bash
git clone https://github.com/your-username/tic-tac-toe-s3.git
cd tic-tac-toe-s3
npm install
```

### Development Server

Run the development server on `http://localhost:3000`:

```bash
npm start
```

### Running Tests

Execute the unit and integration test suite:

```bash
npm test -- --watchAll=false
```

### Production Build

Create an optimized, minified production bundle in the `build/` directory:

```bash
npm run build
```

---

## 🚢 Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) configured to automatically build and sync the `build/` folder to an Amazon S3 bucket and invalidate the CloudFront CDN cache upon pushing to the `master` branch.
