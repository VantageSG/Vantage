class WorkExperienceSerializer < ActiveModel::Serializer
  attributes :title, :company, :start, :end, :achievements
end
