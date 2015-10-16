var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var _ = require('underscore');
var {MenuItem} = require('material-ui');

var _menu = [];

var MenuStore = _.extend({}, EventEmitter.prototype, {
    getMenu: function() {
        return _menu;
    },

    getDefaultMenu: function() {
        return [
            { type: MenuItem.Types.SUBHEADER, text: 'Menu' },
            { route: 'blogs', text: 'Blog'},
            { route: 'contactMe', text: 'Contact Me'},
            { type: MenuItem.Types.SUBHEADER, text: 'External'},
            {
                type: MenuItem.Types.LINK,
                payload: 'https://github.com/NicholasAzar',
                text: 'GitHub'
            },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://github.com/NicholasAzar',
                text: 'LinkedIn'
            },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://github.com/NicholasAzar',
                text: 'Facebook'
            },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://github.com/NicholasAzar',
                text: 'Twitter'
            }
        ];
    },

    emitChange: function() {
        this.emit(AppConstants.ChangeEvents.MENU_CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(AppConstants.ChangeEvents.MENU_CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(AppConstants.ChangeEvents.MENU_CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    if (action == null) return;
    switch(action.type) {
        case AppConstants.ActionTypes.MENU_RESPONSE:
            if (action.json != null) {
                _menu = action.json.out_Own;
            }
            MenuStore.emitChange();
            break;
        default:
            return true;
    }
    return true;
});

module.exports = MenuStore;
