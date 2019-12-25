require 'rails_helper'

RSpec.describe UserProfile, type: :model do

  # Validation tests
  # ensures it belongs to 1 user
  it { should belong_to(:user) }
  # ensures attributes are created before saving
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
end
