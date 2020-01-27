class Api::V1::Resumes::SkillsController < Api::V1::Resumes::BaseVrsController
  
  def get_component_format
    {skills: @resume.skill}
  end

  def clear_component_data
    @resume.skill.destroy_all()
  end

  def update_component
    for skill_params in params[:skills]
      @resume.skill.build(skill_params.permit(:name, :description, :link)).save!
    end
  end

end
