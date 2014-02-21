var pattern = require('url-pattern');

module.exports = {

  componentDidMount: function() {
    window.addEventListener('popstate', this._onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this._onPopState);
  },

  navigate: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();

    var path = e.target.attributes.href.value;
    window.history.pushState({}, '', path);
    this._navigateCallback(path);
  },

  rootUrl: function() {
    try {      var protocol = (this.props.protocol || window.location.protocol) + '//' }
    catch(e) { var protocol = 'http://' };
    var port = this.props.port ? ':' + this.props.port : '';
    var host = this.props.host || window.location.host;
    var url = protocol + host + port;
    return url;
  },

  _onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
      this._navigateCallback(path);
    }
  },

  _navigateCallback: function(path) {
    // Re-mount the navigator component
    this.componentDidMount();

    // Allow hooks after navigate
    if (typeof this.onNavigate === 'function')
      this.onNavigate(path);
  }

};