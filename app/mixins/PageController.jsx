
/*

  This controller takes a path {string}, uses your router to find
  a page, then fetches it's data and updates your state

  Expects props to be an object containing "host" and "path" keys

  Pages are objects with two properties:
    - data {string | object}
      - string to pass a relative url to fetch data from
      - object to pass data directly
    - title { string | function }
       - string will be rendered to <title> tag
       - function will be called with data, then rendred to <title>

*/

var http = require('superagent');

module.exports = {

  page: null,
  state: null,

  setState: function(page, state, cb) {
    this.state = state || {};
    this.page = page || null;
    var hasDataUrl = page.data && typeof page.data == 'string';
    hasDataUrl ? this.setStateAsync(cb) : this.setStateSync(cb);
  },

  setStateSync: function(cb) {
    this.setTitle(this.page.data);
    cb(null, this.state);
  },

  setStateAsync: function(cb) {
    http
      .get(this.getRootUrl() + this.page.data)
      .end(function(err, res) {
        this.state.data = res ? res.body : {};
        this.setTitle(this.state.data);
        cb(err, this.state);
      }.bind(this));
  },

  setTitle: function(data) {
    var isTitleFunc = typeof this.page.title == 'function';
    this.state.title = isTitleFunc ? this.page.title(data) : this.page.title;
  },

  getRootUrl: function() {
    var port = this.state.port ? ':' + this.state.port : '';
    return 'http://' + (this.state.host || window.location.host) + port;
  },

}