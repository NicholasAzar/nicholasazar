var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    BLOG_ADD: null,
    BLOG_REMOVE: null,
    BLOG_UPDATE: null,
    RECEIVE_BLOGS: null,
    RECEIVE_BLOG_POSTS: null,
    SET_CURRENT_BLOG: null
    })
};
