FactoryBot.define do
  factory :about, class: 'About' do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    contact_number { Faker::Number.number(digits: 5) }
    about_me { Faker::Name.name }
    resume_id { nil }
  end
end
