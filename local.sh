npm run build
bundle exec rackup -r agoo -s agoo -D
bundle exec sidekiq -r ./app.rb