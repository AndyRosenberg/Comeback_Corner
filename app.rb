require 'dotenv/load'
require "sinatra/base"
require "json"
require 'sidekiq'
require 'sidekiq/api'
require 'sidekiq/web'
require 'erubi'
require "sinatra/activerecord"

require "./controllers/complaints_controller"
require "./jobs/mail_job"
require "./models/complaint"

module Sinatra
  class Base
    configure do
      enable :sessions
      set :session_secret, 'lopsided'
      set :root, Dir.pwd.split("comeback_corner").first + "comeback_corner"
      set :erb, :escape_html => true
    end
  end
end

class App < Sinatra::Base
  use ComplaintsController

  get "/" do
    erb :home
  end

  get '/send_mail' do
		"
		<p>Added Job: #{MailWorker.perform_async}</p>
		<p><a href='/'>Back</a></p>
		"
	end
end
