var Cortex = require('./cortex/cortex');

module.exports = {

  stores: [],

  createStore: function(name, data, callback) {
    this.stores.push(new Store(name, data, callback));
  },

  getStore: function(name) {
    this.stores.forEach(function(store) {
      if (store.name === name) return store;
    });
    return null;
  }

}

function Store(name, data, cb) {
  this.name = name;
  this.callback = cb;
  this.data = new Cortex(data, this.callback);
}