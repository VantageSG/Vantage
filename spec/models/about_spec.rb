require 'rails_helper'

RSpec.describe About, type: :model do
  # Validation tests
  # ensures it belongs to 1 resume
  it { should belong_to(:resume) }
  # ensures attributes are created before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:contact_number) }
  it { should validate_presence_of(:about_me) }
  # ensures attributes are of certain type
  it { should validate_numericality_of(:contact_number).only_integer }
  # ensures attributes are of certain format
  it { should allow_value('email@addresse.foo').for(:email) }
end
