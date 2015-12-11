var React = require('react');
const LeftNav = require('material-ui/lib/left-nav');

var MenuStore = require('../../stores/MenuStore');
var MenuActions = require('../../actions/MenuActions');

var history = require('../common/history');

var LeftNavMenu = React.createClass({

    getInitialState: function() {
        return {
            menu: [],
			selectedIndex: 0
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

    render: function() {
        var header = (
            <div className="leftNavRoot" onTouchTap={this.onLeftNavChange}>Nicholas Azar</div>
        );

        return (
            <LeftNav
                ref="leftNav"
                docked={false}
                isInitiallyOpen={false}
                header={header}
                menuItems={this.state.menu}
				selectedIndex={this.state.selectedIndex}
                onChange={this.onLeftNavChange} />
        );
    },

    toggle: function() {
        this.refs.leftNav.toggle();
    },

	recomputeSelectedIndex(route) {
		let newSelectedIndex = 0;
		for (let i = 0; i < this.state.menu.length; i++) {
			if (this.state.menu[i].route === route) {
				newSelectedIndex = i;
			}
		}
		this.setState({
			selectedIndex: newSelectedIndex
		});
	},

    onLeftNavChange: function(e, key, payload) {
		let route = '/';
		if (payload.route) {
			route = payload.route;
		}
		this.recomputeSelectedIndex(route);
        history.replaceState(null, route);
		this.refs.leftNav.close();
    }
});
module.exports = LeftNavMenu;
