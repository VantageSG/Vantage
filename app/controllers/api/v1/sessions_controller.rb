#Controller for all sessions
class Api::V1::SessionsController < Api::V1::BaseController
  def create
    user = User.find_by(email: session_params[:email])

    if user&.authenticate(session_params[:password])
      session[:user_id] = user.id
      render json: {
        logged_in: true,
        user: user
      }
    else
      render json: {
        errors: 'verify credentials and try again or signup'
      }, status: 401
    end
  end

  def is_logged_in?
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }, status: 404
    end
  end

  def destroy
    reset_session
    render json: {
      logged_out: true
    }
  end
  private
  def session_params
    params.require(:user).permit(:username, :email, :password)
  end
end
