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
    begin 
      @user = User.find(params[:id])
      render json: {
        user: @user
      }
    rescue ActiveRecord::RecordNotFound => e
      raise ActiveRecord::RecordNotFound, "user not found"
    end
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      login!
      render json: {
        status: 201,
        user: @user
      }
    else 
      render json: {
        status: 400,
        errors: @user.errors.full_messages
      }
    end
  end

  private
  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end