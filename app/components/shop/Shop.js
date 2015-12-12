var React = require('react');
var history = require('../common/history');

const RaisedButton = require('material-ui/lib/raised-button');

var Shop = React.createClass({
	getInitialState: function() {
		return({
			products: [{test: "test"}, {test: "test"}, {test: "test"}, {test: "test"}, {test: "test"}]
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
							<div className="productWrapper">
								<div className="product">
									<div className="productDisplay">
										<img src="http://lorempixel.com/300/350/nature/"/>
										<span className="productOverlay">
											<span className="productTextOverlay">
												<span className="productTitle">Title</span>
												<span className="productSubtitle">Subtitle</span>
											</span>
										</span>
									</div>
									<div className="productButtons">
										<RaisedButton label="View Full" secondary={true} style={{margin: '5px'}}/>
										<RaisedButton label="Buy" primary={true} style={{margin: '5px'}}/>
									</div>
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