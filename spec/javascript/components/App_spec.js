import React from 'react';
import App from 'components/App.jsx';
import axios from 'axios';
import { renderWithRouter, screen, wait } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
jest.mock('axios');

describe('User not logged in', () => {
  it('fetches user not logged in data from an API and render Login and Sign up button', async () => {
    const data = {
      data: {
        error: "User not logged in"
      },
      status: 401
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    renderWithRouter(<App/>);
    await expect(screen.getByText(/Login/i)).toBeInTheDocument();
    await expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  })

  it('fetches user logged in data from an API and render Username', async () => {
    
    const data = {
      data: {
        "logged_in": true,
        "user": {
            "id": 6,
            "username": "shermzlim",
            "email": "sherman@email.com",
            "password_digest": "$2a$12$gC1pwl.RDUYWU0Y.4lzgruZDkapGZEeJOz9EpyLk2CHm7tJ3mh84C",
            "created_at": "2019-12-30T16:56:51.584Z",
            "updated_at": "2019-12-30T16:56:51.584Z"
        }
      },
      status:200
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    renderWithRouter(<App/>);
    await wait(()=>expect(screen.getByText(/Logout/i)).toBeInTheDocument());
  })
})