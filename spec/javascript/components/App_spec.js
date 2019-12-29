import React from 'react';
import App from 'components/App.jsx';
import { render, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Homepage', () => {
  render(<App></App>);
  it('should have home button', () => {
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
  it('should have login button', () => {
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  })
  it('should have signup button', () => {
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  })
})


