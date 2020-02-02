class User < ApplicationRecord
  has_one :user_profile, dependent: :destroy
  has_many :resume, dependent: :destroy

  has_secure_password
  validates_presence_of :username, :email, :password_digest, unless: :guest?
  validates_uniqueness_of :username, :email, case_sensitive: true, unless: :guest?
  validates :username, length: { minimum: 4 }, unless: :guest?
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, unless: :guest?
  
  after_create :create_resume
  def create_resume()
    Resume.new({:user_id => self.id}).save
  end

  def move_to(user)
    user.resume.each do |curr_resume|
      curr_resume.destroy
    end
    user.user_profile.destroy if user.user_profile
    Resume.where(user_id: self.id).update_all(user_id: user.id)
    UserProfile.where(user_id: self.id).update_all(user_id: user.id)
  end
end
