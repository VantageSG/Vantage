import React from 'react';
import Skills from 'components/resumebuilder/multiStepform/formPages/Skills.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login Skills', () => {
  renderWithRouter(<Skills/>);
  it('should have What are some skills you have?', () => {
    expect(screen.getByText(/What are some skills you have?/i)).toBeInTheDocument();
  });
  it('should have Enter Interest placeholder', () => {
    expect(screen.getByPlaceholderText(/Enter Skill/i)).toBeInTheDocument();
  });
  it('should have Describe your skill text', () => {
    expect(screen.getByText(/Describe your skill/i)).toBeInTheDocument();
  });
  it('should have Describe it placeholder', () => {
    expect(screen.getByPlaceholderText(/Describe it/i)).toBeInTheDocument();
  });
})
