class Api::V1::UsersController < ApplicationController
  def index
      @users = User.all
      if @users
        render json: {
          users: @users
        }
      else
        render json: {
          status: 500,
          errors: ['no users found']
        }
      end
  end
  def show
    @user = User.find(params[:id])
    render json: {
      user: @user
    }
  rescue ActiveRecord::RecordNotFound
    raise ActiveRecord::RecordNotFound, 'user not found'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        user: @user
      }, status: 201
    else 
      render json: {
        errors: @user.errors.full_messages
      }, status: 400
    end
  end

  private
  def user_params
    params
      .require(:user)
      .permit(:username, :email, :password, :password_confirmation)
  end
end