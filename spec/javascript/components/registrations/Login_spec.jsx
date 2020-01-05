import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from 'components/registrations/Login.jsx';
import { renderWithRouter, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login page', () => {
  renderWithRouter(<Login/>);
  it('should have email form', () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  });
  it('should have Password', () => {
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
  it('should have Submit button', () => {
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
})


