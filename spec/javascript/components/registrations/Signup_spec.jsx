import React from 'react';
import Signup from 'components/registrations/Signup.jsx';
import { screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios'
import { fireEvent, getByText } from '@testing-library/dom';
import { renderWithRouter } from '../../test-utils';

describe('Login page', () => {
  jest.mock('axios')
  renderWithRouter(<Signup/>)
  it('should have email form', () => {
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
  it('should have email form', () => {
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  it('should have password confirmation', () => {
    expect(screen.getByPlaceholderText("password confirmation")).toBeInTheDocument();
  });
})


