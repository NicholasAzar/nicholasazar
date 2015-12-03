var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var BlogConstants = require('../constants/BlogConstants');
var _ = require('underscore');

var _blogs = [];
var _currentBlog = {};
var _currentPost = {};
var _blogPosts = [];
var _post = {};

var BlogStore = _.extend({}, EventEmitter.prototype, {
    getBlogs: function() {
        return _blogs;
    },

    getCurrentBlog: function() {
        return _currentBlog;
    },

    getCurrentPost: function() {
        return _currentPost;
    },

    getBlogPosts: function() {
        return _blogPosts;
    },

    getPost: function() {
        return _post;
    },

    emitChange: function(event) {
        this.emit(event);
    },

    addChangeListener: function(callback, event) {
        this.on(event, callback);
    },

    removeChangeListener: function(callback, event) {
        this.removeListener(event, callback);
    }

});

AppDispatcher.register(function(payload) {
    console.log("BlogStore payload:", payload);
    var data = payload.action;
    if (data == null) return;
    if (data.type === BlogConstants.ActionTypes.GET_BLOGS) {
        console.log("BlogStore received GET_BLOGS:", data.json);
        _blogs = data.json;
        BlogStore.emitChange(BlogConstants.ActionTypes.GET_BLOGS);
    } else if (data.type === BlogConstants.ActionTypes.GET_BLOG_POSTS) {
        console.log("BlogStore received GET_BLOG_POSTS:", data.json);
        _blogPosts = data.json;
        BlogStore.emitChange(BlogConstants.ActionTypes.GET_BLOG_POSTS);
    } else if (data.type === BlogConstants.ActionTypes.GET_CURRENT_POST) {
        console.log("BlogStore received GET_CURRENT_POST:", data.json);
        _post = data.json;
        BlogStore.emitChange(BlogConstants.ActionTypes.GET_CURRENT_POST);
    } else if (data.type === BlogConstants.ActionTypes.GET_CURRENT_BLOG) {
        console.log("BlogStore received GET_CURRENT_BLOG:", data.json);
		if (data.json && data.json.length > 0) {
			_currentBlog = data.json[0];
		}
        BlogStore.emitChange(BlogConstants.ActionTypes.GET_CURRENT_BLOG);
    } else if (data.type === BlogConstants.ActionTypes.SET_CURRENT_BLOG) { // When opening a blog, set this.
        console.log("BlogStore receive SET_CURRENT_BLOG:", data.json);
        _currentBlog = data.json;
        BlogStore.emitChange(BlogConstants.ActionTypes.SET_CURRENT_BLOG);
    } else if (data.type === BlogConstants.ActionTypes.SET_CURRENT_POST) {
        console.log("BlogStore receive SET_CURRENT_POST:", data.json);
        _currentPost = data.json;
        BlogStore.emitChange(BlogConstants.ActionTypes.SET_CURRENT_POST);
    }
    return true;
});

module.exports = BlogStore;
