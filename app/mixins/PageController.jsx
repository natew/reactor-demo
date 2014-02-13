var http = require('superagent');

module.exports = {

  getPageData: function(page, defaultProps, cb) {
    console.log('props', defaultProps);
    var props = defaultProps || {};
    var hasDataUrl = page.data && typeof page.data === 'string';

    function setTitle(data) {
      var isTitleFunc = typeof page.title === 'function';
      return isTitleFunc ? page.title(data) : page.title;
    }

    console.log(hasDataUrl)
    if (!hasDataUrl) {
      props.title = setTitle(page.data);
      cb(null, props);
    }
    else {
      http
        .get(this._getRootUrl() + page.data)
        .end(function(err, res) {
          props.data = res ? res.body : {};
          props.title = setTitle(props.data);
          console.log(props);
          cb(err, props);
        }.bind(this));
    }
  },

  _getRootUrl: function() {
    var port = this.props.port ? ':' + this.props.port : '';
    return 'http://' + (this.props.host || window.location.host) + port;
  },

}