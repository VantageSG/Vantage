class Api::V1::Resumes::WorkexperiencesController < Api::V1::Resumes::BaseVrsController
  
  def get_component_format
    {
      workExperiences: @resume.work_experience.map {
        |work_experience| work_experience.attributes.merge({:referees => work_experience.referee})
      }
    }
  end

  def clear_component_data
    @resume.work_experience.destroy_all()
  end

  def update_component
    for work_experience_params in params[:work_experiences]
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
  end

end
