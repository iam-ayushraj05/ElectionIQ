import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Learn from './Learn';

vi.mock('../data/faqData', () => ({
  FAQ_ITEMS: [],
  LEARN_MODULES: [
    {
      id: 1, emoji: '📋', title: 'Voter Registration', desc: 'How to get on the electoral roll.',
      concepts: ['Form 6', 'BLO', 'Aadhaar'], badge: 'badge-cyan', time: '5 min',
      color: 'rgba(34,211,238,0.15)', colorText: '#22d3ee', dots: 1,
    },
    {
      id: 2, emoji: '🗳️', title: 'Polling Day', desc: 'What happens on election day.',
      concepts: ['EVM', 'VVPAT', 'Booth'], badge: 'badge-purple', time: '5 min',
      color: 'rgba(167,139,250,0.15)', colorText: '#a78bfa', dots: 2,
    },
  ],
}));

describe('Learn Page', () => {
  const mockNavigate = vi.fn();
  const mockSetProgress = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetProgress.mockClear();
  });

  it('renders the Learn heading', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Elections')).toBeInTheDocument();
  });

  it('renders all module cards', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText('Voter Registration')).toBeInTheDocument();
    expect(screen.getByText('Polling Day')).toBeInTheDocument();
  });

  it('shows 0 of 6 modules completed initially', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText(/0 of 6 modules completed/i)).toBeInTheDocument();
  });

  it('shows correct completed count when modules are done', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[1,1,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText(/2 of 6 modules completed/i)).toBeInTheDocument();
  });

  it('calls navigate and setLearningProgress when Start Learning is clicked', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    const btns = screen.getAllByText(/Start Learning/i);
    fireEvent.click(btns[0]);
    expect(mockSetProgress).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('chat', expect.stringContaining('Voter Registration'));
  });

  it('shows "Review Again" button for completed modules', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[1,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText(/Review Again/i)).toBeInTheDocument();
  });

  it('shows "Completed" badge for done modules', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[1,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText(/Completed ✓/i)).toBeInTheDocument();
  });

  it('renders module concept tags', () => {
    render(<Learn navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} setLearningProgress={mockSetProgress} />);
    expect(screen.getByText('Form 6')).toBeInTheDocument();
    expect(screen.getByText('EVM')).toBeInTheDocument();
  });
});
