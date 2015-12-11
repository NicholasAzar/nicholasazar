var AppDispatcher = require('../dispatcher/AppDispatcher');
var ShopConstants = require('../constants/ShopConstants');
var $ = require('jquery');

var ShopActions = {

	getProducts: function () {
		$.ajax({
			type: 'POST',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: 'json',
			url: '/app/components/shop/Products.php',
			error: function (jqXHR, status, error) {
				//setTimeout(this.getBlogs, 10000); // try again every 10 seconds
			},
			success: function (result, status, xhr) {
				AppDispatcher.handleAction({
					type: ShopConstants.ActionTypes.GET_PRODUCTS,
					json: result,
					error: null
				});
			}
		});
	}
};

module.exports = ShopActions;
