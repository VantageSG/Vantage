require 'rails_helper'

RSpec.describe Api::V1::Resumes::InterestsController, type: :request do
  let!(:user) { create(:typical_user) }
  let(:user_id) { user.id }
  let(:url) { "/api/v1/vrs/#{user_id}/interests/" }

  # skip authentication
  before :each do
    Api::V1::Resumes::InterestsController.any_instance.stub(:authenticate)
  end

  # TEST suite for SHOW interests
  describe 'GET api/v1/vrs/:user_id/interests/' do

    context 'empty interests' do
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['interests']).to eq([])
      end
    end

    context 'non-empty interests' do
      before { create_list(:interest, 5, resume_id: user.resume.last.id,) }
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['interests'].size).to eq(5)
      end
    end
  end

  # TEST suite for CREATE interests
  describe 'POST api/v1/vrs/:user_id/interests/' do

    let(:valid_attributes) do
      {
        "interests": [{
          "name": "name",
        },
        {
          "name": "name",          
        }]
      }
    end

    let(:invalid_attributes) do
      {
        "interests": [{
          "email": "notanemail",
        }]
      }
    end

    context 'interests when created with valid values' do
      before { post url, params: valid_attributes }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['interests'].size).to eq(2)
      end
    end

    context 'interests when created with invalid values' do
      before { post url, params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'interests when created' do
      before { create_list(:interest, 5, resume_id: user.resume.last.id,) }
      before { post url, params: valid_attributes }

      it 'will replace old ones' do
        expect(response).to have_http_status(200)
        expect(json['interests'].size).to eq(2)
        expect(user.resume.last.interest.size()).to eq(2)
      end
    end

    context 'interests when failed creation' do
      before { create_list(:interest, 5, resume_id: user.resume.last.id,) }
      before { post url, params: invalid_attributes }

      it 'will not delete previous interests' do
        expect(response).to have_http_status(400)
        expect(user.resume.last.interest.size()).to eq(5)
      end
    end
  end  
end
