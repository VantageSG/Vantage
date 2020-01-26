import React from 'react';
import ConfirmationPage from 'components/resumebuilder/multiStepForm/formPages/ConfirmationPage.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login page', () => {
  renderWithRouter(<ConfirmationPage/>);
  it('should have header', () => {
    expect(screen.getByText(/Confirmation page/i)).toBeInTheDocument();
  });
  
})
