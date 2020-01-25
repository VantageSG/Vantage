class AddUserToResume < ActiveRecord::Migration[6.0]
  def change
    add_reference :resumes, :user, null: false, foreign_key: true
  end
end
