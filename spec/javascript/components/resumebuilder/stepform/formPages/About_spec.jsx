import React from 'react';
import UserContext from "../../../../../../app/javascript/contexts/UserContext";
import About from 'components/resumebuilder/multiStepForm/formPages/About.jsx';
import { renderWithRouter, screen, wait, cleanup } from 'test-utils';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
jest.mock('axios');
afterEach(cleanup)

describe('Default About Page', () => {
  it('should have basic field', () => {
    renderWithRouter(<About/>);
    expect(screen.getByText(/Introduce yourself/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Describe yourself/i)).toBeInTheDocument();
    
  });
})


describe('About Me field', () => {

  it ('should have multiple about me small qns for new users', async () => {

    const data = {
      data: {
        "about": null
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
    <UserContext.Provider value={{
        user:user,
        isLoggedIn:true
      }}
      
      >
        <About/>
      </UserContext.Provider>
      
    );
    await wait (() => expect(screen.getByText(/How would you describe your personality in a few words?/i)).toBeInTheDocument())
    await wait (() => expect(screen.getByText(/What’s the most important thing you would want the recruiter to know about you?/i)).toBeInTheDocument())
    await wait (() => expect(screen.getByText(/What are you doing now and what is it that you want to achieve with the opportunity?/i)).toBeInTheDocument())
    await wait (() => expect(screen.getByText(/How can you help the employer achieve their goals?/i)).toBeInTheDocument())
  });
  it ('should have a para for about me for old users', async () => {

    const data = {
      data: {
        "about": {
          "name": "Sherman Lim",
          "email": "sherman@email.com",
          "contact_number": 91388856,
          "aboutMe": "I am SHERMAN"
        }
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
        <About/>
      </UserContext.Provider>);

    await wait(() => expect(screen.getByText(/I am SHERMAN/i)).toBeInTheDocument())
  });
})
