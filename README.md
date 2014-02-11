Reactor is an experimental app using React and some awesome new node libraries to enable it to render any page completely on the server side, and then hand itself over in entirety to the client, to have the client continue running it from there.

The goal is to have it be a nice skeleton for people starting out creating full-featured React apps.

Most credit goes to [andreypopp](https://github.com/andreypopp) and his great work on [react-async](https://github.com/andreypopp/react-async) and [react-async-middleware](https://github.com/andreypopp/react-async-middleware), as shown in the [react-quickstart repo](https://github.com/andreypopp/react-quickstart).

## Learn more

- Get familiar with [React](http://facebook.github.io/react/), ([NodeConf EU](https://www.youtube.com/watch?v=x7cQ3mrcKaY)).
- Some reading on isomorphic apps: [blog post](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), [tutorial app](https://github.com/spikebrehm/isomorphic-tutorial), [scaling by nodejitsu](https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)
- [Browserify](http://browserify.org/) to allow us to use require() on the server and client.
- [Gulp](https://github.com/gulpjs/gulp) to watch and build assets.

# Installation

    npm run first-run

And start it:

    npm start

And go to [localhost:3111](localhost:3111).

# TODO

- Slim down client js bundle big time
- gulp-browserify: how to expose require globally in bundle
- Remove jQuery, insert small ajax lib
- Build out the "M" in MVC
  - [Dealing with async code in react](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
  - [Computation](https://github.com/wereHamster/computation) async data fetching integration with React - [authors writeup](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
  - [Avers.js](https://github.com/wereHamster/avers) attempts to be a better M for React
  - [Cortex](https://github.com/mquan/cortex) Another js model solution
- Explore better [communication between components](http://facebook.github.io/react/docs/multiple-components.html#dynamic-children)
  - [Telegraph](https://gist.github.com/julik/8492257) allows sending Backbone events up a tree of components
- Explore including a standards widgets library as a good example
  - [react-treeview](https://github.com/chenglou/react-treeview)
  - [react-bootstrap](https://github.com/stevoland/react-bootstrap) boostrap widgets ported
  - [react-topcoat](https://github.com/plaxdan/react-topcoat) topcoat widgets ported
- ...