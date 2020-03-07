class ComplaintsController < Sinatra::Base    
  get "/feed" do
    erb :'complaints/index'
  end
  
  get "/complaints/new" do
    erb :'complaints/new'
  end

  post "/complaints" do
    complaint = Complaint.new(
      title: params[:title],
      target: params[:target],
      body: params[:body]
    )

    if complaint.save
      session[:message] = "Good job"
      erb :'complaints/index'
    else
      session[:message] = "Something went wrong"
      redirect back
    end
  end

  get "/complaints" do
    set_time_zone
    content_type :json
    params[:days_ago] = nil if params[:days_ago]&.empty?
    body Complaint.in_json(params[:days_ago], set_time_zone)
  end
end
