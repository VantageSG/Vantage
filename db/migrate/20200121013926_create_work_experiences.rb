class CreateWorkExperiences < ActiveRecord::Migration[6.0]
  def change
    create_table :work_experiences do |t|
      t.string :title
      t.string :company
      t.integer :start
      t.integer :end
      t.string :achievements
      t.references :resume, null: false, foreign_key: true

      t.timestamps
    end
  end
end
