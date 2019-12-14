# spec/support/api_spec_helper
module ApiSpecHelper
  # Parse JSON response to ruby hash
  def json
    JSON.parse(response.body)
  end
end