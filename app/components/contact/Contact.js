var React = require('react');

const TextField = require('material-ui/lib/text-field');
const Paper = require('material-ui/lib/paper');
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const RefreshIndicator = require('material-ui/lib/refresh-indicator');

var ContactConstants = require ('../../constants/ContactConstants');
var ContactStore = require('../../stores/ContactStore');
var ContactActions = require ('../../actions/ContactActions');
var history = require('../common/history');

var clientKey = require('../../constants/ReCaptchaKey').clientKey;

var ReCAPTCHA = require("react-google-recaptcha");

var Contact = React.createClass({

	// Default values
	getInitialState: function() {
		console.log("clientKey", clientKey);
		return ({
			name: '',
			nameError: '',
			email: '',
			emailError: '',
			text: '',
			textError: '',
			captcha: '',
			showSuccessDialog: false,
			refreshIndicator: 'hide',
			submitButtonDisabled: false
		});
	},

	// TODO: Add validation.
	onNameChange: function(e) {
		let error = '';
		if (!e.target.value) {
			error = 'Name is required.';
		}
		this.setState({
			name: e.target.value,
			nameError: error
		});
	},
	onEmailChange: function(e) {
		let error = '';
		let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!e.target.value) {
			error = 'Email is required.';
		} else if (!emailRegex.test(e.target.value)) {
			error = 'Must be a valid email format';
		}
		this.setState({
			email: e.target.value,
			emailError: error
		});
	},
	onTextChange: function(e) {
		let error = '';
		if (!e.target.value) {
			error = 'Text is required.';
		}
		this.setState({
			text: e.target.value,
			textError: error
		});
	},

	onCaptchaChange: function (e) {
		this.setState({
			captcha: e
		});
	},

	// Action buttons
	onSubmit: function () {
		if (this.state.name && this.state.email && this.state.text
			&& !this.state.nameError && !this.state.emailError && !this.state.textError
			&& this.state.captcha) {
			this.setState({
				refreshIndicator: 'loading',
				submitButtonDisabled: true
			});
			ContactStore.addChangeListener(this.submitContactResult, ContactConstants.ActionTypes.SUBMIT_CONTACT);
			ContactActions.submitContact(this.state.name, this.state.email, this.state.text);
		}
	},
	onHome: function () {
		history.replaceState(null, '/');
	},

	submitContactResult: function() {
		if (ContactStore.isReceived()) {
			this.setState({
				showSuccessDialog: true,
				refreshIndicator: 'hide'
			});
		}
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
							<div><TextField floatingLabelText="Name" errorText={this.state.nameError} value={this.state.name} onChange={this.onNameChange}/></div>
							<div><TextField floatingLabelText="Email" errorText={this.state.emailError} value={this.state.email} onChange={this.onEmailChange}/></div>
							<div><TextField floatingLabelText="Text"
											errorText={this.state.textError}
											value={this.state.text}
											onChange={this.onTextChange}
											ref="text"
											multiLine={true}
											rowsMax={20}/></div>
							<br />
							<ReCAPTCHA
									ref="recaptcha"
									sitekey={clientKey}
									onChange={this.onCaptchaChange}
							/>
						</div>
						<div className="contactFormButtons">
							<RefreshIndicator size={30} left={40} top={2} status={this.state.refreshIndicator} />
							<RaisedButton label="Submit" secondary={true} onTouchTap={this.onSubmit} disabled={this.state.submitButtonDisabled} style={{marginRight: '5px'}}/>
							<RaisedButton label="Home" primary={true} onTouchTap={this.onHome}/>
						</div>
					</Paper>
				</div>
				<Dialog
						title="Thanks for the message!"
						actions={[
							{text: 'Ok', onTouchTap: this.onHome, ref: 'submit' }
						]}
						actionFocus="submit"
						open={this.state.showSuccessDialog}
						onRequestClose={this.onHome}>
					I received it and will get back to you soon, have a good one!
				</Dialog>
			</div>
		);
	}
});

module.exports = Contact;