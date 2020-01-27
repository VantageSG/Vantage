class Api::V1::Resumes::InterestsController < Api::V1::Resumes::BaseVrsController
  def get_component_format
    {interests: @resume.interest}
  end

  def clear_component_data
    @resume.interest.destroy_all()
  end

  def update_component
    for interest_params in params[:interests]
      @resume.interest.build(interest_params.permit(:name)).save!
    end
  end
end
