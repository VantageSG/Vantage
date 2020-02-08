class Skill < ApplicationRecord
  belongs_to :resume
  validates :name, presence: true
  validates :description, presence: true
  def as_json options={}
    {
      name: name,
      description: description
    }
  end
end
