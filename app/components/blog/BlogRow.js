var React = require('react');
var {ListItem} = require('material-ui');
var BlogActions = require('../../actions/BlogActions');
const BlogConstants = require('../../constants/BlogConstants');

var history = require('../common/history');

var BlogRow = React.createClass({

    render: function () {
        return (
            this._createItems(this.props.blog)
        );
    },

    _onTouchTap: function (permaLink) {
      BlogActions.setCurrentBlog(this.props.blog);
      history.replaceState(null, '/blogs/' + permaLink);
    },


    _createItems: function (blogs) {
        var children;
        if (blogs[BlogConstants.BLOG_CHILDREN_KEY]) {
            children = blogs[BlogConstants.BLOG_CHILDREN_KEY].map(function (child) {
                return this._createItems(child);
            }.bind(this));
        }
        return (
            <ListItem
                key={blogs[BlogConstants.BLOG_KEY_KEY]}
                leftAvatar={this._getLeftAvatar(blogs[BlogConstants.BLOG_POST_COUNT_KEY])}
                primaryText={blogs[BlogConstants.BLOG_TITLE_KEY]}
                secondaryText={blogs[BlogConstants.BLOG_DESC_KEY]}
                onTouchTap={this._onTouchTap.bind(this, blogs[BlogConstants.BLOG_PARAM_KEY])}>{children}</ListItem>
        );
    },

    _getLeftAvatar: function(count) {
        return (
            <div className="blogLeftAvatar">{count}</div>
        );
    }
});

module.exports = BlogRow;
