FactoryBot.define do
  factory :workexperience, class: 'WorkExperience' do
    title { Faker::Name.name }
    company { Faker::Name.name }
    start { Faker::Number.number(digits: 5) }
    achievements { Faker::Name.name }
    resume_id { nil }
  end
end
