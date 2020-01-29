FactoryBot.define do
  factory :interest, class: 'Interest' do
    name { Faker::Name.name }
    resume_id { nil }
  end
end
