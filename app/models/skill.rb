class Skill < ApplicationRecord
  belongs_to :resume
  # validates :name, presence: true
  # validates :description, presence: true
end
