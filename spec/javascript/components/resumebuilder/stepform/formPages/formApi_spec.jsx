import React from 'react';
import {getForm, postForm, getEndPoint} from 'components/resumebuilder/stepform/formPages/formApi';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
jest.mock('axios');

describe('Get EndPoint', () => {
  it('should generate  the correct endPoint', () => {
    expect(getEndPoint("about",20)).toEqual( process.env.BACKEND_PORT + "/api/v1/vrs/20/about")
  })
})