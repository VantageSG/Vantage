require 'rails_helper'

RSpec.describe Api::V1::BaseController, type: :controller do
  let!(:typical_user1) { create(:typical_user) }
  let!(:typical_user2) { create(:typical_user) }
  let!(:typical_guest_user) { create(:typical_guest_user) }
  controller(described_class) do
    def index
      call
      render json: expected_response
    end

    private def call; end

    private def expected_response
      { success: true }
    end
  end
  describe 'Generic API call' do
    it 'should set current user from session' do
      session[:user_id] = typical_user1.id
      expect(controller.set_current_user.id).to eq(typical_user1.id)
    end

    it 'should not raise not authorized if user_id in params and session are same' do
      session[:user_id] = typical_user1.id
      controller.params[:user_id] = typical_user1.id
      controller.set_current_user
      expect{controller.authenticate}.not_to raise_error
    end


    it 'should user not logged in if no current user' do
      expect{controller.authenticate}.to raise_error(AuthenticationError, 'User not logged in')
    end

    
    it 'should raise not authorized if user_id in params and session are different' do
      session[:user_id] = typical_user1.id
      controller.params[:user_id] = typical_user2.id
      controller.set_current_user
      expect{controller.authenticate}.to raise_error(AuthenticationError, 'User not authorized')
    end

    it 'Should delete guest user once the user logged in' do
      session[:user_id] = typical_user1.id
      session[:guest_user_id] = typical_user2.id
      controller.set_current_user
      expect{controller.authenticate}.to raise_error(InvalidParamsError, 'Invalid guest_user_id in session')
    end

    it 'Should delete not guest user if the user is not guest' do
      session[:user_id] = typical_user1.id
      session[:guest_user_id] = typical_guest_user.id
      controller.set_current_user
      controller.authenticate
      expect{User.find(typical_guest_user.id)}.to raise_error(ActiveRecord::RecordNotFound, "Couldn't find User with 'id'=#{typical_guest_user.id}")
    end
  end
end