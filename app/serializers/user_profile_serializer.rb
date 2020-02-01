class UserProfileSerializer < ActiveModel::Serializer
  attributes :user_id, :first_name, :last_name, :cv
end
