import React from "react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { render } from '@testing-library/react';

function customRender(ui) {
  render(ui);
}

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}
function resizeWindow(x, y) {
    window.innerWidth = x
    window.innerHeight = y
    window.dispatchEvent(new Event('resize'))
}

function setMobileWindow() {
  resizeWindow(375, 812)
}

function setDesktopWindow() {
  resizeWindow(1024, 768)
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { setDesktopWindow as setDesktopWindow};
export { setMobileWindow as setMobileWindow};
export { customRender as render };
export { renderWithRouter as renderWithRouter };