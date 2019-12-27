class AddForeignKeyToUserProfiles < ActiveRecord::Migration[6.0]
  def change
    add_reference :user_profiles, :user, foreign_key: true
  end
end
