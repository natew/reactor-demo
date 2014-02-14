var pattern = require('url-pattern');

module.exports = {

  routerGetPage: function(path) {
    var i, len = this.routes.length;

    for (i = 0; i < len; i++) {
      var route = this.routes[i];
      route.pattern = route.pattern || pattern(route.path);
      if (route.pattern.match(path) !== null)
        return route.page;
    }

    // return notfound pge
    return this.notFound;
  }

};