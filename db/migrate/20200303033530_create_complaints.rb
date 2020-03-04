class CreateComplaints < ActiveRecord::Migration[6.0]
  def change
    create_table :complaints do |t|
      t.string :title
      t.string :target
      t.string :body, null: false
      t.timestamps
    end
  end
end
