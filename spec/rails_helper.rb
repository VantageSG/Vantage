# frozen_string_literal: true.

require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'

require File.expand_path('../config/environment', __dir__)

abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
require 'database_cleaner'  
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.include FactoryBot::Syntax::Methods
  config.infer_spec_type_from_file_location!
  config.include ApiSpecHelper, type: :request
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
    DatabaseCleaner.strategy = :transaction
  end
  config.infer_spec_type_from_file_location!
  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
  config.filter_rails_from_backtrace!
end
