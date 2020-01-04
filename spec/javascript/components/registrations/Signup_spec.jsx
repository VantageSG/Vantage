import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Signup from 'components/registrations/Signup.jsx';
import { render, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history'
import { fireEvent, getByText } from '@testing-library/dom';

function renderWithRouter(
  ui,
  {route = '/Signup', history = createMemoryHistory({initialEntries: [route]})} = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

describe('Login page', () => {
  renderWithRouter(<Signup/>);
  it('should have email form', () => {
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
  it('should have email form', () => {
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
  it('should have password confirmation', () => {
    expect(screen.getByPlaceholderText("password confirmation")).toBeInTheDocument();
  });
  // it('should have redirect to home page', () => {
  //   const redirectUrl = '/'
  //   const button = screen.getByText('home');
  //   expect(button).not.toBe(null);
  //   fireEvent.click(button);

  //   expect(screen.innerHTML).toEqual(
  //     expect.stringContaining(redirectUrl)
  //   )
  // });
})


