require 'rails_helper'

RSpec.describe Api::V1::Resumes::SkillsController, type: :request do
  let!(:user) { create(:typical_user) }
  let(:user_id) { user.id }
  let(:url) { "/api/v1/vrs/#{user_id}/skills/" }

  # skip authentication
  before :each do
    Api::V1::Resumes::SkillsController.any_instance.stub(:authenticate)
  end

  # TEST suite for SHOW skills
  describe 'GET api/v1/vrs/:user_id/skills/' do

    context 'empty skills' do
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['skills']).to eq([])
      end
    end

    context 'non-empty skills' do
      before { create_list(:skill, 5, resume_id: user.resume.last.id,) }
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['skills'].size).to eq(5)
      end
    end
  end

  # TEST suite for CREATE skills
  describe 'POST api/v1/vrs/:user_id/skills/' do

    let(:valid_attributes) do
      {
        "skills": [{
          "name": "name",
          "description": "name",
          "link": "name",
        },
        {
          "name": "name",
          "description": "name",
          "link": "name",
        }]
      }
    end

    let(:invalid_attributes) do
      {
        "skills": [{
          "email": "notanemail",
        }]
      }
    end

    context 'skills when created with valid values' do
      before { post url, params: valid_attributes }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['skills'].size).to eq(2)
      end
    end

    context 'skills when created with invalid values' do
      before { post url, params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'skills when created' do
      before { create_list(:skill, 5, resume_id: user.resume.last.id,) }
      before { post url, params: valid_attributes }

      it 'will replace old ones' do
        expect(response).to have_http_status(200)
        expect(json['skills'].size).to eq(2)
        expect(user.resume.last.skill.size()).to eq(2)
      end
    end

    context 'skills when failed creation' do
      before { create_list(:skill, 5, resume_id: user.resume.last.id,) }
      before { post url, params: invalid_attributes }

      it 'will not delete previous skills' do
        expect(response).to have_http_status(400)
        expect(user.resume.last.skill.size()).to eq(5)
      end
    end
  end  
end
