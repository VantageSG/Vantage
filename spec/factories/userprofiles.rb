FactoryBot.define do
  factory :userprofile, class: 'UserProfile' do
    first_name { Faker::Name.name }
    last_name { Faker::Name.name }
    cv { Faker::Name.name }
    user_id { nil }
  end
end
