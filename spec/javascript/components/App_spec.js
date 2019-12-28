import React from 'react';
import App from 'components/App.jsx';
import { render, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

test('Should not be signed in initially', () => {
  render(<App></App>);
  expect(screen.getByText(/false/i)).toBeInTheDocument();
})


