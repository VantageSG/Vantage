require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  let!(:users) { create_list(:user, 10) }
  let(:user_id) { users.first.id }

  describe 'GET /api/v1/users' do
    before { get '/api/v1/users' }
    it 'returns users' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json['users'].size).to eq(10)
    end
  end

  describe 'GET /api/v1/users/:id' do
    before { get "/api/v1/users/#{user_id}" }

    context 'when the record exists' do
      it 'returns the User' do
        expect(json).not_to be_empty
        expect(json['user']['id']).to eq(user_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
    context 'when the record does not exist' do
      let(:user_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/user not found/)
      end
    end
  end
  # Test suite for POST api/v1/users
  describe 'POST api/v1/users' do
    # valid payload
    let(:valid_attributes) { { username: 'Jason Yip', email: 'jasonyip@dsc.com', 
    password: 'foobar', password_confirmation: 'foobar' } }

    context 'when the request is valid' do
      before { post '/api/v1/users', params: valid_attributes }

      it 'creates a user' do
        expect(json['user']['username']).to eq('Jason Yip')
      end

      it 'returns status code 201' do
        expect(json['status']).to eq(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/users', params: { username: 'Jason Yip' } }

      it 'returns status code 400' do
        expect(json['status']).to eq(400)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Password can't be blank/)
      end
    end
  end
end
