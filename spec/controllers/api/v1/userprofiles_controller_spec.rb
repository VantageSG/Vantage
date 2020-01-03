# spec/requests/items_spec.rb
require 'rails_helper'

RSpec.describe Api::V1::UserprofilesController, type: :request do
  # Initialize the test data
  let!(:users) { create_list(:typical_user, 10) }
  let!(:userprofile) { create(:userprofile, user_id: user_id) }
  let(:user_id) { users.first.id }
  let(:user_id_wo_profile) { users.last.id }
  let(:id) { userprofile.id }

  # TEST suite for SHOW userprofile
  describe 'GET api/v1/users/:user_id/userprofiles' do

    context 'when userprofile exists' do
      before { get "/api/v1/users/#{user_id}/userprofiles" }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['id']).to eq(id)
      end
    end

    context 'when userprofile does not exist' do
      before { get "/api/v1/users/#{user_id_wo_profile}/userprofiles" }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
        expect(response.body).to match(/No user profile found/)
      end
    end

    context 'when user does not exist' do
      before { get "/api/v1/users/ABX1234/userprofiles" }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end

  # TEST suite for CREATE userprofile
  describe 'POST api/v1/users/:user_id/userprofiles' do

    let(:valid_attributes) do
      {
        user_profile: {
          first_name: 'first_name_string',
          last_name: 'last_name_string',
          cv: 'cv_string'
        }
      }
    end

    context 'when userprofile does not exist, but request valid' do
      before { post "/api/v1/users/#{user_id_wo_profile}/userprofiles", params: valid_attributes }

      it 'creates a userprofile ' do
        expect(json['first_name']).to eq('first_name_string')
        expect(json['last_name']).to eq('last_name_string')
        expect(json['cv']).to eq('cv_string')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when userprofile does not exist, but request invalid' do
      let (:invalid_attributes) do
        {
          'user_profile': {
            first_name: 'first_name_string'
          }
        }
      end

      before { post "/api/v1/users/#{user_id_wo_profile}/userprofiles", params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Last name can't be blank/)
      end
    end

    context 'when userprofile already exists' do
      before { post "/api/v1/users/#{user_id}/userprofiles", params: valid_attributes }

      it 'does not create a userprofile' do
        expect(response.body).to match(/User profile already exists/)
      end

      it 'return status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'when user does not exist' do
      before { post "/api/v1/users/ABX1234/userprofiles", params: valid_attributes }
      
      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end

  # TEST suite for UPDATE userprofile
  describe 'patch /api/v1/users/:user_id/userprofiles' do

    let(:valid_attributes) do
      {
        user_profile: {
          first_name: 'update_string'
        }
      }
    end

    context 'when userprofile exists, request valid' do
      before { patch "/api/v1/users/#{user_id}/userprofiles", params: valid_attributes }

      it 'updates the userprofile ' do
        expect(json['first_name']).to eq('update_string')
        expect(json['id']).to eq(id)
        expect(json['user_id']).to eq(user_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when userprofile does not exist' do
      before { patch "/api/v1/users/#{user_id_wo_profile}/userprofiles", params: valid_attributes }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
        expect(response.body).to match(/No user profile found/)
      end
    end

    context 'when user does not exist' do
      before { patch "/api/v1/users/ABX1234/userprofiles" }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end
end