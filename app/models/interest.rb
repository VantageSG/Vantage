class Interest < ApplicationRecord
  belongs_to :resume
  validates :name, presence: true
  def as_json options={}
    {
      name: name
    }
  end
end
