require 'gingerice'

class Api::V1::Resumes::WorkexperiencesController < Api::V1::Resumes::BaseVrsController
  
  def get_component_format
    {
      workExperiences: @resume.work_experience
    }
  end

  def clear_component_data
    @resume.work_experience.destroy_all()
  end

  def update_component
    # Grammar formatting for achievements before posting to DB

    for work_experience_params in params[:work_experiences]
      parser = Gingerice::Parser.new
      text = work_experience_params[:achievements]
      result = parser.parse text
      work_experience_params[:achievements] = result['result']
      work_experience = @resume.work_experience.build(
        work_experience_params.permit(:title, :company, :start, :end, :achievements
      ))
      work_experience.save!
    end
  end
end
