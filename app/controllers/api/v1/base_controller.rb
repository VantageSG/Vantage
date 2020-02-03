# Parent class for all API controllers
class Api::V1::BaseController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :authenticate
  before_action :set_current_user

  rescue_from Exception, with: :render_500_error
  rescue_from AuthenticationError, with: :render_401_error
  rescue_from InvalidParamsError, with: :render_400_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_404_error
  rescue_from ActiveRecord::RecordInvalid, with: :render_json_error

  def set_current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authenticate
    
    raise AuthenticationError, 'User not logged in' if @current_user.nil?
    #User id in params and session must be the same
    if params[:user_id]
      user = User.find(params[:user_id]) 
      raise AuthenticationError, 'User not authorized' if @current_user != user
    end 
    #Guest user has already logged in
    if session[:guest_user_id] && session[:guest_user_id] != session[:user_id]
      
      guest_user = User.find(session[:guest_user_id])
      raise InvalidParamsError, 'Invalid guest_user_id in session' unless guest_user.guest?
      session.delete(:guest_user_id)
      
      guest_user.destroy
    end
  end

  def render_json_error(error)
    render json: {
      error: "#{error.record.class.name} record: #{error.message}"
    }, status: 400 # Bad Request
  end

  def render_500_error(error)
    render json: {
      error: error.message
    }, status: 500 # Internal Server Error
  end

  def render_400_error(error)
    render json: {
      error: error.message
    }, status: 400 # Internal Server Error
  end


  def render_401_error(error)
    render json: {
      error: error.message
    }, status: 401 # Internal Server Error
  end

  def render_404_error(error)
    render json: {
      error: error.message
    }, status: 404 # Not Found
  end
end
