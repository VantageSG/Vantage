require 'rails_helper'

RSpec.describe Resume, type: :model do
  it { should have_one(:about) }
  it { should have_many(:education) }
  it { should have_many(:work_experience) }
  it { should have_many(:skill) }
  it { should have_many(:interest) }
end
