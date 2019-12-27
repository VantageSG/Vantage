import React from 'react'
import Home from './components/Home'
import { render } from './test-utils';

test('shows login and signup', () => {
  render(<Home></Home>)
  expect(screen.getByText("login")).toBeInTheDocument();
  expect(screen.getByText("signup")).toBeInTheDocument()
})


