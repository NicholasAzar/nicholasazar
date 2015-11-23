var React = require('react');
var Router = require('react-router');
const LeftNav = require('material-ui/lib/left-nav');

var MenuStore = require('../../stores/MenuStore');
var MenuActions = require('../../actions/MenuActions');

let Colors = require('material-ui/lib/styles/colors');
let Typography = require('material-ui/lib/styles/typography');
let Spacing = require('material-ui/lib/styles/spacing');

var history = require('../common/history');

const ThemeManager = require('material-ui/lib/styles/theme-manager');

var LeftNavMenu = React.createClass({
    contextTypes: {
        router: React.PropTypes.func,
        muiTheme: React.PropTypes.object
    },

    componentWillMount: function() {
        //this.context.muiTheme.setComponentThemes({
        //    menuSubheader: {
        //        textColor: Colors.green300
        //    }
        //});
    },
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
                cursor: 'pointer',
                fontSize: '24px',
                color: Typography.textFullWhite,
                lineHeight: Spacing.desktopKeylineIncrement + 'px',
                fontWeight: Typography.fontWeightLight,
                backgroundColor: Colors.green300,
                paddingLeft: Spacing.desktopGutter,
                paddingTop: '0px',
                marginBottom: '0px'
            },
            leftNav: {
                "SubheaderMenuItem backgroundColor": Colors.green400
            }

        };
    },

    render: function() {
        var style = this.getStyles();
        var header = (
            <div style={style.root} onTouchTap={this.onHeaderClick}>Nicholas Azar</div>
        );

        return (
            <LeftNav
                ref="leftNav"
                style={style.leftNav}
                docked={false}
                isInitiallyOpen={false}
                header={header}
                menuItems={this.state.menu}
                selectedIndex={this.getSelectedIndex()}
                onChange={this.onLeftNavChange} />
        );
    },

    toggle: function() {
        this.refs.leftNav.toggle();
    },

    getSelectedIndex: function() {
        var currentItem;
        for (var i = this.state.menu.length - 1; i >= 0; i--) {
            currentItem = this.state.menu[i];
            if (currentItem.route) return i;
        }
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
