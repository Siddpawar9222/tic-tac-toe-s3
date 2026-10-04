import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders header title and game elements', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/tic-tac-toe/i);
    expect(screen.getByText(/classic strategy. simple rules./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mute sound effects/i })).toBeInTheDocument();
  });

  test('renders 9 board cells with accessible labels', () => {
    render(<App />);
    const cells = screen.getAllByRole('button', { name: /row \d, column \d/i });
    expect(cells).toHaveLength(9);
  });

  test('handles player moves sequentially', () => {
    render(<App />);
    const cell0 = screen.getByRole('button', { name: /row 1, column 1/i });
    const cell1 = screen.getByRole('button', { name: /row 1, column 2/i });

    fireEvent.click(cell0);
    expect(cell0).toHaveAttribute('aria-label', expect.stringContaining('Player X'));

    fireEvent.click(cell1);
    expect(cell1).toHaveAttribute('aria-label', expect.stringContaining('Player O'));
  });

  test('prevents clicking an already occupied cell', () => {
    render(<App />);
    const cell0 = screen.getByRole('button', { name: /row 1, column 1/i });

    fireEvent.click(cell0);
    expect(cell0).toHaveAttribute('aria-label', expect.stringContaining('Player X'));

    fireEvent.click(cell0);
    expect(cell0).toHaveAttribute('aria-label', expect.stringContaining('Player X'));
  });

  test('allows resetting the match', () => {
    render(<App />);
    const cell0 = screen.getByRole('button', { name: /row 1, column 1/i });
    fireEvent.click(cell0);
    expect(cell0).toHaveAttribute('aria-label', expect.stringContaining('Player X'));

    const resetBtn = screen.getByRole('button', { name: /reset match/i });
    fireEvent.click(resetBtn);

    expect(cell0).toHaveAttribute('aria-label', expect.stringContaining('empty cell'));
  });
});
