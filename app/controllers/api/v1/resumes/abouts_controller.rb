require 'gingerice'

class Api::V1::Resumes::AboutsController < Api::V1::Resumes::BaseVrsController
  def get_component_format
    {about: @resume.about}
  end

  def clear_component_data
    if @resume.about
      @resume.about.destroy()
    end
  end

  def update_component
    # Grammar formatting for about_me before posting to DB
    text = params[:about][:about_me]
    parser = Gingerice::Parser.new
    result = parser.parse text
    params[:about][:about_me] = result['result']
    @resume.build_about(params.require(:about).permit(:name, :email, :contact_number, :about_me)).save!
  end
end