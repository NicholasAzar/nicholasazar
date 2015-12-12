var React = require('react');
var history = require('../common/history');

const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');

var Shop = React.createClass({
	getInitialState: function() {
		return({
			products: [
				{
					title: 'Title1',
					subTitle: 'Subtitle',
					imageLink: 'http://lorempixel.com/400/450/nature/',
					buyButtonHtml: React.renderToString(<RaisedButton label="Buy" primary={true} style={{margin: '5px', textAlign: 'center'}} linkButton={true} href="google.com"/>)
				},
				{
					title: 'Title2',
					subTitle: 'Subtitle',
					imageLink: 'http://lorempixel.com/300/350/nature/',
					buyButtonHtml: React.renderToString(<RaisedButton label="Buy" primary={true} style={{margin: '5px', textAlign: 'center'}} linkButton={true} href="google.com"/>)
				},
				{
					title: 'Title3',
					subTitle: 'Subtitle',
					imageLink: 'http://lorempixel.com/300/350/nature/',
					buyButtonHtml: React.renderToString(<RaisedButton label="Buy" primary={true} style={{margin: '5px', textAlign: 'center'}} linkButton={true} href="google.com"/>)
				},
				{
					title: 'Title4',
					subTitle: 'Subtitle',
					imageLink: 'http://lorempixel.com/300/350/nature/',
					buyButtonHtml: React.renderToString(<RaisedButton label="Buy" primary={true} style={{margin: '5px', textAlign: 'center'}} linkButton={true} href="google.com"/>)
				},
				{
					title: 'Title5',
					subTitle: 'Subtitle',
					imageLink: 'http://lorempixel.com/300/350/nature/',
					buyButtonHtml: React.renderToString(<RaisedButton label="Buy" primary={true} style={{margin: '5px', textAlign: 'center'}} linkButton={true} href="google.com"/>)
				}
			],
			dialogIsDisplayed: false,
			dialogTitle: '',
			dialogImage: ''
		});
	},

	onViewFull: function(product) {
		console.log("View Full:", product);
		this.setState({
			dialogIsDisplayed: true,
			dialogTitle: product.title,
			dialogImage: product.imageLink
		})
	},

	onViewClose: function() {
		this.setState({
			dialogIsDisplayed: false,
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
										<img src={product.imageLink}/>
										<span className="productOverlay">
											<span className="productTextOverlay">
												<span className="productTitle">{product.title}</span>
												<span className="productSubtitle">{product.subTitle}</span>
											</span>
										</span>
									</div>
									<div className="productButtons">
										<RaisedButton label="View Full" onTouchTap={this.onViewFull.bind(this, product)} secondary={true} style={{margin: '5px'}}/>
										<span dangerouslySetInnerHTML={{__html:product.buyButtonHtml}} />
									</div>
								</div>
							</div>
						);
					}, this)
				}
				</div>
				<Dialog
					title={this.state.dialogTitle}
					open={this.state.dialogIsDisplayed}
					onRequestClose={this.onViewClose}>
					<img src={this.state.dialogImage} />
				</Dialog>
			</div>
		);
	}
});

module.exports = Shop;