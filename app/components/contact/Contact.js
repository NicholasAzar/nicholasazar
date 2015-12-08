var React = require('react');
const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');
const RaisedButton = require('material-ui/lib/raised-button');

var ContactActions = require ('../../actions/ContactActions');
var history = require('../common/history');

var Contact = React.createClass({
	// Add validation.
	onNameChange: function() {

	},
	onEmailChange: function() {

	},
	onTextChange: function() {

	},
	onSubmit: function () {
		ContactActions.submitContact(this.props.refs.name.getValue(), this.props.refs.email.getValue(), this.props.refs.text.getValue());
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
							<div><TextField floatingLabelText="Name" ref="name" /></div>
							<div><TextField floatingLabelText="Email" ref="email" /></div>
							<div><TextField floatingLabelText="Text" ref="text" /></div>
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