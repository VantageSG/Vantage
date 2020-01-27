require 'rails_helper'

RSpec.describe Api::V1::Resumes::ResumesController, type: :request do
  let!(:user) { create(:typical_user) }
  let(:user_id) { user.id }
  let(:url) { "/api/v1/vrs/#{user_id}/" }
  let(:seed_data) { 
    create(:about, resume_id: user.resume.last.id)
    create_list(:education, 5, resume_id: user.resume.last.id, end:123)
    create_list(:workexperience, 5, resume_id: user.resume.last.id, end:123)
    create_list(:skill, 5, resume_id: user.resume.last.id,)
    create_list(:interest, 5, resume_id: user.resume.last.id)
  }

  # skip authentication
  before :each do
    Api::V1::Resumes::ResumesController.any_instance.stub(:authenticate)
  end

  # TEST suite for SHOW resumes
  describe 'GET api/v1/vrs/:user_id/' do

    context 'empty resume components' do
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['about']).to eq(nil)
        expect(json['educations']).to eq([])
        expect(json['workExperiences']).to eq([])
        expect(json['skills']).to eq([])
        expect(json['interests']).to eq([])
      end
    end

    context 'non-empty resume components' do
      before { seed_data }
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['about']).to_not eq(nil)
        expect(json['educations'].size).to eq(5)
        expect(json['workExperiences'].size).to eq(5)
        expect(json['skills'].size).to eq(5)
        expect(json['interests'].size).to eq(5)
      end
    end
  end
    
  # TEST suite for CREATE resumes
  describe 'POST api/v1/vrs/:user_id/' do

    let(:valid_attributes) do
      {
        "about": {
          "name": "USER'S FULL NAME: str",
          "email": "email@email.com",
          "contact_number": "123456789",
          "about_me": "SHORT WRITE UP OF USER: str"
        },
        "educations": [
          {
            "program": "CS",
            "institution": "NUS",
            "start": "111111",
            "end": "111111",
            "grade": "EDUCATION GRADE: str"
          },
          {
            "program": "EDUCATION PROGRAMME: 11",
            "institution": "USER SCHOOL/ITE/PRIVATE SCHOOL ETC: str",
            "start": "10102019",
            "end": "10102019",
            "grade": "EDUCATION GRADE: str"
          }
        ],
        "work_experiences": [
          {
            "title": "JOB TITLE: str",
            "company": "COMPANY WORKING AT: str",
            "start": "10102019",
            "end": "10102019",
            "achievements": "SHORT WRITE UP ABOUT ACHIEVEMENTS IN THE COMPANY",
            "referees": [
              {
              "name": "NAME OF REFEREE: str",
              "email": "email@email.com"
            }
            ]
          }
        ],
        "skills": [
          {
            "name": "NAME OF SKILL: str",
            "description": "short write up about skill",
            "link": "External link to photo/video of the skill"
          }
        ],
        "interests": [
          {
            "name": "NAME OF INTEREST: str"
          },
          {
            "name": "NAME OF INTEREST: str"
          }
        ]
      }
    end

    let(:invalid_attributes) do
      {
        "about": {
          "email": "not an email"
        },
        "educations": [],
        "work_experiences": [],
        "skills": [],
        "interests": []
      }
    end

    context 'resume when created with valid values' do
      before { post url, params: valid_attributes }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['about']).to_not eq(nil)
        expect(json['educations'].size).to eq(2)
        expect(json['workExperiences'].size).to eq(1)
        expect(json['skills'].size).to eq(1)
        expect(json['interests'].size).to eq(2)
      end
    end

    context 'resume when created with invalid values' do
      before { post url, params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'resume when created' do
      before { seed_data }
      before { post url, params: valid_attributes }

      it 'will replace old components with new ones' do
        expect(response).to have_http_status(200)
        expect(response).to have_http_status(200)
        expect(json['about']).to_not eq(nil)
        expect(json['educations'].size).to eq(2)
        expect(json['workExperiences'].size).to eq(1)
        expect(json['skills'].size).to eq(1)
        expect(json['interests'].size).to eq(2)
        expect(user.resume.last.about.name).to eq(valid_attributes[:about][:name])
        expect(user.resume.last.education.size()).to eq(2)
        expect(user.resume.last.work_experience.size()).to eq(1)
        expect(user.resume.last.skill.size()).to eq(1)
        expect(user.resume.last.interest.size()).to eq(2)
      end
    end

    context 'resume when failed creation' do
      before { seed_data }
      before { post url, params: invalid_attributes }

      it 'will not delete old components' do
        expect(response).to have_http_status(400)
        expect(user.resume.last.about.name).to_not eq(valid_attributes[:about][:name])
        expect(user.resume.last.education.size()).to eq(5)
        expect(user.resume.last.work_experience.size()).to eq(5)
        expect(user.resume.last.skill.size()).to eq(5)
        expect(user.resume.last.interest.size()).to eq(5)
      end
    end
  end
end
