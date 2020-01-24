require 'rails_helper'

RSpec.describe Education, type: :model do
  # Validation tests
  # ensures it belongs to 1 resume
  it { should belong_to(:resume) }
  # ensures attributes are created before saving
  it { should validate_presence_of(:program) }
  it { should validate_presence_of(:institution) }
  it { should validate_presence_of(:start) }
  it { should validate_presence_of(:end) }
  # ensures attributes are of certain type
  it { should validate_numericality_of(:start).only_integer }
  it { should validate_numericality_of(:end).only_integer }
end
