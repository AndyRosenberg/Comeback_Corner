class ComplaintsController < Sinatra::Base    
  get "/complaints/new" do
    session[:hi] = "there"
    erb 'complaints/new'.to_sym
  end

  post "/complaints" do
    complaint = Complaint.new(
      title: params[:title],
      target: params[:target],
      body: params[:body]
    )

    if complaint.save
      session[:message] = "Good job"
      erb :home
    else
      session[:message] = "Something went wrong"
      redirect back
    end
  end

  get "/complaints" do
    content_type :json
    body Complaint.order(created_at: :desc).to_json
  end
end
