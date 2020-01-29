require 'rails_helper'

RSpec.describe Api::V1::Resumes::WorkexperiencesController, type: :request do
  let!(:user) { create(:typical_user) }
  let(:user_id) { user.id }
  let(:url) { "/api/v1/vrs/#{user_id}/workExperiences/" }

  # skip authentication
  before :each do
    Api::V1::Resumes::WorkexperiencesController.any_instance.stub(:authenticate)
  end

  # TEST suite for SHOW workexperiences
  describe 'GET api/v1/vrs/:user_id/workExperiences/' do

    context 'empty workexperiences' do
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['workExperiences']).to eq([])
      end
    end

    context 'non-empty workexperiences' do
      before { create_list(:workexperience, 5, resume_id: user.resume.last.id, end:123) }
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['workExperiences'].size).to eq(5)
      end
    end
  end

  # TEST suite for CREATE workexperiences
  describe 'POST api/v1/vrs/:user_id/workExperiences/' do

    let(:valid_attributes) do
      {
        "work_experiences": [
          {
            "title": "JOB TITLE: str",
            "company": "COMPANY WORKING AT: str",
            "start": "123456",
            "end": "123456",
            "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY",
            "referees": [
              {
              "name": "NAME OF REFEREE: str",
              "email": "validemail@email.com"
            }
            ]
          },
          {
            "title": "JOB TITLE: str",
            "company": "COMPANY WORKING AT: str",
            "start": "123456",
            "end": "123456",
            "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY",
            "referees": [
              {
              "name": "NAME OF REFEREE: str",
              "email": "validemail2@email.com"
              }
            ]
          }
        ]
      }
    end

    let(:invalid_attributes) do
      {
        "work_experiences": [
          {
            "title": "JOB TITLE: str",
            "company": "COMPANY WORKING AT: str",
            "start": 11012018,
            "end": 11012018,
            "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY",
            "referees": [
              {
              "name": "name",
              "email": "not email"
              }
            ]
          }
        ]
      }
    end

    context 'workExperiences when created with valid values' do
      before { post url, params: valid_attributes }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['workExperiences'].size).to eq(2)
      end
    end

    context 'workExperiences when created with invalid values' do
      before { post url, params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'workExperiences when created' do
      before { create_list(:workexperience, 5, resume_id: user.resume.last.id, end:123) }
      before { post url, params: valid_attributes }

      it 'will replace old ones' do
        expect(response).to have_http_status(200)
        expect(json['workExperiences'].size).to eq(2)
        expect(user.resume.last.work_experience.size()).to eq(2)
      end
    end

    context 'workExperiences when failed creation' do
      before { create_list(:workexperience, 5, resume_id: user.resume.last.id, end: 111) }
      before { post url, params: invalid_attributes }

      it 'will not delete previous workexperiences' do
        expect(response).to have_http_status(400)
        expect(user.resume.last.work_experience.size()).to eq(5)
      end
    end
  end  
end
