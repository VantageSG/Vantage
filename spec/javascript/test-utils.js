import { render } from '@testing-library/react';

function customRender(ui) {
  render(ui);
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };