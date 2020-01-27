import React from 'react';
import Interests from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/Interests.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login page', () => {
  renderWithRouter(<Interests/>);
  it('should have "What are some interests you have?"', () => {
    expect(screen.getByText(/What are some interests you have?/i)).toBeInTheDocument();
  });
  it('should have Enter Interest placeholder', () => {
    expect(screen.getByPlaceholderText(/Enter Interest/i)).toBeInTheDocument();
  });
})
