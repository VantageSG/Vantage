require 'gingerice'
require 'marky_markov'

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
    puts "Hello"
    # Markov Model sentence generation
    markov = MarkyMarkov::TemporaryDictionary.new
    markov.parse_string "This is an idea of a perfect dictionary that is not related to the user input."
    puts markov.generate_n_words 12
    markov.clear!
    # Grammar formatting for about_me before posting to DB
    text = params[:about][:about_me]
    parser = Gingerice::Parser.new
    result = parser.parse text
    params[:about][:about_me] = result['result']
    @resume.build_about(params.require(:about).permit(:name, :email, :contact_number, :about_me)).save!
  end
end