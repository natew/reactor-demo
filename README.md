# Reactor

Experiment making an isomorphic app using React.

Uses [reactor-core](https://github.com/natew/reactor-core) to help simplify putting together the core pieces (async components, pages, routing, pushState).

## Installation

    npm run first-run

And start it:

    npm start

And head to [localhost:3111](localhost:3111).

If you get an error regarding EMFILE, this is because browserify is trying to watch too many files for your OS. This is a temporary fix:

    ulimit -n 10000; npm start

## What it does

- Renders app from server, continues app on client
- Routing, Async Page components, pushState
- Super simple API demo
- Cortex to handle data
- Gulp to manage assets

## Todo

- Expore moving to immutable-object
- State handler to post back to API
- Better example components
- 500 pages
- Link component
- Testing
- Forms
- ...

## More Reading

- [React](http://facebook.github.io/react/) - ([NodeConf EU React Intro](https://www.youtube.com/watch?v=x7cQ3mrcKaY), [React + Meteor talk](https://www.youtube.com/watch?v=Lqcs6hPOcFw#t=3001))
- Isomorphic Apps: [blog post](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), [tutorial app](https://github.com/spikebrehm/isomorphic-tutorial), [scaling by nodejitsu](https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/)
- [Gulp](https://github.com/gulpjs/gulp) to watch and build assets

### Interesting React Projects

- [Dealing with async code in react](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
- [Computation](https://github.com/wereHamster/computation) async data fetching integration with React - [authors writeup](https://caurea.org/2014/02/04/dealing-with-asynchronous-code-in-react-components.html)
- [Avers.js](https://github.com/wereHamster/avers) attempts to be a better M for React
- [Cortex](https://github.com/mquan/cortex) Another react data solution