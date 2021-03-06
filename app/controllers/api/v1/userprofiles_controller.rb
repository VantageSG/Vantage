class Api::V1::UserprofilesController < Api::V1::BaseController
  before_action :get_user
  before_action :set_user_profile, only: [:show, :update]
  before_action :authenticate, only: [:create, :update]

  def show
    render json: @user_profile
  end

  def create
    if @user.user_profile
      render json: {
        errors: ["User profile already exists."]
      }, status: 400
    else
      @user_profile = @user.build_user_profile(user_profile_params)
      if @user_profile.save
        render json: @user_profile, status: 201
      else
        render json: {
          errors: @user_profile.errors.full_messages
        }, status: 400
      end
    end
  end

  def update
    @user_profile.update(user_profile_params)
    render json: @user_profile
  end
  
  private
  def get_user
    @user = User.find(params[:user_id])
  end

  def set_user_profile
    @user_profile = @user.user_profile
    if !@user_profile
      render json: {
        errors: ['No user profile found.']
      }, status: 404
    end
  end

  def user_profile_params
    params
    .require(:user_profile)
    .permit(:first_name, :last_name, :cv)
  end
end