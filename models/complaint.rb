class Complaint < ActiveRecord::Base
  def self.in_json(day, time_zone)
    complaints = day ? where("created_at >= ?", day.to_i.days.ago) : all
    complaints.order(created_at: :desc).map do |complaint|
      complaint = complaint.as_json
      complaint["created_at"] = complaint["created_at"].in_time_zone(time_zone).strftime("%e %b %Y %I:%M%p")
      complaint
    end.to_json
  end
end