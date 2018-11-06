class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  accepts_nested_attributes_for :members
  has_many :messages
end
