import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

// Mock firebase to prevent initialization errors in tests
vi.mock('./firebase.js', () => ({}));

// Mock all lazy-loaded pages for synchronous testing
vi.mock('./pages/Dashboard', () => ({
  default: ({ navigate }) => (
    <div data-testid="dashboard-page">
      <p>Welcome to Dashboard</p>
      <button onClick={() => navigate('chat')}>Go Chat</button>
      <button onClick={() => navigate('learn')}>Go Learn</button>
    </div>
  ),
}));
vi.mock('./pages/Learn', () => ({
  default: () => <div>Learn Page</div>,
}));
vi.mock('./components/Timeline', () => ({
  default: () => <div>Timeline Page</div>,
}));
vi.mock('./pages/FAQ', () => ({
  default: () => <div>FAQ Page</div>,
}));
vi.mock('./pages/Charts', () => ({
  default: () => <div>Charts Page</div>,
}));
vi.mock('./components/Chat', () => ({
  default: () => <div>Chat Page</div>,
}));

describe('App Navigation & Core Functionality', () => {
  it('renders the app shell with sidebar', async () => {
    render(<App />);
    expect(await screen.findByText('ElectionIQ')).toBeInTheDocument();
    expect(screen.getByText('Guide Assistant')).toBeInTheDocument();
  });

  it('renders the Dashboard page by default', async () => {
    render(<App />);
    expect(await screen.findByTestId('dashboard-page')).toBeInTheDocument();
  });

  it('navigates to Learn page via sidebar', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Learn'));
    expect(await screen.findByText('Learn Page')).toBeInTheDocument();
  });

  it('navigates to FAQ page via sidebar', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('FAQ'));
    expect(await screen.findByText('FAQ Page')).toBeInTheDocument();
  });

  it('navigates to AI Assistant via sidebar', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('AI Assistant'));
    expect(await screen.findByText('Chat Page')).toBeInTheDocument();
  });

  it('navigates to Visual Charts via sidebar', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Visual Charts'));
    expect(await screen.findByText('Charts Page')).toBeInTheDocument();
  });

  it('navigates to Timeline page via sidebar', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Timeline'));
    expect(await screen.findByText('Timeline Page')).toBeInTheDocument();
  });

  it('search input is present and accessible', async () => {
    render(<App />);
    const searchInput = await screen.findByLabelText('Search');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'vote' } });
    expect(searchInput.value).toBe('vote');
  });

  it('theme toggle button is accessible via aria-label', async () => {
    render(<App />);
    const themeBtn = await screen.findByLabelText('Toggle Theme');
    expect(themeBtn).toBeInTheDocument();
  });

  it('settings button is accessible via aria-label', async () => {
    render(<App />);
    const settingsBtn = await screen.findByLabelText('Settings');
    expect(settingsBtn).toBeInTheDocument();
  });

  it('notifications button is accessible via aria-label', async () => {
    render(<App />);
    const notifBtn = await screen.findByLabelText('Notifications');
    expect(notifBtn).toBeInTheDocument();
  });

  it('opens notification panel when bell is clicked', async () => {
    render(<App />);
    fireEvent.click(await screen.findByLabelText('Notifications'));
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText(/New learning module available/i)).toBeInTheDocument();
  });

  it('opens settings panel when settings icon is clicked', async () => {
    render(<App />);
    fireEvent.click(await screen.findByLabelText('Settings'));
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText(/Reset Learning Progress/i)).toBeInTheDocument();
  });

  it('toggles sidebar open/close on mobile', async () => {
    render(<App />);
    const toggleBtn = await screen.findByLabelText('Open sidebar');
    fireEvent.click(toggleBtn);
    expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();
  });

  it('renders Register to Vote link in sidebar', async () => {
    render(<App />);
    const registerLink = await screen.findByText('Register Now');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.closest('a')).toHaveAttribute('href', 'https://voters.eci.gov.in');
  });

  it('renders footer with attribution', async () => {
    render(<App />);
    expect(await screen.findByText(/PromptWars 2026/i)).toBeInTheDocument();
    expect(screen.getByText('Google Gemini')).toBeInTheDocument();
  });
});
