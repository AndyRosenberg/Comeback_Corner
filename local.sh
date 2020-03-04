npm run build
bundle exec rackup -D
bundle exec sidekiq -r ./app.rb