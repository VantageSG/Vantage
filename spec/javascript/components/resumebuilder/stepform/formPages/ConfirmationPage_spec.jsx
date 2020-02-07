import React from 'react';
import ConfirmationPage from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/ConfirmationPage.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default confirmation page', () => {
  renderWithRouter(<ConfirmationPage
    user={{id:1}}
  />);
  it('should have header', () => {
    expect(screen.getAllByText(/Confirmation page/i).length).toBe(2);
  });
  
})
