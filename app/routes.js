var HomePage      = require('./views/pages/HomePage');
var UserPage      = require('./views/pages/UserPage');
var NotFoundPage  = require('./views/pages/NotFoundPage');

module.exports = {

  '/': HomePage,

  '/user/:username': UserPage,

  notFound: NotFoundPage

}