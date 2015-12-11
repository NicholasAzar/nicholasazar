var React = require('react');
var history = require('../common/history');

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

const RaisedButton = require('material-ui/lib/raised-button');

var Shop = React.createClass({
	getInitialState: function() {
		return({
			products: [{test: "test"}]
		});
	},

	getStyles: function() {
		return({
			product: {
				width: '300px',
				height: '400px',
				left: '50%',
				marginLeft: '-150px',
				marginTop: '20px'
			}
		});
	},
	render: function() {
		let styles = this.getStyles();
		return (
			<div className="shop">
				<div className="header">
					<h2 className="headerContent">Shop</h2>
				</div>
				<div>
				{
					this.state.products.map(function(product){
						return (
							<Card style={styles.product}>
								<CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
									<img src="http://lorempixel.com/300/350/nature/"/>
								</CardMedia>
								<CardActions>
									<RaisedButton label="Action1"/>
									<RaisedButton label="Action2"/>
								</CardActions>
							</Card>
						);
					}, this)
				}
				</div>
			</div>
		);
	}
});

module.exports = Shop;