module.exports = {

  '/': require('./pages/home'),

  '/tutorials/:name/:id': require('./pages/tutorial'),

  '404': require('./pages/404')

}