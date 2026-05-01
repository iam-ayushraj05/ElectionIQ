import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('renders the Dashboard by default', async () => {
    render(<App />);
    expect(await screen.findByText('ElectionIQ')).toBeInTheDocument();
  });
});
