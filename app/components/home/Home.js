var React = require('react');
var {RaisedButton, Styles} = require('material-ui');
var FullWidthSection = require('../common/full-width-section.js');
var { Colors, Spacing, Typography } = Styles;

var Home = React.createClass({

    render: function() {
        var styles=this.getStyles();
        return (
            <div>
                <FullWidthSection style={styles.root}>
                    <div style={styles.tagline}>
                        <h1 style={styles.h1}>Nicholas Azar's personal website</h1>
                        <h2 style={styles.h2}>
                            A place to link to any of my work and provide an easy way to contact me.
                        </h2>

                    </div>
                </FullWidthSection>
                <FullWidthSection style={styles.githubSection}>
                    <h2 style={styles.githubSectionh2}>All the code for this site can be found on Github!</h2>
                    <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/NicholasAzar/nicholasazar"/>
                </FullWidthSection>
            </div>
        );
    },
    getStyles: function () {
        return {
            root: {
                backgroundColor: Colors.green400,
                overflow: 'hidden',
                width: '100%'
            },
            tagline: {
                margin: '16px auto 0 auto',
                textAlign: 'center',
                maxWidth: '575px'
            },
            h1: {
                color: Colors.darkWhite,
                fontWeight: Typography.fontWeightLight,
                lineHeight: 1.5
            },
            h2: {
                //.mui-font-style-title
                fontSize: '20px',
                lineHeight: '28px',
                paddingTop: '19px',
                marginBottom: '13px',
                letterSpacing: '0',
                color: Colors.darkWhite,
                fontWeight: Typography.fontWeightLight
            },
            githubSection: {
                backgroundColor: Colors.grey200,
                textAlign: 'center'
            },
            githubSectionh2: {
                color: Colors.grey900,
                fontSize: '20px',
                lineHeight: '28px',
                paddingTop: '19px',
                marginBottom: '13px',
                letterSpacing: '0',
                fontWeight: Typography.fontWeightLight
            }
        };
    }
});

module.exports = Home;
