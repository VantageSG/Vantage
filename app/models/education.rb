class Education < ApplicationRecord
  belongs_to :resume
  validates :program, presence: true
  validates :institution, presence: true
  validates :start, presence: true
  validates :start, numericality: { only_integer: true }
  validates :end, presence: true
  validates :end, numericality: { only_integer: true }
  validates :grade, presence: true
end
