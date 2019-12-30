require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  let!(:typical_user_jason) { create(:typical_user_jason) }
  let(:typical_user_jason_credentials) do
    {
      user: {
        username: 'JasonYip',
        email: 'JasonYip@gmail.com',
        password: 'password'
      }
    }
  end
  describe 'POST /api/v1/login' do

    context 'successful logged in' do

      before {post '/api/v1/login', params: typical_user_jason_credentials}

      it 'should be logged in' do
        expect(json['logged_in']).to eq(true)
      end

      it 'should return accurate user_id' do
        expected_user_id = User.find_by(email: 'JasonYip@gmail.com').id
        expect(expected_user_id).to eq(json['user']['id'])
      end

    end

    context 'invalid logged in' do

      before {
        invalid_credentials = typical_user_jason_credentials.clone
        invalid_credentials[:user][:password] = 'foobar'
        post '/api/v1/login', params: invalid_credentials
      }

      it 'should be logged in' do  
        expect(response.status).to eq(401)
      end

      it 'should return error message' do
        expect(response['errors']).to eq('no such user')
      end

    end

  end

  
end