require 'rails_helper'

RSpec.describe Api::V1::Resumes::AboutsController, type: :request do
  let!(:user) { create(:typical_user) }
  let(:user_id) { user.id }
  let(:url) { "/api/v1/vrs/#{user_id}/about/" }

  # skip authentication
  before :each do
    Api::V1::Resumes::AboutsController.any_instance.stub(:authenticate)
  end

  # TEST suite for SHOW abouts
  describe 'GET api/v1/vrs/:user_id/about/' do

    context 'about is nil' do
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['about']).to eq(nil)
      end
    end

    context 'about is not nil' do
      before { create(:about, resume_id: user.resume.last.id) }
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['about']).to_not eq(nil)
      end
    end
  end

  # TEST suite for CREATE abouts
  describe 'POST api/v1/vrs/:user_id/about/' do

    let(:valid_attributes) do
      {
        "about": {
          "name": "USER'S FULL NAME: str",
          "email": "email@email.com",
          "contact_number": "123456789",
          "about_me": "SHORT WRITE UP OF USER: str"
        }
      }
    end

    let(:invalid_attributes) do
      {
        "about": {
          "name": "USER'S FULL NAME: str",
          "email": "notanemail",
          "contactNumber": "123456789",
          "aboutMe": "SHORT WRITE UP OF USER: str"
        }
      }
    end

    context 'about when created with valid values' do
      before { post url, params: valid_attributes }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['about']['name']).to eq(valid_attributes[:about][:name])
      end
    end

    context 'about when created with invalid values' do
      before { post url, params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'about when created' do
      before { create(:about, resume_id: user.resume.last.id) }
      before { post url, params: valid_attributes }

      it 'will replace old one' do
        expect(response).to have_http_status(200)
        expect(user.resume.last.about.name).to eq(valid_attributes[:about][:name])
      end
    end

    context 'about when failed creation' do
      before { create(:about, resume_id: user.resume.last.id) }
      before { post url, params: invalid_attributes }

      it 'will not delete old about' do
        expect(response).to have_http_status(400)
        expect(user.resume.last.about.name).to_not eq(valid_attributes[:about][:name])
      end
    end
  end  
end
