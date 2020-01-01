class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

  rescue_from Exception, with: :render_500_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_404_error
  rescue_from ActiveRecord::RecordInvalid, with: :render_json_error
  def login!
    session[:user_id] = @user.id
  end

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def authorized_user?
    @user == current_user
  end

  def logout!
    reset_session
  end

  def render_500_error(error)
    render json: {
      error: error.message
    }, status: 500 # Internal Server Error
  end

  def render_json_error(error)
    render json: {
      error: error.message
    }, status: 400 # Bad Request
  end

  def render_404_error(error)
    render json: {
      error: error.message
    }, status: 404 # Not Found
  end
end
