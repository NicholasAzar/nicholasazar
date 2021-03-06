let Colors = require('material-ui/lib/styles/colors');
let Typography = require('material-ui/lib/styles/typography');
let ColorManipulator = require('material-ui/lib/utils/color-manipulator');
let Spacing = require('material-ui/lib/styles/spacing');

module.exports = {
	spacing: Spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: Colors.green300,
		primary2Color: Colors.green500,
		primary3Color: Colors.lightBlack,
		accent1Color: Colors.pinkA200,
		accent2Color: Colors.grey100,
		accent3Color: Colors.grey500,
		textColor: Colors.darkBlack,
		alternateTextColor: Colors.white,
		canvasColor: Colors.white,
		borderColor: Colors.grey300,
		disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
		menuSubheader: {
			textColor: Colors.green500
		}
	}
};
