var pattern = require('url-pattern');

module.exports = {
  _navigate: function(path, cb) {
    window.history.pushState({}, '', path);
    this.setState({ path: window.location.pathname }, cb);
  },

  onClickLink: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this._navigate(e.target.attributes.href.value);
  },

  componentDidMount: function() {
    window.addEventListener('popstate', this.onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this.onPopState);
  },

  onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
    }
  },

  getPath: function() {
    return this.props.path || window.location.pathname;
  },

  activePage: function() {
    var page = this.matchedPage();
    return page ? page.handler() : [];
  },

  matchedPage: function() {
    var path = this.getPath();
    var match, page, notFound;

    this.locations.forEach(function(loc) {
      if (loc.path) {
        loc.pattern = loc.pattern || pattern(loc.path);
        if (!page) {
          match = loc.pattern.match(path);
          if (match) page = loc;
        }
      }

      if (!notFound && loc.path === null)
        notFound = loc;
    }.bind(this));

    return page || notFound;
  }
};