require 'rails_helper'

RSpec.describe Api::V1::Resumes::EducationsController, type: :request do
  let!(:user) { create(:typical_user) }
  let(:user_id) { user.id }
  let(:url) { "/api/v1/vrs/#{user_id}/educations/" }

  # skip authentication
  before :each do
    Api::V1::Resumes::EducationsController.any_instance.stub(:authenticate)
  end

  # TEST suite for SHOW educations
  describe 'GET api/v1/vrs/:user_id/educations/' do

    context 'empty educations' do
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['educations']).to eq([])
      end
    end

    context 'non-empty educations' do
      before { create_list(:education, 5, resume_id: user.resume.last.id, end:123) }
      before { get url }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['educations'].size).to eq(5)
      end
    end
  end

  # TEST suite for CREATE educations
  describe 'POST api/v1/vrs/:user_id/educations/' do

    let(:valid_attributes) do
      {
        "educations": [
          {
            "program": "EDUCATION PROGRAMME: str",
            "institution": "USER SCHOOL/ITE/PRIVATE SCHOOL ETC: str",
            "start": "11122019",
            "end": "11122019",
            "grade": "EDUCATION GRADE: str"
          },
          {
            "program": "EDUCATION PROGRAMME: str",
            "institution": "USER SCHOOL/ITE/PRIVATE SCHOOL ETC: str",
            "start": "11122019",
            "end": "11122019",
            "grade": "EDUCATION GRADE: str"
          }
        ]
      }
    end

    let(:invalid_attributes) do
      {
        "educations": [
          {
            "program": "EDUCATION PROGRAMME: str",
            "institution": "USER SCHOOL/ITE/PRIVATE SCHOOL ETC: str",
            "start": "not a date",
            "end": "not a date",
            "grade": "EDUCATION GRADE: str"
          }
        ]
      }
    end

    context 'educations when created with valid values' do
      before { post url, params: valid_attributes }

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
        expect(json['educations'].size).to eq(2)
      end
    end

    context 'educations when created with invalid values' do
      before { post url, params: invalid_attributes }

      it 'returns status code 400' do
        expect(response).to have_http_status(400)
      end
    end

    context 'educations when created' do
      before { create_list(:education, 5, resume_id: user.resume.last.id, end:123) }
      before { post url, params: valid_attributes }

      it 'will replace old ones' do
        expect(response).to have_http_status(200)
        expect(json['educations'].size).to eq(2)
        expect(user.resume.last.education.size()).to eq(2)
      end
    end

    context 'educations when failed creation' do
      before { create_list(:education, 5, resume_id: user.resume.last.id, end: 111) }
      before { post url, params: invalid_attributes }

      it 'will not delete previous educations' do
        expect(response).to have_http_status(400)
        expect(user.resume.last.education.size()).to eq(5)
      end
    end
  end  
end
