var pattern = require('url-pattern');

module.exports = {

  componentDidMount: function() {
    window.addEventListener('popstate', this._onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this._onPopState);
  },

  navigatorOnClick: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this._navigate(e.target.attributes.href.value);
  },

  _navigate: function(path) {
    window.history.pushState({}, '', path);
    typeof this.onNavigate === 'function' ?
      this.onNavigate(path) : null;
  },

  _onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
    }
  }

};