var http = require('superagent');

module.exports = {

  // Expects a page to be an object with two properties
  //   data: {string | object}
  //      - string to pass a relative url to fetch data from
  //      - object to pass data directly
  //
  //   title: { string | function }
  //      - string will be rendered to <title> tag
  //      - function will be called with data, then rendred to <title>

  pageControllerGetData: function(path, cb) {
    var page = this.routerGetPage(path);
    var state = { path: path };
    var hasDataUrl = page.data && typeof page.data === 'string';

    function setTitle(data) {
      var isTitleFunc = typeof page.title === 'function';
      return isTitleFunc ? page.title(data) : page.title;
    }

    if (!hasDataUrl) {
      state.title = setTitle(page.data);
      cb(null, state);
    }
    else {
      http
        .get(this._getRootUrl() + page.data)
        .end(function(err, res) {
          state.data = res ? res.body : {};
          state.title = setTitle(state.data);
          cb(err, state);
        }.bind(this));
    }
  },

  _getRootUrl: function() {
    var port = this.props.port ? ':' + this.props.port : '';
    return 'http://' + (this.props.host || window.location.host) + port;
  },

}