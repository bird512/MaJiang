/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
	textInput: {
		height: 40, 
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.9)',
		paddingLeft: 10,
	},
	bg : {
		backgroundColor: '#3B3738',
		flex: 1,
		justifyContent: 'center',
		padding: 15

	},
	loginLogo: {
		width: 100,
	},
	background: {
        flex: 1,
        resizeMode: 'stretch'
    },
	logo: {
		marginBottom: 60,
		marginTop: -50,
		alignSelf: 'center',
		width: 250,		
		height: 250,		
		resizeMode: 'stretch'
	},
	navbar: {
		borderBottomColor: 'transparent',
	},
	border: {
		alignSelf: 'stretch',
		position: 'relative',										
		borderColor: 'rgba(255,255,255,0.5)',
		borderBottomWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		marginTop: 15,
		marginRight: 10,
		marginLeft: 10,
		height: 40
	}
});
