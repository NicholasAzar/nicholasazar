var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var MockBlogData = require('../components/blog/MockBlogData');
var $ = require('jquery');

var BlogActions = {

    getBlogs: function() {
        $.ajax({
          type: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          url: './app/components/blog/Blogs.php',
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

    getBlogPosts: function(id) {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: './app/components/blog/BlogPosts.php',
            data: JSON.stringify({
                blogId : 'id'
            }),
            error: function(jqXHR, status, error) {
                console.log('BlogActions.getBlogPosts - Error received, using mock data.', error);
                //setTimeout(this.getBlogPosts, 10000); // try again every 10 seconds
            },
            success: function(result, status, xhr) {
                AppDispatcher.handleAction({
                    type: AppConstants.ActionTypes.BLOG_POSTS_RESPONSE,
                    json: result,
                    error: null
                });
            }
        });
    },

    getPost: function (rid) {
        $.ajax({
            type: 'POST',
            url: 'http://example:8080/api/rs',
            data: JSON.stringify({
                category : 'blog',
                name : 'getPost',
                readOnly: true,
                "data": {
                    host: AppConstants.host,
                    "@rid": rid
                }
            }),
            contentType: 'application/json',
            dataType: 'json',
            error: function(jqXHR, status, error) {
                console.log('BlogActions.getBlogPosts - Error received, using mock data.', error);
                AppDispatcher.handleAction({
                    type: AppConstants.ActionTypes.BLOG_POST_RESPONSE,
                    json: MockBlogData.getPost(),
                    error: null
                });
            },
            success: function(result, status, xhr) {
                AppDispatcher.handleAction({
                    type: AppConstants.ActionTypes.BLOG_POST_RESPONSE,
                    json: result,
                    error: null
                });
            }
        });
    }

};

module.exports = BlogActions;
