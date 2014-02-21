var HomePage      = require('./views/pages/HomePage');
var UserPage      = require('./views/pages/UserPage');
var NotFoundPage  = require('./views/pages/NotFoundPage');

module.exports = {

  locations: [

    {
      path: '/',
      res: HomePage
    },

    {
      path: '/user/:username',
      res: UserPage
    }

  ],

  notFound: NotFoundPage

};