class Education < ApplicationRecord
  belongs_to :resume
  validates :program, presence: true
  validates :institution, presence: true
  validates :start, presence: true
  validates :start, numericality: { only_integer: true }
  validates :end, presence: true
  validates :end, numericality: { only_integer: true }

  def as_json options={}
    {
      program: program,
      institution: institution,
      start: start,
      end: self.end
    }
  end
end
