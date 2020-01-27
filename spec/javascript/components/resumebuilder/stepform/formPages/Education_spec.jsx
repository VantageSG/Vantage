import React from 'react';
import Education from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/Education.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login page', () => {
  renderWithRouter(<Education/>);
  it('should have "Where did you study"', () => {
    expect(screen.getByText(/Where did u study?/i)).toBeInTheDocument();
  });
  it('should have Institution Name text', () => {
    expect(screen.getByText(/Institution Name/i)).toBeInTheDocument();
  });
  it('should have Institution Name placeholder', () => {
    expect(screen.getByPlaceholderText(/Institution Name/i)).toBeInTheDocument();
  });
  it('should have Program text', () => {
    expect(screen.getByText(/Program/i)).toBeInTheDocument();
  });
  it('should have Program placeholder', () => {
    expect(screen.getByPlaceholderText(/Program/i)).toBeInTheDocument();
  });
  it('should have Start date text', () => {
    expect(screen.getByText(/Start date/i)).toBeInTheDocument();
  });
  it('should have Start date placeholder', () => {
    expect(screen.getByPlaceholderText(/Start date/i)).toBeInTheDocument();
  });
  it('should have End date text', () => {
    expect(screen.getByText(/End date/i)).toBeInTheDocument();
  });
  it('should have End date placeholder', () => {
    expect(screen.getByPlaceholderText(/End date/i)).toBeInTheDocument();
  });
})
