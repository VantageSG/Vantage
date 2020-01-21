require 'rails_helper'

RSpec.describe WorkExperience, type: :model do
  # Validation tests
  # ensures it belongs to 1 resume
  it { should belong_to(:resume) }
  it { should have_many(:referee) }
  # ensures attributes are created before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:company) }
  it { should validate_presence_of(:start) }
  it { should validate_presence_of(:end) }
  it { should validate_presence_of(:achievements) }
  # ensures attributes are of certain type
  it { should validate_numericality_of(:start).only_integer }
  it { should validate_numericality_of(:end).only_integer }
end
