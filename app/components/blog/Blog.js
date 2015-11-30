var React =  require('react');
var {Link} = require('react-router');
var FullWidthSection = require('../common/full-width-section.js');
var BlogStore = require('../../stores/BlogStore');
var BlogActions = require('../../actions/BlogActions');
var {List, ListItem, Paper, RaisedButton} = require('material-ui');
var AppConstants = require('../../constants/AppConstants');

var history = require('../common/history');

var Blog = React.createClass({
    componentDidMount: function() {
        BlogStore.addChangeListener(this._receiveBlogPosts);
        BlogActions.getBlogPosts(this.props.params.blogPermaLink);
    },

    getInitialState: function() {
        return {
            blogPosts: []
        };
    },

    _receiveBlogPosts: function() {
        this.setState({
            blogPosts: BlogStore.getBlogPosts()
        })
    },
    _routeToPost: function(BLOG_POST_PERMA_LINK) {
        history.replaceState(null, '/blogs/' + BlogStore.getCurrentBlog().BLOG_PERMA_LINK + '/' + BLOG_POST_PERMA_LINK);
    },

    render: function() {
        return (
            <div>
                <div className="blogHeader">
                    <h2 className="mainBlogHeader">Blogs</h2>
                </div>
                <div className="blogRoot">
                    <div className="blogPostsRoot">
                        <div className="blogPostsleftColumn">
                            {
                                this.state.blogPosts.map(function(post) {
                                    var dateArray = post.CREATE_DTTM.split(/[- :]/);
                                    var date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

                                    var boundClick = this._routeToPost.bind(this, post.BLOG_POST_PERMA_LINK);
                                    return (
                                        <span>
                                            <Paper className="blogPostsPaper">
                                                <div className="blogPost">
                                                    <h2>
                                                        <strong className="strongDate">{AppConstants.monthNames[date.getMonth()]} {date.getDate()},</strong> <span className="year">{date.getFullYear()}</span>
                                                    </h2>
                                                    <h1 className="title"><a onClick={boundClick}>{post.BLOG_POST_TITLE}</a></h1>
                                                    <p className="content">
                                                        {post.BLOG_POST_DESCRIPTION}
                                                    </p>
                                                </div>
                                            </Paper>
                                            <hr />
                                        </span>
                                    );
                                }, this)
                            }
                        </div>
                        <div className="blogPostsRightColumn">
                            <div className="blogInfo">
                                <h1>Blog Information</h1>
                                <p>{BlogStore.getCurrentBlog().BLOG_INFORMATION}</p>
                            </div>
                        </div>
                    </div>

                    <Link to="/blogs">
                        <RaisedButton label="Back"/>
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = Blog;
