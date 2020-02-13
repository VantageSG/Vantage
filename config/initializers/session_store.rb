if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_Vantage'
else
  Rails.application.config.session_store :cookie_store, key: '_Vantage' 
end