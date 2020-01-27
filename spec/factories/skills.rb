FactoryBot.define do
  factory :skill, class: 'Skill' do
    name { Faker::Name.name }
    description { Faker::Name.name }
    link { Faker::Name.name }
    resume_id { nil }
  end
end
