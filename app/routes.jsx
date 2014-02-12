var HomePage = require('./views/pages/HomePage');
var OtherPage = require('./views/pages/OtherPage');

module.exports = {

  locations: [
    {
      path: '/',
      handler: HomePage
    },

    {
      path: '/other',
      handler: OtherPage
    }
  ]

}