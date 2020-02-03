class WorkExperienceSerializer < ActiveModel::Serializer
  attributes :id, :title, :company, :start, :end, :achievements
end
