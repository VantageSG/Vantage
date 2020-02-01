class EducationSerializer < ActiveModel::Serializer
  attributes :program, :institution, :start, :end, :grade
end
