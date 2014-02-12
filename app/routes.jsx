var HomePage = require('./views/pages/HomePage');
var OtherPage = require('./views/pages/OtherPage');

module.exports = {

  locations: {
    '/':      HomePage,
    '/other': OtherPage
  },

};