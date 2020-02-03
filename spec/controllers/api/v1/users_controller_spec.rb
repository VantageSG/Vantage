require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  let!(:users) { create_list(:typical_user, 10) }
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
      let(:user_id) { 'ABX1234' }

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
    let(:valid_attributes) do
      {
        user: {
          username: 'JasonYip',
          email: 'JasonYip@gmail.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end

    context 'when the request is valid' do
      before { post '/api/v1/users', params: valid_attributes }

      it 'creates a user' do
        expect(json['user']['username']).to eq('JasonYip')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before do
        post '/api/v1/users', params: { user: { username: 'JasonYip' } }
      end

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Password can't be blank/)
      end
    end
  end

  describe 'GET /api/v1/users/guest_user' do
    before { post '/api/v1/users/guest_user' }
    it 'returns guest user' do
      expect(json['user']['id']).not_to be_nil
      expect(json['user']['username']).to eq('guest')
      expect(json['user']['email']).to be_nil
      expect(json['user']['guest']).to be true
    end
  end

  describe 'POST /users/:user_id/migrate/:guest_user' do
    let!(:typical_user_jason) { create(:typical_user_jason) }
    let(:valid_attributes) do
      {
        user: {
          username: 'JasonYip',
          email: 'JasonYip@gmail.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end
    before do
      post '/api/v1/users/guest_user'
      @guest_user = User.find(json['user']['id'])
      expect(typical_user_jason.resume[0].id)
        .not_to eq(@guest_user.resume[0].id)
      post "/api/v1/users/#{typical_user_jason.id}/migrate/#{@guest_user.id}"
        , params: valid_attributes
    end
    it 'should delete guest user' do
      expect { User.find(@guest_user.id) }
        .to raise_exception(ActiveRecord::RecordNotFound)
    end
    it 'should migrate all resume guest user' do
      @guest_user.resume.each do |guest_user_resume|
        expect(Resume.find(guest_user_resume.id).user_id)
          .to eq(typical_user_jason.id)
      end
    end
  end
end
