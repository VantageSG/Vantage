class EducationSerializer < ActiveModel::Serializer
  attributes :id, :program, :institution, :start, :end, :grade
end
