var HomePage      = require('./views/pages/HomePage');
var UserPage      = require('./views/pages/UserPage');
var NotFoundPage  = require('./views/pages/NotFoundPage');

module.exports = {

  locations: [

    {
      path: '/',
      to: HomePage
    },

    {
      path: '/user/:username',
      to: UserPage
    }

  ],

  notFound: NotFoundPage

};