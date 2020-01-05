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

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
export { renderWithRouter as renderWithRouter };