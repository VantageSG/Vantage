class Referee < ApplicationRecord
  belongs_to :work_experience
  validates :name, presence: true
  validates :email, presence: true
  validates_uniqueness_of :email
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
