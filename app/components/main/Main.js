var React = require('react');

const AppBar = require('material-ui/lib/app-bar');
const Colors = require('material-ui/lib/styles/colors');
const Typography = require('material-ui/lib/styles/typography');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const IconButton = require('material-ui/lib/icon-button');


var FullWidthSection = require('../common/full-width-section.js');

var LeftNavMenu = require('../menu/LeftNavMenu');

const Theme = require('../../theme.js');

const history = require('../common/history');

var Main = React.createClass({

    _userMenuTouched: function(e, value) {
        console.log("Main._rightMenuChange", value);
        history.replaceState(null, '/' + value._store.props.value);
    },

    render: function() {
        var styles = this.getStyles();

        var rightMenu = (
            <div>
              <IconButton iconClassName="material-icons" iconStyle={styles.userIcon} onItemTouchTap={this._userMenuTouched}>chat</IconButton>
            </div>
        );


        return (
            <div style={styles.parent}>
                <AppBar title='Nicholas Azar' onLeftIconButtonTouchTap={this.showSideBar} iconElementRight={rightMenu} zDepth={0} style={styles.topMenu}/>
                <LeftNavMenu ref="leftNav"/>
                <div className="contentRoot">
                    {this.props.children}
                </div>

                <FullWidthSection style={styles.footer}>
                    <p style={styles.p}>Copyright Nicholas Azar - 2015</p>
                </FullWidthSection>
            </div>
        );
    },
    getStyles: function () {
        return {
            parent: {
                position: 'relative',
                margin: '64px 0 120px 0',
                overflow: 'hidden'
            },
            footer: {
                backgroundColor: Colors.grey800,
                textAlign: 'center',
                position: 'fixed',
                left: '0px',
                right: '0px',
                bottom: '0px',
                height: '120px',
                zIndex: '-10'
            },
            userIcon: {
                color: 'rgba(255, 255, 255, 0.90)'
            },
            a: {
                color: Colors.red
            },
            p: {
                margin: '0 auto',
                padding: '0',
                color: Colors.lightWhite
            },
            rightMenuButton: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.transparent,
                color: Typography.textFullWhite,
                margin: 0,
                paddingTop: 6
            },
            topMenu: {
                backgroundColor: Colors.green300,
                position: 'fixed',
                top: '0px',
                left: '0px',
                right: '0px',
                height: '64px'
            },
            subheaderMenuItem: {
                backgroundColor: Colors.green300
            }
        };
    },
    showSideBar: function (e) {
        this.refs.leftNav.toggle()
    }
});

module.exports = Main;
