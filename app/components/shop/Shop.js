var React = require('react');
var history = require('../common/history');

const RaisedButton = require('material-ui/lib/raised-button');

var Shop = React.createClass({
	getInitialState: function() {
		return({
			products: [{test: "test"}]
		});
	},
	render: function() {
		return (
			<div>
				<div className="header">
					<h2 className="headerContent">Shop</h2>
				</div>
				<div className="shop">
				{
					this.state.products.map(function(product){
						return (
							<div className="product">
								<div className="productDisplay">
									<img src="http://lorempixel.com/300/350/nature/"/>
									<span className="productTitle">Title</span>
									<span className="productSubtitle">Subtitle</span>
								</div>
								<div className="productButtons">
									<RaisedButton label="Action1"/>
									<RaisedButton label="Action2"/>
								</div>
							</div>
						);
					}, this)
				}
				</div>
			</div>
		);
	}
});

module.exports = Shop;