var React =  require('react');
var BlogRow = require('./BlogRow');
var {List, Paper} = require('material-ui');
var BlogStore = require('../../stores/BlogStore');
var BlogAction = require('../../actions/BlogActions');
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
                <div className="header">
                        <h2 className="headerContent">{BlogConstants.BLOG_HEADER}</h2>
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
        BlogStore.removeChangeListener(this._onChange, BlogConstants.ActionTypes.GET_BLOGS);
    }

});

module.exports = Blogs;
