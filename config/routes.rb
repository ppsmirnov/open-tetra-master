Rails.application.routes.draw do
  get 'playground', to: 'playground#index'
  get 'test_ex', to: 'test_ex#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
