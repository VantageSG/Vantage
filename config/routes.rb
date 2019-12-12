Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      get 'users/index'
      post 'users/create'
      get 'users/show'
      delete 'users/destroy'

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      get '/logged_in' => 'sessions#is_logged_in?'
    end
  end
  get "*path", to: "pages#index"
end
