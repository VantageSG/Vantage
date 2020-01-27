import React from 'react';
import WorkExperience from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/WorkExperience.jsx';
import { renderWithRouter, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Default Login page', () => {
  renderWithRouter(<WorkExperience/>);
  it('should have Where have you worked before?', () => {
    expect(screen.getByText(/Where have you worked before?/i)).toBeInTheDocument();
  });
  it('should have Name of Position text', () => {
    expect(screen.getByText(/Name of Position/i)).toBeInTheDocument();
  });
  it('should have Name of Position placeholder', () => {
    expect(screen.getByPlaceholderText(/Name of Position/i)).toBeInTheDocument();
  });
  it('should have Company text', () => {
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
  });
  it('should have Company placeholder', () => {
    expect(screen.getByPlaceholderText(/Company/i)).toBeInTheDocument();
  });
  it('should have Start Date text', () => {
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
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
