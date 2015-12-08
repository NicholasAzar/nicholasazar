var AppDispatcher = require('../dispatcher/AppDispatcher');
var ContactConstants = require('../constants/ContactConstants');
var $ = require('jquery');

var ContactActions = {

	submitContact: function (name, email, text) {
		$.ajax({
			type: 'POST',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			url: '/app/components/contact/Contact.php',
			data: {
				name: name,
				email: email,
				text: text
			},
			error: function (jqXHR, status, error) {
				//setTimeout(this.getBlogs, 10000); // try again every 10 seconds
			},
			success: function (result, status, xhr) {
				// add a listener to this to validate successful message.
				AppDispatcher.handleAction({
					type: ContactConstants.ActionTypes.SUBMIT_CONTACT,
					json: result,
					error: null
				});
			}
		});
	}
};

module.exports = ContactActions;
