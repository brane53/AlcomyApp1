(function () {
	'use strict';

	angular
		.module('alcomyApp')
		.constant('firebaseUrl', 'https://alcomydev1.firebaseio.com')
		.service('firebaseRoot', ['firebaseUrl', Firebase]);


})();