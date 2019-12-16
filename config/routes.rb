Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      get '/users' => 'users#index'
      post '/users' => 'users#create'
      get '/users/:id' => 'users#show'

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      get '/logged_in' => 'sessions#is_logged_in?'
    end
  end
  get "*path", to: "pages#index"
end
