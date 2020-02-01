class UserProfileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :first_name, :last_name, :cv
end
