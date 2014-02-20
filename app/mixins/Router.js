var pattern = require('url-pattern');

module.exports = {

  setRoutes: function(routes) {
    this.routes = routes;
  },

  // todo: add invariant warning with no routes
  getRoute: function(path) {
    var i, len = this.routes.locations.length;

    for (i = 0; i < len; i++) {
      var route = this.routes.locations[i];
      route.pattern = route.pattern || pattern(route.path);
      match = route.pattern.match(path);
      if (match) {
        return { page: route.page, matches: match };
      }
    }

    // return notfound page
    return { page: this.routes.notFound };
  },

  getPage: function(path) {
    return this.getRoute(path, false).page;
  },

  getMatch: function(path) {
    return this.getRoute(path, true).matches;
  },

  renderPage: function(props) {
    var route = this.getRoute(props.path);
    return route.page.view({
      params: route.matches,
      data: props.data
    });
  },

};