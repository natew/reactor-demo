module.exports = {

  '/': require('./pages/home'),

  '/tutorials/:name/:id': require('./pages/tutorial'),

  500: require('./pages/error')

}