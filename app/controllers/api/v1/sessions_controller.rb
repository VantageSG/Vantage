# Controller for all sessions
class Api::V1::SessionsController < Api::V1::BaseController
  def create
    reset_session 
    user = User.find_by(email: session_params[:email])

    if user&.authenticate(session_params[:password])
      session[:user_id] = user.id
      render json: {
        logged_in: true,
        user: user
      }
    else
      raise AuthenticationError, 'verify credentials and try again or signup'
    end
  end

  def create_guest_session
    user = User.find_by(id: params[:guest_user_id])
    raise InvalidParamsError, 'Invalid guest_user_id' if user.nil?
    raise AuthenticationError, 'Cannot create guest session. User already logged in.' if @current_user
    
    if user.guest?
      session[:guest_user_id] = user.id
      session[:user_id] = user.id
      render json: {
        logged_in: true,
        user: user
      }
    else
      raise AuthenticationError, 'Cannot create guest session for non guest user'
    end
  end


  def is_logged_in?
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      raise AuthenticationError, 'User not logged in'
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
