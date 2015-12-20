var React =  require('react');
var {Link} = require('react-router');
var BlogStore = require('../../stores/BlogStore');
var BlogActions = require('../../actions/BlogActions');
var {Paper, RaisedButton} = require('material-ui');
var AppConstants = require('../../constants/AppConstants');
var BlogConstants = require('../../constants/BlogConstants');
var history = require('../common/history');

var Blog = React.createClass({
	componentDidMount: function() {
		BlogStore.addChangeListener(this._receiveBlogPosts, BlogConstants.ActionTypes.GET_BLOG_POSTS);
		BlogActions.getBlogPosts(this.props.params.blogPermaLink);
		if (Object.keys(BlogStore.getCurrentBlog()).length === 0) {
			BlogStore.addChangeListener(this._receiveCurrentBlog, BlogConstants.ActionTypes.GET_CURRENT_BLOG);
			BlogActions.getCurrentBlog(this.props.params.blogPermaLink);
		} else {
			this.setState({
				currentBlog: BlogStore.getCurrentBlog()
			})
		}
	},

    getInitialState: function() {
        return {
            blogPosts: [],
			currentBlog: {}
        };
    },

    _receiveBlogPosts: function() {
        this.setState({
            blogPosts: BlogStore.getBlogPosts()
        });
    },

	_receiveCurrentBlog: function() {
		this.setState({
			currentBlog: BlogStore.getCurrentBlog()
		});
	},

    _routeToPost: function(post) {
        BlogActions.setCurrentBlogPost(post);
        history.replaceState(null, '/blogs/' + this.state.currentBlog[BlogConstants.BLOG_PARAM_KEY] + '/' + post[BlogConstants.BLOG_POST_PARAM_KEY]);
    },

    render: function() {
        return (
            <div>
                <div className="header">
                    <h2 className="headerContent">{BlogConstants.BLOG_HEADER}</h2>
                </div>
                <div className="blogRoot">
                    <div className="blogPostsRoot">
                        <div className="blogPostsleftColumn">
                            {
                                this.state.blogPosts.map(function(post) {
                                    var dateArray = post[BlogConstants.BLOG_POST_DATE_KEY].split(/[- :]/);
                                    var date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

                                    var boundClick = this._routeToPost.bind(this, post);
                                    return (
                                        <span>
                                            <Paper className="blogPostsPaper">
                                                <div className="blogPost">
                                                    <h2>
                                                        <strong className="strongDate">{AppConstants.monthNames[date.getMonth()]} {date.getDate()},</strong> <span className="year">{date.getFullYear()}</span>
                                                    </h2>
                                                    <h1 className="title"><a onClick={boundClick}>{post[BlogConstants.BLOG_POST_TITLE_KEY]}</a></h1>
                                                    <p className="content">
                                                        {post[BlogConstants.BLOG_POST_DESC_KEY]}
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
                                <h1>{this.state.currentBlog[BlogConstants.BLOG_TITLE_KEY]}</h1>
                                <p>{this.state.currentBlog[BlogConstants.BLOG_INFO_KEY]}</p>
                            </div>
                        </div>
                    </div>

                    <Link to="/blogs">
                        <RaisedButton label="Back"/>
                    </Link>
                </div>
            </div>
        );
    },
	componentWillUnmount: function() {
		BlogStore.removeChangeListener(this._receiveBlogPosts, BlogConstants.ActionTypes.GET_BLOG_POSTS)
		BlogStore.removeChangeListener(this._receiveCurrentBlog, BlogConstants.ActionTypes.GET_CURRENT_BLOG);
	}
});

module.exports = Blog;
