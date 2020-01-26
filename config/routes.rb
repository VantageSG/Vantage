Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show] do
        resource :userprofiles, only: [:create, :show, :update]
      end

      # resumes API
      get '/vrs/:user_id' => 'resumes#show'
      post '/vrs/:user_id' => 'resumes#create'

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      get '/logged_in' => 'sessions#is_logged_in?'
    end
  end
  get "*path", to: "pages#index"
end
