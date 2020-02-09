import React from 'react';
import GuestUserModal from 'components/registrations/GuestUserModal.jsx';
import { renderWithRouter, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('No user logged in', () => {
  renderWithRouter(<GuestUserModal/>);
  it('should have Sign Up', () => {
    expect(screen.getByTestId('SignUp').innerHTML).toBe("Sign Up");
  });
  it('should have Login', () => {
    expect(screen.getByTestId('Login').innerHTML).toBe("Login");
  });
  it('should have Submit button', () => {
    expect(screen.getByText(/Continue as Guest/i)).toBeInTheDocument();
  });
})