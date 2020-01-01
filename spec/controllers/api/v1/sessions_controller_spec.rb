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
        expect(json['user']['id']).to eq(expected_user_id)
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
        expect(json['errors']).to eq('verify credentials and try again or signup')
      end

    end

  end

  describe 'GET /api/v1/logged_in' do

    context 'user logged in' do

      before {
        post '/api/v1/login', params: typical_user_jason_credentials
      }

      it 'should return user is logged_in' do
        request.cookies['_Vantage'] = response.cookies['_Vantage']
        get '/api/v1/logged_in'
        expect(json['logged_in']).to eq(true)
      end

      it 'should return valid user is credentials' do
        request.cookies['_Vantage'] = response.cookies['_Vantage']
        get '/api/v1/logged_in'
        expect(json['user']['id']).to eq(User.find_by(email: 'JasonYip@gmail.com').id)
        expect(json['user']['email']).to eq('JasonYip@gmail.com')
        expect(json['user']['username']).to eq('JasonYip')
      end
    end

    context 'user not logged in' do
      it 'should return user is not logged_in' do
        get '/api/v1/logged_in'
        expect(json['logged_in']).to eq(false)
      end
    end
  end

  describe 'POST /api/v1/logout' do
    context 'user is originally logged in' do
      before do
        post '/api/v1/login', params: typical_user_jason_credentials
        request.cookies['_Vantage'] = response.cookies['_Vantage']
        delete '/api/v1/logout'
      end

      it 'should successfully logout' do
        expect(response.status).to eq(200)
        expect(json['logged_out']).to eq(true)
      end

      it 'should not be logged in' do
        request.cookies['_Vantage'] = response.cookies['_Vantage']
        get '/api/v1/logged_in'
        expect(json['logged_in']).to eq(false)
      end
    end
  end
end
