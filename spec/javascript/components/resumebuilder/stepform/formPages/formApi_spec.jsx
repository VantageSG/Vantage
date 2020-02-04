import React from 'react';
import {getEndPoint} from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/formApi.jsx';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
jest.mock('axios');

describe('Get EndPoint', () => {
  it('should generate  the correct endPoint', () => {
    expect(getEndPoint("about",20)).toEqual( process.env.BACKEND_PORT + "/api/v1/vrs/20/about")
  })
})