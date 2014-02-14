var HomePage      = require('../views/pages/HomePage');
var UserPage      = require('../views/pages/UserPage');
var NotFoundPage  = require('../views/pages/NotFoundPage');

module.exports = {

  routes: [

    {
      path: '/',
      page: HomePage
    },

    {
      path: '/user/:username',
      page: UserPage
    }

  ],

  notFound: NotFoundPage

};