# frozen_string_literal: true.
require 'rails_helper'

# Test suite for the User model
RSpec.describe User, type: :model do
  # Validation tests
  # ensures it has 1 userprofile
  it { should have_one(:user_profile) }
  it { should have_many(:resume) }
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should validate_length_of(:username).is_at_least(4) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should allow_value('email@addresse.foo').for(:email) }
end
