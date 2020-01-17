class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.integer :group_id, null: false, foreign_key: true
      t.integer :users_id, null: false, foreign_key: true
      t.timestamps
    end
  end
end
