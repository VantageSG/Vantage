class WorkExperience < ApplicationRecord
  belongs_to :resume
  has_many :referee
  validates :title, presence: true
  validates :company, presence: true
  validates :start, presence: true
  validates :start, numericality: { only_integer: true }
  validates :end, presence: true
  validates :end, numericality: { only_integer: true }
  validates :achievements, presence: true
end
