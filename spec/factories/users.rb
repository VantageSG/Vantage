# spec/factories/todos.rb
FactoryBot.define do
  factory :user do
    username { Faker::Name.name  }
    email { Faker::Internet.email }
    password_digest { Faker::Internet.password}
  end
end
