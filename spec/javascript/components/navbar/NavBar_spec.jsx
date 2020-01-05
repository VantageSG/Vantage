import React from 'react';
import ResponsiveContainer from 'components/navbar/NavBar.jsx';
import { screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, getByText } from '@testing-library/dom';
import { renderWithRouter } from '../../test-utils';

describe('Responsive Container', () => {
  renderWithRouter(<ResponsiveContainer/>)
  it('should have login', () => {
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
  it('should have sign up', () => {
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });
  it('should have home', () => {
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
})