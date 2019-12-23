Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show] do
        resource :userprofiles, only: [:create, :show, :update]
      end

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      get '/logged_in' => 'sessions#is_logged_in?'
    end
  end
  get "*path", to: "pages#index"
end
