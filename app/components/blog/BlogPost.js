var React =  require('react');
var FullWidthSection = require('../common/full-width-section.js');
var BlogStore = require('../../stores/BlogStore');
var BlogAction = require('../../actions/BlogActions');
var {Paper} = require('material-ui');
var AppConstants = require('../../constants/AppConstants');

var BlogPostView = React.createClass({

    getInitialState: function() {
        return {
            post: {}
        };
    },

    componentDidMount: function() {
        BlogStore.addChangeListener(this._receivePost);
        BlogAction.getPost("#" + this.props.params.postRid);
    },

    _receivePost: function() {
        this.setState({
            post: BlogStore.getPost()
        })
    },

    render: function() {
        var date = new Date(this.state.post.createDate);
        return (
            <div>
                <div className="blogHeader">
                    <h2 className="mainBlogHeader">NetworkNt Blogs</h2>
                </div>
                <div className="blogPostRoot">
                    <Paper className="blogPostPaper">
                        <div className="title">
                            {this.state.post.title}
                        </div>
                        <div className="date">
                            {AppConstants.monthNames[date.getMonth()]} {date.getDay()}, {date.getFullYear()}
                        </div>
                        <div className="content">
                            {this.state.post.content}
                        </div>
                    </Paper>
                    <div className="aboutTheAuthor">
                        <h1>This post was brought to you by <span className="author">{this.state.post.createUserId}</span></h1>

                        <p>(Info about the author): Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aspernatur dignissimos dolorem, eos, eum iste iusto molestiae mollitia non quidem, quis quisquam sed sint vitae? Error hic necessitatibus nostrum!</p>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = BlogPostView;