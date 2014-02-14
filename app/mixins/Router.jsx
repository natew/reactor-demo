var routes  = require('../routes');
var pattern = require('url-pattern');

module.exports = {

  getPage: function(path) {
    var i, len = routes.locations.length;

    for (i = 0; i < len; i++) {
      var route = routes.locations[i];
      route.pattern = route.pattern || pattern(route.path);
      if (route.pattern.match(path) !== null)
        return route.page;
    }

    // return notfound pge
    return routes.notFound;
  }

};