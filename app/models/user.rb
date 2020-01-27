class User < ApplicationRecord
  has_one :user_profile
  has_many :resume

  has_secure_password
  validates :username, presence: true
  validates_uniqueness_of :username, case_sensitive: true
  validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates_uniqueness_of :email, case_sensitive: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  after_create :create_resume
  def create_resume()
    Resume.new({:user_id => self.id}).save
  end
end
