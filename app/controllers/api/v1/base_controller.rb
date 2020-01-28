# Parent class for all API controllers
class Api::V1::BaseController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :authenticate
  before_action :set_current_user

  # rescue_from Exception, with: :render_500_error
  rescue_from AuthenticationError, with: :render_401_error
  rescue_from ActiveRecord::RecordNotFound, with: :render_404_error
  rescue_from ActiveRecord::RecordInvalid, with: :render_json_error

  def set_current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authenticate
    raise AuthenticationError, 'User not logged in' if @current_user.nil?
    user = nil
    user = User.find(params[:user_id]) if params[:user_id]
    raise AuthenticationError, 'User not authorized' if @current_user != user
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
