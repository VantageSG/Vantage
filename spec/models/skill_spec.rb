require 'rails_helper'

RSpec.describe Skill, type: :model do
  # Validation tests
  # ensures it belongs to 1 resume
  it { should belong_to(:resume) }
  # ensures attributes are created before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:link) }
end
