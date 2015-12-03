var keyMirror = require('keymirror');

module.exports = {

	BLOG_HEADER: 'Blogs',

	ActionTypes: keyMirror({
		BLOG_ADD: null,
		BLOG_REMOVE: null,
		BLOG_UPDATE: null,
		GET_BLOGS: null,
		GET_BLOG_POSTS: null,
		SET_CURRENT_BLOG: null,
		SET_CURRENT_POST: null,
		GET_CURRENT_BLOG: null,
		GET_CURRENT_POST: null
	})
};
