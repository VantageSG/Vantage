class Api::V1::Resumes::ResumesController < Api::V1::BaseController
  before_action :authenticate
  before_action :get_user
  before_action :get_resume

  def show
    raise ActiveRecord::RecordNotFound, "User has no resume." if !@resume
    render json: get_resume_format
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

  def download    
    header_html = ('' + render_to_string(partial: 'resume_header.html.erb')).to_s
    body_html   = params.require(:resume).to_s
    footer_html = ('' + render_to_string( partial: 'resume_footer.html.erb')).to_s    
    pdf = WickedPdf.new.pdf_from_string(
      header_html + body_html + footer_html,
      margin: {bottom: 0, top: 0, left: 0, right: 0}
    );
    send_data(pdf,
      :filename => 'resume.pdf',
      :disposition => 'attachment'
    )
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
      workExperiences: @resume.work_experience,
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
    for education_params in params[:educations]
      @resume.education.build(education_params.permit(:program, :institution, :start, :end, :grade)).save!
    end

    for work_experience_params in params[:work_experiences]
      work_experience = @resume.work_experience.build(
        work_experience_params.permit(:title, :company, :start, :end, :achievements
      ))
      work_experience.save!
    end

    for skill_params in params[:skills]
      @resume.skill.build(skill_params.permit(:name, :description, :link)).save!
    end

    for interest_params in params[:interests]
      @resume.interest.build(interest_params.permit(:name)).save!
    end
  end
end