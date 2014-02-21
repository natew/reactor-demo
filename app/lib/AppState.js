module.exports = (function() {
  var state = {};

  return {
    set: function(key, val) {
      state[key] = val;
    },

    get: function(key) {
      return state[key];
    }
  };

})();