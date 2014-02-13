var pattern = require('url-pattern');

module.exports = {

  componentDidMount: function() {
    window.addEventListener('popstate', this._onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this._onPopState);
  },

  _rootUrl: function() {
    var port = this.props.port ? ':' + this.props.port : '';
    return 'http://' + (this.props.host || window.location.host) + port;
  },

  _path: function() {
    return this.props.path || window.location.pathname;
  },

  _navigate: function(path) {
    window.history.pushState({}, '', path);
    this.getDataForRoute(path, function(err, data) {
      this.setState({ path: path });
    }.bind(this));
  },

  _onClick: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this._navigate(e.target.attributes.href.value);
  },

  _onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
    }
  }

};