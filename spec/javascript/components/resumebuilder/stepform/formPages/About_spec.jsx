import React from 'react';
import About from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/About';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default About Page', () => {
  renderWithRouter(<About/>);
  it('should have introduce yoruself', () => {
    expect(screen.getByText(/Introduce yourself/i)).toBeInTheDocument();
  });
  it('should have introduce Name text', () => {
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });
  it('should have introduce Name placeholder', () => {
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  });
  it('should have introduce Email text', () => {
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });
  it('should have introduce Email placeholder', () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  });
  it('should have introduce Contact Number text', () => {
    expect(screen.getByText(/Contact Number/i)).toBeInTheDocument();
  });
  it('should have introduce Contact Number placeholder', () => {
    expect(screen.getByPlaceholderText(/Contact Number/i)).toBeInTheDocument();
  });
  it('should have introduce Describe Yourself text', () => {
    expect(screen.getByText(/Describe yourself/i)).toBeInTheDocument();
  });
  it('should have introduce Describe Yourself placeholder', () => {
    expect(screen.getByPlaceholderText(/About Me/i)).toBeInTheDocument();
  });
})
