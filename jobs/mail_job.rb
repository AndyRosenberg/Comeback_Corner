require_relative 'config/mail_config'
require_relative 'config/sidekiq_config'

class MailWorker
	include Sidekiq::Worker
	def perform
		Mail.deliver do
      to      'andynaterosenberg@gmail.com'
      from    'The Admin <admin@po-it.com>'
      subject 'First multipart email sent with Mail'
    
      text_part do
        body 'This is plain text'
      end
    
      html_part do
        content_type 'text/html; charset=UTF-8'
        body '<h1>This is HTML</h1>'
      end
    end
	end
end