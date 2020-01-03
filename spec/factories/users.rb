FactoryBot.define do
  factory :typical_user, class: 'User' do
    username { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end

  factory :typical_user_jason, class: 'User' do
    username { 'JasonYip' }
    email { 'JasonYip@gmail.com' }
    password { 'password' }
  end
end
