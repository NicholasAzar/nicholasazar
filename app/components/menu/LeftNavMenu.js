var React = require('react');
const LeftNav = require('material-ui/lib/left-nav');

var MenuStore = require('../../stores/MenuStore');
var MenuActions = require('../../actions/MenuActions');

var history = require('../common/history');

var LeftNavMenu = React.createClass({

    getInitialState: function() {
        return {
            menu: []
        }
    },

    componentDidMount: function() {
        MenuStore.addChangeListener(this._onMenuChange);
        MenuActions.getMenu();
    },

    _onMenuChange: function() {
        var newMenu = MenuStore.getDefaultMenu();
        this.setState({
            menu: newMenu
        })
    },

    getStyles: function() {
        return {
            root: {

            }
        };
    },

    render: function() {
        var header = (
            <div className="leftNavRoot" onTouchTap={this.onHeaderClick}>Nicholas Azar</div>
        );

        return (
            <LeftNav
                ref="leftNav"
                docked={false}
                isInitiallyOpen={false}
                header={header}
                menuItems={this.state.menu}
                onChange={this.onLeftNavChange} />
        );
    },

    toggle: function() {
        this.refs.leftNav.toggle();
    },

    onLeftNavChange: function(e, key, payload) {
        history.replaceState(null, payload.route);
    },

    onHeaderClick: function () {
        history.replaceState(null, '/');
        this.refs.leftNav.close();
    }
});
module.exports = LeftNavMenu;
