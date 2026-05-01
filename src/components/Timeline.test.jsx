import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimelinePage from './Timeline';

vi.mock('../data/electionData', () => ({
  TIMELINE_STEPS: [
    {
      id: 1, emoji: '📢', title: 'Announcement', phase: 'Pre-Election', badge: 'badge-cyan',
      color: 'rgba(34,211,238,0.15)', desc: 'Election Commission announces dates.',
      details: ['MCC begins', 'Dates finalized'],
    },
    {
      id: 2, emoji: '📝', title: 'Nomination', phase: 'Pre-Election', badge: 'badge-purple',
      color: 'rgba(167,139,250,0.15)', desc: 'Candidates file papers.',
      details: ['Forms submitted', 'Security deposit paid'],
    },
  ],
}));

describe('Timeline Page', () => {
  it('renders the timeline heading', () => {
    render(<TimelinePage />);
    expect(screen.getByText('Election')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('renders all timeline steps', () => {
    render(<TimelinePage />);
    expect(screen.getByText('Announcement')).toBeInTheDocument();
    expect(screen.getByText('Nomination')).toBeInTheDocument();
  });

  it('expands step details on click', () => {
    render(<TimelinePage />);
    fireEvent.click(screen.getByText('Announcement'));
    expect(screen.getByText('MCC begins')).toBeInTheDocument();
  });

  it('shows step phase badges', () => {
    render(<TimelinePage />);
    const badges = screen.getAllByText('Pre-Election');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('renders progress step dots at the top', () => {
    render(<TimelinePage />);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
  });
});
