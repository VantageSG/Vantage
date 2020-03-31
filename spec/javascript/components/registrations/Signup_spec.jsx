import React from 'react';
import Signup from 'components/registrations/Signup.jsx';
import { screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, getByText } from '@testing-library/dom';
import { renderWithRouter } from '../../test-utils';

describe('Login page', () => {
  renderWithRouter(<Signup/>)
  it('should have email form', () => {
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
  it('should have email form', () => {
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  it('should have password confirmation', () => {
    expect(screen.getByPlaceholderText("Password Confirmation")).toBeInTheDocument();
  });
})


