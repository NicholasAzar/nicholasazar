var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var BlogConstants = require('../constants/BlogConstants');
var $ = require('jquery');

var BlogActions = {

    getBlogs: function() {
        $.ajax({
          type: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          url: '/app/components/blog/Blogs.php',
          error: function(jqXHR, status, error) {
            console.log('BlogActions.getBlogs - Error received, using mock data.', error);
            //setTimeout(this.getBlogs, 10000); // try again every 10 seconds
          },
          success: function(result, status, xhr) {
            AppDispatcher.handleAction({
              type: AppConstants.ActionTypes.BLOGS_RESPONSE,
              json: result,
              error: null
            });
          }
        });
    },

    setCurrentBlog: function(blog)  {
        AppDispatcher.handleAction({
          type: BlogConstants.ActionTypes.SET_CURRENT_BLOG,
          json: blog,
          error: null
        });
    },

    setCurrentBlogPost: function (post) {
        console.log("BlogActions setCurrentBlogPost", post);
        AppDispatcher.handleAction({
            type: BlogConstants.ActionTypes.SET_CURRENT_POST,
            json: post,
            error: null
        });
    },

    getBlogPosts: function(blogPermaLink) {
        $.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            url: '/app/components/blog/BlogPosts.php',
            dataType: 'json',
            data: {
              blogPermaLink: blogPermaLink
            },
            error: function(jqXHR, status, error) {
                console.log('BlogActions.getBlogPosts - Error received, using mock data.', status, error);
                //setTimeout(this.getBlogPosts, 10000); // try again every 10 seconds
            },
            success: function(result, status, xhr) {
                console.log('BlogActions.getBlogPosts - Success received.', result);
                AppDispatcher.handleAction({
                    type: AppConstants.ActionTypes.BLOG_POSTS_RESPONSE,
                    json: result,
                    error: null
                });
            }
        });
    }

};

module.exports = BlogActions;
