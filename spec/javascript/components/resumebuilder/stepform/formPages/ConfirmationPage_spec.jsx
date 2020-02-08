import React from 'react';
import ConfirmationPage from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/ConfirmationPage.jsx';
import { renderWithRouter, screen, wait} from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
jest.mock('axios');

describe('Default confirmation page', () => {
  it('should have header', async () => {
    const data = {
      data: {
        "about": {
            "name": "ar",
            "email": "example@example.com",
            "contact_number": 123,
            "about_me": "SHORT WRITE UP OF USER: str"
        },
        "educations": [
            {
                "program": "EDUCATION PROGRAMME: str",
                "institution": "USER SCHOOL/ITE/PRIVATE SCHOOL ETC: str",
                "start": 1,
                "end": 2
            }
        ],
        "workExperiences": [
            {
                "referee": [
                    {
                        "name": "NAME OF REFEREE: str",
                        "email": "validemail@email.com"
                    }
                ],
                "title": "JOB TITLE: str",
                "company": "COMPANY WORKING AT: str",
                "start": 123456,
                "end": 123456,
                "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY"
            },
            {
                "referee": [],
                "title": "JOB TITLE: str",
                "company": "COMPANY WORKING AT: str",
                "start": 123456,
                "end": 123456,
                "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY"
            }
        ],
        "skills": [
            {
                "name": "NAME OF SKILL: str",
                "description": "short write up about skill"
            }
        ],
        "interests": [
            {
                "name": "NAME OF INTEREST: str"
            }
        ]
      },
        status:200
      };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    renderWithRouter(<ConfirmationPage
      user={{id:1}}
    />);
    await wait(()=>expect(screen.getAllByText(/Confirmation page/i).length).toBe(2));
  });
  
})
