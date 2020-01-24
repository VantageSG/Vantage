class CreateEducations < ActiveRecord::Migration[6.0]
  def change
    create_table :educations do |t|
      t.string :program
      t.string :institution
      t.integer :start
      t.integer :end
      t.string :grade
      t.references :resume, null: false, foreign_key: true

      t.timestamps
    end
  end
end
