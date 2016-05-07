(function () {
	'use strict';

	angular
		.module('alcomyApp')
		.constant('FIREBASE_URL', 'https://alcomydev1.firebaseio.com')
		.service('firebaseRoot', ['FIREBASE_URL', Firebase]);


})();