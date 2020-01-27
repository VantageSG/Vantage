FactoryBot.define do
  factory :education, class: 'Education' do
    program { Faker::Name.name }
    institution { Faker::Name.name }
    start { Faker::Number.number(digits: 5) }
    grade { Faker::Name.name }
    resume_id { nil }
  end
end
