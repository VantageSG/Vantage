class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :password_digest
end
