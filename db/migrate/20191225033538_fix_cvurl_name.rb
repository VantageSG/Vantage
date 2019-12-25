class FixCvurlName < ActiveRecord::Migration[6.0]
  def change
    rename_column :user_profiles, :cvurl, :cv
  end
end
