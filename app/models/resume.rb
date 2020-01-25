class Resume < ApplicationRecord
    belongs_to :user
    has_one :about
    has_many :education
    has_many :work_experience
    has_many :skill
    has_many :interest
end
