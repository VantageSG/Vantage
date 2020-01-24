class CreateReferees < ActiveRecord::Migration[6.0]
  def change
    create_table :referees do |t|
      t.string :name
      t.string :email
      t.references :work_experience, null: false, foreign_key: true

      t.timestamps
    end
  end
end
