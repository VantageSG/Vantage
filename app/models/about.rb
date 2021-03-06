class About < ApplicationRecord
  belongs_to :resume
  
  validates :name, presence: true
  validates :email, presence: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :contact_number, presence: true
  validates :about_me, presence: true
  validates :contact_number, numericality: { only_integer: true }
  def as_json options={}
    {
      name: name,
      email: email,
      contact_number: contact_number,
      about_me: about_me
    }
  end
end
