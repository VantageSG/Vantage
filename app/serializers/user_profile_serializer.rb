class UserProfileSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :cv
end
