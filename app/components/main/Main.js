var React = require('react');

const AppBar = require('material-ui/lib/app-bar');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const IconButton = require('material-ui/lib/icon-button');
var LeftNavMenu = require('../menu/LeftNavMenu');
const Theme = require('../../theme.js');
const history = require('../common/history');

var Main = React.createClass({
    childContextTypes : {
        muiTheme: React.PropTypes.object
    },
	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(Theme)
		};
	},

    _userMenuTouched: function(e, value) {
        history.replaceState(null, '/' + value._store.props.value);
    },

    render: function() {
        var styles = this.getStyles();

        var rightMenu = (
            <div>
              <IconButton iconClassName="material-icons" iconStyle={{color: 'rgba(255, 255, 255, 0.90)'}} onItemTouchTap={this._userMenuTouched}>chat</IconButton>
            </div>
        );


        return (
            <div className="mainRoot">
                <AppBar title='Nicholas Azar' onLeftIconButtonTouchTap={this.showSideBar} iconElementRight={rightMenu} zDepth={0} style={styles.topMenu}/>
                <LeftNavMenu ref="leftNav"/>
                <div className="contentRoot">
                    {this.props.children}
                </div>

                <div className="mainFooter">
                    <p className="footerText">Copyright Nicholas Azar - 2015</p>
                </div>
            </div>
        );
    },
    getStyles: function () {
        return {
            topMenu: {
                position: 'fixed',
                top: '0px',
                left: '0px',
                right: '0px',
                height: '64px'
            }
        };
    },
    showSideBar: function (e) {
        this.refs.leftNav.toggle()
    }
});

module.exports = Main;
