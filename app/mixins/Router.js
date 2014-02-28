var pattern = require('url-pattern');

module.exports = {

  componentWillMount: function() {
    this.shouldUpdate = true;
    this.setRoutes(this.routes);
    this.setCurrentPage(this.props.path);
  },

  componentWillReceiveProps: function(props) {
    if (props.path === this.props.path) return;
    this.shouldUpdate = false;
    this.setCurrentPage(props.path);

    // Allow a callback to do things before changing pages
    if (typeof this.routerPageChange == 'function')
      this.routerPageChange();
    else
      this.shouldUpdate = true;
  },

  shouldComponentUpdate: function() {
    return this.shouldUpdate;
  },

  setRoutes: function(routes) {
    this._routes = Object.keys(this.routes).map(function(path) {
      return { path: path, to: this.routes[path] };
    }.bind(this));
  },

  // todo: add invariant warning with no routes
  getRoute: function(path) {
    var path = path || window.location.pathname;
    var i, len = this._routes.length;

    for (i = 0; i < len; i++) {
      var route = this._routes[i];
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