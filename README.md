Reactor is an experimental isomorphic app using React. The goal is to have it be a nice skeleton for people starting out creating full-featured React apps.

## Installation

    npm run first-run

And start it:

    npm start & gulp

And go to [localhost:3111](localhost:3111).

## What this solves

- Full page rendered from server or client
- React can properly render <title> (and eventually <meta> tags) using page data
- Server passes url/port to client js
- HTML5 pushState to seamlessly navigate between pages

## Learn more

- Get familiar with [React](http://facebook.github.io/react/) (([NodeConf EU React Intro](https://www.youtube.com/watch?v=x7cQ3mrcKaY), [React + Meteor talk](https://www.youtube.com/watch?v=Lqcs6hPOcFw#t=3001)))
- Some reading on isomorphic apps: [blog post](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), [tutorial app](https://github.com/spikebrehm/isomorphic-tutorial), [scaling by nodejitsu](https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)
- [Browserify](http://browserify.org/) to allow us to use require() on the server and client.
- [Gulp](https://github.com/gulpjs/gulp) to watch and build assets.

## Todo

- Add model (meteor?)
- Explore including a standards widgets library as a good example
  - [react-treeview](https://github.com/chenglou/react-treeview)
  - [react-bootstrap](https://github.com/stevoland/react-bootstrap) boostrap widgets ported
  - [react-topcoat](https://github.com/plaxdan/react-topcoat) topcoat widgets ported
- ...

## Interesting React Repos

- [Dealing with async code in react](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
- [Computation](https://github.com/wereHamster/computation) async data fetching integration with React - [authors writeup](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
- [Avers.js](https://github.com/wereHamster/avers) attempts to be a better M for React
- [Cortex](https://github.com/mquan/cortex) Another js model solution

## Credits

- [Pete Hunt](https://github.com/petehunt) core React dev who has a number of great talks about using React.
- [Andrey Popp](https://github.com/andreypopp) and his great work on [react-async](https://github.com/andreypopp/react-async) and [react-async-middleware](https://github.com/andreypopp/react-async-middleware), as shown in the [react-quickstart repo](https://github.com/andreypopp/react-quickstart).