class Api::V1::Resumes::EducationsController < Api::V1::Resumes::BaseVrsController
  def get_component_format
    {educations: @resume.education}
  end

  def clear_component_data
    @resume.education.destroy_all()
  end

  def update_component
    for education_params in params[:educations]
      @resume.education.build(education_params.permit(:program, :institution, :start, :end, :grade)).save!
    end
  end
end
