var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ContactConstants = require('../constants/ContactConstants');
var _ = require('underscore');

var _isReceived;

var ContactStore = _.extend({}, EventEmitter.prototype, {
	isReceived: function() {
		return _isReceived;
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
	if (data.type === ContactConstants.ActionTypes.SUBMIT_CONTACT) {
		console.log("ContactStore received SUBMIT_CONTACT:", data.json);
		_isReceived = data.json[0];
		ContactStore.emitChange(ContactConstants.ActionTypes.SUBMIT_CONTACT);
	}
	return true;
});

module.exports = ContactStore;
