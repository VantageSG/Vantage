class ChangeDefaultValueUser < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :guest, false
  end
end
