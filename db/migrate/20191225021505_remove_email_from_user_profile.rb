class RemoveEmailFromUserProfile < ActiveRecord::Migration[6.0]
  def change

    remove_column :user_profiles, :email, :string
  end
end
