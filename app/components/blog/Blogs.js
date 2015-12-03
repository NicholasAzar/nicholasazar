var React =  require('react');
var FullWidthSection = require('../common/full-width-section.js');
var BlogStore = require('../../stores/BlogStore');
var BlogAction = require('../../actions/BlogActions');
var BlogRow = require('./BlogRow');
var {List, ListItem, Paper, Styles} = require('material-ui');
var BlogStore = require('../../stores/BlogStore');
var BlogAction = require('../../actions/BlogActions');
var { Colors, Spacing, Typography } = Styles;
var BlogConstants = require('../../constants/BlogConstants');

var Blogs = React.createClass({

    getInitialState: function() {
        return {
            blogs: []
        }
    },

    componentWillMount: function() {
        BlogStore.addChangeListener(this._onChange, BlogConstants.ActionTypes.GET_BLOGS);
        BlogAction.getBlogs();
    },

    _onChange: function() {
        this.setState({
            blogs: BlogStore.getBlogs()
        });
    },

    render: function() {
        return (
            <div className="blogs">
                <div className="blogHeader">
                        <h2 className="mainBlogHeader">{BlogConstants.BLOG_HEADER}</h2>
                </div>
                <div className="blogsSection">
                    <div className="blogsDescription">
                        <h1>These are the blogs.</h1>

                        <p>Splitting up and categorizing blogs helps you to only see the post you want! Select any blog
                        from the selection to check out the posts.<br />
                        </p>
                    </div>
                    <Paper className="blogsList">
                        <List>
                            {
                                this.state.blogs.map(function (blog, index) {
                                    return (
                                        <BlogRow key={index} blog={blog}></BlogRow>
                                    );
                                })
                            }
                        </List>
                    </Paper>
                </div>
            </div>
        );
    },

    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    }

});

module.exports = Blogs;
