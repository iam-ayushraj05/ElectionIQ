import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';

vi.mock('../data/electionData', () => ({
  QUICK_FACTS: [
    { icon: '🗳️', value: '543', label: 'Lok Sabha Seats' },
    { icon: '👥', value: '96.8Cr', label: 'Registered Voters' },
  ],
  TIMELINE_STEPS: [
    { id: 1, emoji: '📢', title: 'Announcement', phase: 'Phase 1', badge: 'badge-cyan', desc: 'Election dates announced.' },
    { id: 2, emoji: '📝', title: 'Nomination', phase: 'Phase 2', badge: 'badge-purple', desc: 'Candidates file nominations.' },
    { id: 3, emoji: '🗳️', title: 'Polling', phase: 'Phase 3', badge: 'badge-green', desc: 'Voters cast their votes.' },
    { id: 4, emoji: '📊', title: 'Counting', phase: 'Phase 4', badge: 'badge-orange', desc: 'Votes are counted.' },
  ],
}));

describe('Dashboard Page', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the welcome heading', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    expect(screen.getByText('ElectionIQ')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });

  it('renders quick facts/stats', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    expect(screen.getByText('543')).toBeInTheDocument();
    expect(screen.getByText('Lok Sabha Seats')).toBeInTheDocument();
  });

  it('renders quick action cards', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    expect(screen.getByText('Register to Vote')).toBeInTheDocument();
    expect(screen.getByText('Ask AI Assistant')).toBeInTheDocument();
  });

  it('navigates when a quick action card is clicked', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    fireEvent.click(screen.getByText('Ask AI Assistant'));
    expect(mockNavigate).toHaveBeenCalledWith('chat');
  });

  it('navigates via keyboard Enter on quick action cards', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    const card = screen.getByLabelText(/Navigate to Ask AI Assistant/i);
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('chat');
  });

  it('shows completed module count correctly', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[1,1,0,0,0,0]} />);
    const matches = screen.getAllByText(/2\/6 Modules Completed/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('shows election stage steps', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    expect(screen.getByText('Announcement')).toBeInTheDocument();
    expect(screen.getByText('Nomination')).toBeInTheDocument();
  });

  it('navigates to timeline when "View All" is clicked', () => {
    render(<Dashboard navigate={mockNavigate} learningProgress={[0,0,0,0,0,0]} />);
    fireEvent.click(screen.getByText('View All →'));
    expect(mockNavigate).toHaveBeenCalledWith('timeline');
  });
});
