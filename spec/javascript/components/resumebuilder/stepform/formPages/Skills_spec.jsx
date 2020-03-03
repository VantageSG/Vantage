import React from 'react';
import Skills from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/Skills.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login Skills', () => {
  renderWithRouter(<Skills/>);
  it('should have What are some skills you have?', () => {
    expect(screen.getByText(/What are some skills you have?/i)).toBeInTheDocument();
  });
  it('should have Describe your skill text', () => {
    expect(screen.getByText(/Describe your skill/i)).toBeInTheDocument();
  });
})
