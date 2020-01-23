class Interest < ApplicationRecord
  belongs_to :resume
  validates :name, presence: true
end
