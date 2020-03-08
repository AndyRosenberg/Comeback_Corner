require_relative 'config/mail_config'
require_relative 'config/sidekiq_config'

class MailWorker
  include Sidekiq::Worker

  def perform(options)
    return unless options["complaint"] && options["emails"]

    message = <<~MSG
      <h3>You've been bcc'd on this complaint:</h3>
      <pre>#{options["complaint"]["body"]}</pre>
    MSG

    (options["emails"] || []).each do |email|
      Mail.deliver do
        to      email
        from    'Comeback Corner <admin@po-it.com>'
        subject 'Someone just sent you a complaint on Comeback Corner'

        html_part do
          content_type 'text/html; charset=UTF-8'
          body message
        end
      end
    end
	end
end