Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show] do
        resource :userprofiles, only: [:create, :show, :update]
      end

      # resumes API
      get '/vrs/:user_id' => 'resumes/resumes#show'
      post '/vrs/:user_id' => 'resumes/resumes#create'
      get '/vrs/:user_id/about' => 'resumes/abouts#show'
      post '/vrs/:user_id/about' => 'resumes/abouts#create'
      get '/vrs/:user_id/educations' => 'resumes/educations#show'
      post '/vrs/:user_id/educations' => 'resumes/educations#create'
      get '/vrs/:user_id/workExperiences' => 'resumes/workexperiences#show'
      post '/vrs/:user_id/workExperiences' => 'resumes/workexperiences#create'
      get '/vrs/:user_id/skills' => 'resumes/skills#show'
      post '/vrs/:user_id/skills' => 'resumes/skills#create'
      get '/vrs/:user_id/interests' => 'resumes/interests#show'
      post '/vrs/:user_id/interests' => 'resumes/interests#create'

      post '/login' => 'sessions#create'
      delete '/logout' => 'sessions#destroy'
      get '/logged_in' => 'sessions#is_logged_in?'
    end
  end
  get "*path", to: "pages#index"
end
