var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ShopConstants = require('../constants/ShopConstants');
var _ = require('underscore');

var _products;

var ContactStore = _.extend({}, EventEmitter.prototype, {
	getProducts: function() {
		return _products;
	},

	emitChange: function(event) {
		this.emit(event);
	},

	addChangeListener: function(callback, event) {
		this.on(event, callback);
	},

	removeChangeListener: function(callback, event) {
		this.removeListener(event, callback);
	}

});

AppDispatcher.register(function(payload) {
	var data = payload.action;
	if (data == null) return;
	if (data.type === ShopConstants.ActionTypes.GET_PRODUCTS) {
		_products = data.json;
		ContactStore.emitChange(ShopConstants.ActionTypes.GET_PRODUCTS);
	}
	return true;
});

module.exports = ContactStore;
