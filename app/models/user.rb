class User < ApplicationRecord
  has_many :message
  has_many :group_user
  has_many :group, through: :group_user
end
