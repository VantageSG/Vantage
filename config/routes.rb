Rails.application.routes.draw do
  root 'pages#index'
  namespace :api do
    namespace :v1 do
      
      #Users API
      get '/users' => 'users#index'
      get '/users/:user_id' => 'users#show'
      post '/users' => 'users#create'
      post '/users/guest_user' => 'users#create_guest_user'
      post '/users/:user_id/migrate/:guest_user_id' => 'users#migrate_guest_user'

      
      #Userprofile API
      get '/users/:user_id/userprofiles' => 'userprofiles#show'
      post '/users/:user_id/userprofiles' => 'userprofiles#create'
      patch '/users/:user_id/userprofiles' => 'userprofiles#update'

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
      post '/login/:guest_user_id' => 'sessions#create_guest_session'
      delete '/logout' => 'sessions#destroy'
      get '/logged_in' => 'sessions#is_logged_in?'
    end
  end
  get "*path", to: "pages#index"
end
