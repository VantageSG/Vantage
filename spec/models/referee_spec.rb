require 'rails_helper'

RSpec.describe Referee, type: :model do
  # Validation tests
  # ensures it belongs to 1 work_experience
  it { should belong_to(:work_experience) }
  # ensures attributes are created before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  # ensures attributes are of certain format
  it { should allow_value('email@addresse.foo').for(:email) }
end
