class AboutSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :contact_number, :about_me
end
