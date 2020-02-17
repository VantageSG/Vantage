Rails.application.config.middleware.insert_before 0, Rack::Cors do 
  allow do
    origins 'http://localhost:3000, http://vantage-sg.com'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end