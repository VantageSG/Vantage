import React from 'react';
import UserContext from "../../../../../../app/javascript/contexts/UserContext";
import WorkExperience from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/WorkExperience.jsx';
import { renderWithRouter, screen, wait, cleanup } from 'test-utils';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
jest.mock('axios');
afterEach(cleanup)


describe('Default Login page', () => {
  renderWithRouter(<WorkExperience/>);
  it('should have basic field', () => {
    expect(screen.getByText(/Where have you worked before?/i)).toBeInTheDocument();
    expect(screen.getByText(/Name of Position/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name of Position/i)).toBeInTheDocument();
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Start date/i)).toBeInTheDocument();
    expect(screen.getByText(/End date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/End date/i)).toBeInTheDocument();
  });
})

describe('Work Experience field', () => {
  it ('should have multiple achievements small qns for new users', async () => {

    const data = {
      data: {
        "workExperiences": []
    },
      status:200
    };

    axios.get.mockResolvedValue(data);
    const user = {
      "id": 6,
      "username": "shermzlim",
      "email": "sherman@email.com",
      "password_digest": "$2a$12$gC1pwl.RDUYWU0Y.4lzgruZDkapGZEeJOz9EpyLk2CHm7tJ3mh84C",
      "created_at": "2019-12-30T16:56:51.584Z",
      "updated_at": "2019-12-30T16:56:51.584Z"
    }

    renderWithRouter(
      <UserContext.Provider 
      value={{
        user:user,
        isLoggedIn:true
      }}
      >
        <WorkExperience/>)
      </UserContext.Provider>);
    await wait (() => expect(screen.getByText(/Briefly share key issues you faced and how you overcame this challenge./i)).toBeInTheDocument())
    await wait (() => expect(screen.getByText(/Were there any significant outcomes of your experience?/i)).toBeInTheDocument())
  });
  it ('should have a para for about me for old users', async () => {

    const data = {
      data: {
        "workExperiences": [
            {
                "referee": [],
                "title": "JOB TITLE: str",
                "company": "COMPANY WORKING AT: str",
                "start": 123456,
                "end": 123456,
                "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY"
            },
        ]
    },
      status:200
    };

    axios.get.mockResolvedValue(data);

    const user = {
      "id": 6,
      "username": "shermzlim",
      "email": "sherman@email.com",
      "password_digest": "$2a$12$gC1pwl.RDUYWU0Y.4lzgruZDkapGZEeJOz9EpyLk2CHm7tJ3mh84C",
      "created_at": "2019-12-30T16:56:51.584Z",
      "updated_at": "2019-12-30T16:56:51.584Z"
    }

    renderWithRouter(<UserContext.Provider value={{
        user:user,
        isLoggedIn:true
      }}
      
      >
        <WorkExperience/>
      </UserContext.Provider>);

    await wait(() => expect(screen.getByText(/SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY/i)).toBeInTheDocument())
  });
} )