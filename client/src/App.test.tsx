import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header element', () => {
  render(<App />);
  const headerElement = screen.getByText(/Savings Interest Rate Calculator/i);
  expect(headerElement).toBeInTheDocument();
});