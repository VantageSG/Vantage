class Api::V1::UserprofilesController < ApplicationController
  before_action :get_user
  before_action :set_user_profile, only: [:show, :update]

  def show
    if @user_profile
      render json: {
        user_profile: @user_profile
      }
    else
      render json: {
        errors: ['no user_profile found']
      }, status: 500
    end
  end

  def create
    @user_profile = @user.build_user_profile(user_profile_params)

    if @user_profile.save
      render json: {
        user_profile: @user_profile
      }, status: 201
    else
      render json: {
        errors: @user_profile.errors.full_messages
      }, status: 400
    end
  end
  
  private
  def get_user
    @user = User.find(params[:user_id])
  end

  def set_user_profile
    @user_profile = @user.user_profile
  end

  def user_profile_params
    params
    .require(:user_profile)
    .permit(:first_name, :last_name, :email, :cvurl)
  end
end