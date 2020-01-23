class CreateAbouts < ActiveRecord::Migration[6.0]
  def change
    create_table :abouts do |t|
      t.string :name
      t.string :email
      t.integer :contact_number
      t.string :about_me
      t.references :resume, null: false, foreign_key: true

      t.timestamps
    end
  end
end
