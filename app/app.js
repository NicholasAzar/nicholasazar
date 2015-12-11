import React        from 'react';
import ReactDOM     from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import history      from './components/common/history';

var Main = require('./components/main/Main');
var Home = require('./components/home/Home');
var Blogs = require('./components/blog/Blogs');
var Blog = require('./components/blog/Blog');
var BlogPost = require('./components/blog/BlogPost.js');
var Contact = require('./components/contact/Contact');
var Shop = require('./components/shop/Shop');
require('./assets/stylesheets/main.scss');
window.React = React;

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

ReactDOM.render(
	<Router history={history}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home}/>
			<Route path="blogs" component={Blogs}/>
			<Route path="blogs/:blogPermaLink" component={Blog}/>
			<Route path="blogs/:blogPermaLink/:postPermaLink" component={BlogPost}/>
			<Route path="contact" component={Contact} />
			<Route path="shop" component={Shop} />
			<Route path="*" component={Home}/>
		</Route>
	</Router>, document.getElementById('content')
);
