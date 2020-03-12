require 'dotenv/load'
require "sinatra/base"
require "json"
require 'sidekiq'
require 'sidekiq/api'
require 'sidekiq/web'
require 'erubi'
require "sinatra/activerecord"
require "active_support/core_ext/time"
require "geocoder"
require "pry"

require "./controllers/complaints_controller"
require "./jobs/mail_job"
require "./models/complaint"

module Sinatra
  class Base
    configure do
      enable :sessions
      set :session_secret, ENV["SESSION_SECRET"]
      set :root, Dir.pwd.split("comeback_corner").first + "comeback_corner"
      set :erb, :escape_html => true
    end

    helpers do
      def set_time_zone
        session[:time_zone] ||= (
          request.try(:location).try(:data).try(:fetch, "timezone", nil) ||
          "America/Phoenix"
        )
      end
    end
  end
end

class App < Sinatra::Base
  use Rack::Protection::AuthenticityToken
  use ComplaintsController

  get "/" do
    erb :'complaints/new'
  end
end
