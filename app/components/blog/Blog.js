var React =  require('react');
var {Link} = require('react-router');
var FullWidthSection = require('../common/full-width-section.js');
var BlogStore = require('../../stores/BlogStore');
var BlogActions = require('../../actions/BlogActions');
var {List, ListItem, Paper, RaisedButton} = require('material-ui');
var AppConstants = require('../../constants/AppConstants');
var BlogConstants = require('../../constants/BlogConstants');
var history = require('../common/history');

var Blog = React.createClass({
    componentWillMount: function() {
		BlogStore.addChangeListener(this._receiveBlogPosts, BlogConstants.ActionTypes.GET_BLOG_POSTS);
		BlogActions.getBlogPosts(this.props.params.blogPermaLink);

		if (Object.keys(BlogStore.getCurrentBlog()).length === 0) {
			console.log("Current blog empty, fetching");
			BlogStore.addChangeListener(this._receiveCurrentBlog, BlogConstants.ActionTypes.GET_CURRENT_BLOG);
			BlogActions.getCurrentBlog(this.props.params.blogPermaLink);
		}
	},

    getInitialState: function() {
        return {
            blogPosts: [],
			currentBlog: {}
        };
    },

    _receiveBlogPosts: function() {
		console.log("Receive Blog Posts");
        this.setState({
            blogPosts: BlogStore.getBlogPosts()
        });
    },

	_receiveCurrentBlog: function() {
		console.log("Receive current blog", BlogStore.getCurrentBlog());
		this.setState({
			currentBlog: BlogStore.getCurrentBlog()
		});
	},

    _routeToPost: function(post) {
        console.log("routeToPost", post);
        BlogActions.setCurrentBlogPost(post);
        history.replaceState(null, '/blogs/' + this.state.currentBlog.BLOG_PERMA_LINK + '/' + post.BLOG_POST_PERMA_LINK);
    },

    render: function() {
        return (
            <div>
                <div className="blogHeader">
                    <h2 className="mainBlogHeader">{BlogConstants.BLOG_HEADER}</h2>
                </div>
                <div className="blogRoot">
                    <div className="blogPostsRoot">
                        <div className="blogPostsleftColumn">
                            {
                                this.state.blogPosts.map(function(post) {
                                    var dateArray = post.CREATE_DTTM.split(/[- :]/);
                                    var date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

                                    var boundClick = this._routeToPost.bind(this, post);
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
                                <h1>{this.state.currentBlog.BLOG_TITLE}</h1>
                                <p>{this.state.currentBlog.BLOG_INFORMATION}</p>
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
