class WorkExperience < ApplicationRecord
  belongs_to :resume
  has_many :referee, :dependent => :delete_all

  validates :title, presence: true
  validates :company, presence: true
  validates :start, presence: true
  validates :start, numericality: { only_integer: true }
  validates :end, presence: true
  validates :end, numericality: { only_integer: true }
  validates :achievements, presence: true

  def as_json options={}
    byebug
    {
      referee: referee,
      title: title,
      company: company,
      start: start,
      end: self.end,
      achievements: achievements
    }
  end

end
