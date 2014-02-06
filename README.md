# Reactor

Reactor is an experimental app using React and some awesome new node libraries to enable it to render any page completely on the server side, and then hand itself over in entirety to the client, to have the client continue running it from there.

## Learn more

- Get familiar with [React](http://facebook.github.io/react/), ([NodeConf EU](https://www.youtube.com/watch?v=x7cQ3mrcKaY)).
- Some reading on isomorphic apps: [blog post](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), [tutorial app](https://github.com/spikebrehm/isomorphic-tutorial), [scaling by nodejitsu](https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)
- [Browserify](http://browserify.org/) to allow us to use require() on the server and client.
- [Gulp](https://github.com/gulpjs/gulp) to watch and build assets.
- [react-app-middleware](https://github.com/andreypopp/react-app-middleware) and [react-app-controller](https://github.com/andreypopp/react-app-controller) to help stitch the client/server rendering together.

# Installation

    npm install

And start it:

    npm start

And go to [localhost:3111](localhost:3111).