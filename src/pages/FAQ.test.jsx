import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FAQ from './FAQ';

// Mock faqData
vi.mock('../data/faqData', () => ({
  FAQ_ITEMS: [
    { q: 'How to register to vote?', a: 'Visit voters.eci.gov.in to register.', cat: 'Registration', icon: '🗳️' },
    { q: 'What is EVM?', a: 'EVM stands for Electronic Voting Machine.', cat: 'Voting', icon: '🖥️' },
    { q: 'What is NOTA?', a: 'None Of The Above.', cat: 'General', icon: '❓' },
  ],
}));

describe('FAQ Page', () => {
  it('renders the FAQ page heading', () => {
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked')).toBeInTheDocument();
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });

  it('renders all FAQ items by default', () => {
    render(<FAQ />);
    expect(screen.getByText('How to register to vote?')).toBeInTheDocument();
    expect(screen.getByText('What is EVM?')).toBeInTheDocument();
    expect(screen.getByText('What is NOTA?')).toBeInTheDocument();
  });

  it('filters FAQ items by search query', () => {
    render(<FAQ />);
    const searchInput = screen.getByPlaceholderText(/search faqs/i);
    fireEvent.change(searchInput, { target: { value: 'EVM' } });
    expect(screen.getByText('What is EVM?')).toBeInTheDocument();
    expect(screen.queryByText('How to register to vote?')).not.toBeInTheDocument();
  });

  it('shows no results message when search has no matches', () => {
    render(<FAQ />);
    const searchInput = screen.getByPlaceholderText(/search faqs/i);
    fireEvent.change(searchInput, { target: { value: 'xyznonexistent' } });
    expect(screen.getByText(/no faqs match your search/i)).toBeInTheDocument();
  });

  it('filters by category when a category button is clicked', () => {
    render(<FAQ />);
    fireEvent.click(screen.getByText('Voting'));
    expect(screen.getByText('What is EVM?')).toBeInTheDocument();
    expect(screen.queryByText('How to register to vote?')).not.toBeInTheDocument();
  });

  it('expands an FAQ item on click and shows the answer', () => {
    render(<FAQ />);
    const questionBtn = screen.getByText('How to register to vote?').closest('button');
    // Click to expand
    fireEvent.click(questionBtn);
    // After click, the open class should be applied - answer div should have 'open'
    const answerText = screen.getByText('Visit voters.eci.gov.in to register.');
    expect(answerText).toBeInTheDocument();
    // Clicking the same button collapses it
    fireEvent.click(questionBtn);
    // Text still in DOM but panel closed (CSS animation)
    expect(screen.getByText('Visit voters.eci.gov.in to register.')).toBeInTheDocument();
  });

  it('shows result count correctly', () => {
    render(<FAQ />);
    expect(screen.getByText(/showing 3 of 3 questions/i)).toBeInTheDocument();
  });

  it('shows correct count after filtering', () => {
    render(<FAQ />);
    fireEvent.change(screen.getByPlaceholderText(/search faqs/i), { target: { value: 'EVM' } });
    expect(screen.getByText(/showing 1 of 3 questions/i)).toBeInTheDocument();
  });
});
