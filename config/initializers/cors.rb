Rails.application.config.middleware.insert_before 0, Rack::Cors do 
  allow do
    origins 'http://localhost:3000, http://vantage-sg.com, http://http://35.240.161.15'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end