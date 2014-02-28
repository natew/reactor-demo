var pattern = require('url-pattern');

var Router = {

  componentWillMount: function() {
    this.shouldUpdate = true;
  },

  componentWillReceiveProps: function(props) {
    if (!this.props.path || props.path === this.props.path) return;
    this.shouldUpdate = false;

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
    this._routes = Object.keys(routes).map(function(path) {
      return { path: path, to: routes[path] };
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
        return { page: route.to, params: match };
      }
    }

    // return notfound page
    return { page: this.routes.notFound };
  },

  renderPage: function(opts) {
    return Router.getRoute(opts.path).page(opts);
  },

  getPage: function(path) {
    return Router.getRoute(path).page;
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

module.exports = Router;