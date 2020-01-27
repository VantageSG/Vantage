# BASE CLASS to be inherited by all controllers of resume's sub components
class Api::V1::Resumes::BaseVrsController < Api::V1::BaseController
  before_action :authenticate
  before_action :get_resume

  def show
    render json: get_component_format
  end

  def create
    ActiveRecord::Base.transaction do
      clear_component_data()
      update_component()
    end
    render json: get_component_format
  end

  def get_resume
    @resume = User.find(params[:user_id]).resume.last
    raise ActiveRecord::RecordNotFound, "User has no resume." if !@resume
  end

  def get_component_format
    raise NotImplementedError, "Method must be implemented by subclass"
  end

  def clear_component_data
    raise NotImplementedError, "Method must be implemented by subclass"
  end

  def update_component
    raise NotImplementedError, "Method must be implemented by subclass"
  end
end
