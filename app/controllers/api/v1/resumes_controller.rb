class Api::V1::ResumesController < Api::V1::BaseController
  before_action :authenticate
  before_action :get_user
  before_action :get_resume

  def show
    if !@resume
      render json: {
        errors: ['No resume found.']
      }, status: 404
    else
      render json: get_resume_format
    end
  end

  def create
    if !@resume
      @resume = @user.resume.build()
      @resume.save!
    end
    ActiveRecord::Base.transaction do
      clear_resume_data()
      update_resume()
    end
    render json: get_resume_format
  end

  private
  def get_user
    @user = User.find(params[:user_id])
  end

  private
  def get_resume
    @resume = @user.resume.last
  end

  private
  def get_resume_format
    @resume_format = {
      about: @resume.about,
      educations: @resume.education,
      workExperiences: @resume.work_experience.map {
        |work_experience| work_experience.attributes.merge({:referees => work_experience.referee})
      },
      skills: @resume.skill,
      interests: @resume.interest
    }
  end

  private
  def clear_resume_data
    [@resume.education, @resume.work_experience, @resume.skill, @resume.interest].each do |queryset|
      queryset.destroy_all()
    end
    if @resume.about
      @resume.about.destroy()
    end
  end

  private
  def update_resume
    @resume.build_about(params.require(:about).permit(:name, :email, :contact_number, :about_me)).save!

    for education_params in params.require(:educations)
      @resume.education.build(education_params.permit(:program, :institution, :start, :end, :grade)).save!
    end

    for work_experience_params in params.require(:work_experiences)
      referees_params = work_experience_params[:referees]
      work_experience_params.delete(:referees)
      work_experience = @resume.work_experience.build(
        work_experience_params.permit(:title, :company, :start, :end, :achievements
      ))
      work_experience.save!
      for referee_params in referees_params
        work_experience.referee.build(referee_params.permit(:name, :email)).save!
      end
    end

    for skill in params.require(:skills)
      @resume.skill.build(skill.permit(:name, :description, :link)).save!
    end

    for interest in params.require(:interests)
      @resume.interest.build(interest.permit(:name)).save!
    end
  end
end