var routes  = require('../routes');
var pattern = require('url-pattern');

module.exports = {

  getRoute: function(path) {
    var i, len = routes.locations.length;

    for (i = 0; i < len; i++) {
      var route = routes.locations[i];
      route.pattern = route.pattern || pattern(route.path);
      match = route.pattern.match(path);
      if (match) {
        return { page: route.page, match: match };
      }
    }

    // return notfound pge
    return routes.notFound;
  },

  renderPage: function(state) {
    var route = this.getRoute(state.path);
    return route.page.component({ data: state.data, params: route.match });
  }

};