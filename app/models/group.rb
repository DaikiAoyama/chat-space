class Group < ApplicationRecord
  has_many :message
  has_many :group_user
  has_many :user, through: :group_user
end
