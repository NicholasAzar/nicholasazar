var React =  require('react');
var {Link} = require('react-router');
var BlogStore = require('../../stores/BlogStore');
var BlogActions = require('../../actions/BlogActions');
var {Paper, RaisedButton} = require('material-ui');
var AppConstants = require('../../constants/AppConstants');
var BlogConstants = require('../../constants/BlogConstants');
var marked = require('marked');

var BlogPostView = React.createClass({
    componentWillMount: function() {
        if (BlogStore.getCurrentPost()) {
			BlogActions.getCurrentBlog(this.props.params.blogPermaLink);
			BlogActions.getCurrentBlogPost(this.props.params.blogPermaLink, this.props.params.postPermaLink);
		}

		this.setState({
        	post: BlogStore.getCurrentPost()
      	});
    },

    render: function() {
        var dateArray = this.state.post[BlogConstants.BLOG_POST_DATE_KEY].split(/[- :]/);
        var date = new Date(dateArray[0], dateArray[1]-1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

      return (
            <div>
                <div className="header">
                    <h2 className="headerContent">{BlogConstants.BLOG_HEADER}</h2>
                </div>
                <div className="blogPostRoot">
                    <Paper className="blogPostPaper">
                        <div className="title">
                            {this.state.post[BlogConstants.BLOG_POST_TITLE_KEY]}
                        </div>
                        <div className="date">
                            {AppConstants.monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                        </div>
                        <div className="content" dangerouslySetInnerHTML={{__html:marked(this.state.post[BlogConstants.BLOG_POST_CONTENT_KEY])}} />
                    </Paper>
                    <div className="aboutTheAuthor">
                        <h1>This post was brought to you by <span className="author">Nicholas Azar</span></h1>

                        <p>Just having fun.</p>
                    </div>
                    <Link to={"/blogs/" + this.props.params.blogPermaLink}>
                        <RaisedButton label="Back"/>
                    </Link>
                </div>
            </div>
        );
    }

});

module.exports = BlogPostView;
