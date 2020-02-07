class Resume < ApplicationRecord
    belongs_to :user
    has_one :about, dependent: :destroy
    has_many :education, dependent: :destroy
    has_many :work_experience, dependent: :destroy
    has_many :skill, dependent: :destroy
    has_many :interest, dependent: :destroy
end
