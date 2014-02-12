module.exports = {

  activeTitle: 'NULLLL',



  _observers: [],

  setAppState: function(attr, val) {
    this[attr] = val;
    console.log(attr, val, this._observers);
    this._observers.forEach(function(o) {
      o.call(o, {
        name: attr,
        object: this
      });
    }.bind(this));
  },

  appStateObserve: function(cb) {
    this._observers.push(cb);
  }

};