class UserProfileSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :cv
end
