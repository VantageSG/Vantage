class Api::V1::UsersController < Api::V1::BaseController
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
    @user = User.find(params[:user_id])
    render json: {
      user: @user
    }
  rescue ActiveRecord::RecordNotFound
    raise ActiveRecord::RecordNotFound, 'user not found'
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: {
        user: user
      }, status: 201
    else 
      render json: {
        errors: user.errors.full_messages
      }, status: 400
    end
  end

  def create_guest_user
    #TODO find a way to conditional has_secure_passwordc
    user = User.new(:username=> "guest", :password=> "guest", :guest => true)
    if user.save
      render json: {
        user: user
      }, status: 201
    else 
      render json: {
        errors: user.errors.full_messages
      }, status: 400
    end
  end

  def migrate_guest_user
    guest_user = User.find(params[:guest_user_id])
    user = User.find_by(email: user_params[:email])
    if user&.authenticate(user_params[:password])
      
      guest_user.move_to(user)
      guest_user.destroy
      render json: {
        logged_in: true,
        user: user
      }
    else
      raise AuthenticationError, 'verify credentials and try again or signup'
    end
  end

  private
  def user_params
    params
      .require(:user)
      .permit(:username, :email, :password, :password_confirmation)
  end
end