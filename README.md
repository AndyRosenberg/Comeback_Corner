# Comeback Corner


Here's the most legendary Sinatra application you've ever seen, jampacked with MVC structure, workers, a Bulma/Vue-based frontend. I've decided to open-source this in case other Ruby devs who want to break free from Rails can do so in a somewhat scalable manner.

### How to run:
Currently this application is not hot-reloaded in development. Therefore, run `npm run build` for frontend changes, then run `bundle exec rackup` to start the application. `./local.sh` will run the application daemonized with the worker running simultaneously. If you use this script, make sure to grep for rackup and kill the process once you've killed the server.

Feel free to fork and save Ruby in your own way.
