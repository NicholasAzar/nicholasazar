var React = require('react');
const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');
const RaisedButton = require('material-ui/lib/raised-button');

var ContactActions = require ('../../actions/ContactActions');
var history = require('../common/history');

var Contact = React.createClass({

	// Default values
	getInitialState: function() {
		return ({
			name: '',
			email: '',
			text: ''
		});
	},

	// TODO: Add validation.
	onNameChange: function(e) {
		this.setState({
			name: e.target.value
		});
	},
	onEmailChange: function(e) {
		this.setState({
			email: e.target.value
		});
	},
	onTextChange: function(e) {
		this.setState({
			text: e.target.value
		});
	},

	// Action buttons
	onSubmit: function () {
		ContactActions.submitContact(this.state.name, this.state.email, this.state.text);
	},
	onHome: function () {
		history.replaceState(null, '/');
	},

	render: function() {
		return (
			<div>
				<div className="header">
					<h2 className="headerContent">Contact Me</h2>
				</div>
				<div className="contactRoot">
					<Paper className="contactPaper">
						<div className="contactFormFields">
							<div><TextField floatingLabelText="Name" value={this.state.name} onChange={this.onNameChange}/></div>
							<div><TextField floatingLabelText="Email" value={this.state.email} onChange={this.onEmailChange}/></div>
							<div><TextField floatingLabelText="Text"
											value={this.state.text}
											onChange={this.onTextChange}
											ref="text"
											multiLine={true}
											rowsMax={20}/></div>
						</div>
						<div className="contactFormButtons">
							<RaisedButton label="Submit" secondary={true} onTouchTap={this.onSubmit}/>
							<RaisedButton label="Home" primary={true} onTouchTap={this.onHome}/>
						</div>
					</Paper>
				</div>
			</div>
		);
	}
});

module.exports = Contact;