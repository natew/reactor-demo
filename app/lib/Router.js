var pattern = require('url-pattern');

module.exports = {

  setRoutes: function(routes) {
    this.routes = routes;
  },

  // todo: add invariant warning with no routes
  getRoute: function(path) {
    var path = path || window.location.pathname;
    var i, len = this.routes.locations.length;

    for (i = 0; i < len; i++) {
      var route = this.routes.locations[i];
      route.pattern = route.pattern || pattern(route.path);
      match = route.pattern.match(path);
      if (match) {
        return { to: route.to, params: match };
      }
    }

    // return notfound page
    return { to: this.routes.notFound };
  },

  getPage: function(path) {
    return this.getRoute(path, false).page;
  },

  getParams: function(path) {
    return this.getRoute(path, true).params;
  },

  renderPage: function(path, props) {
    var route = this.currentRoute = this.getRoute(path);
    this.currentPage = route.page.view({
      params: route.params,
      data: props.data
    });
    return this.currentPage;
  },

  getCurrentPage: function() {
    return this.currentPage;
  },

  replaceParams: function(path, params) {
    if (path.indexOf(':') !== -1)
      for (var key in params)
        path = path.replace(':' + key, params[key]);

    return path;
  }

};