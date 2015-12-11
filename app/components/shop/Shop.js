var React = require('react');
var history = require('../common/history');

var Shop = React.createClass({
	getInitialState: function() {
		return({
			products: []
		});
	},
	render: function() {
		return (
			<div>
				<div className="header">
					<h2 className="headerContent">Shop</h2>
				</div>
				Hello World!
			</div>
		);
	}
});

module.exports = Shop;