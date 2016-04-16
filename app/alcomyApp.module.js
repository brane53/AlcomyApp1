(function () {
	'use strict';
	
	angular
		.module('alcomyApp', [
			'ngComponentRouter',
			'ngAnimate',
			'ngAria',
			'ngMessages',
			'ngMaterial',
			'firebase',
			
			'dashboard',
			'residents'
		]);
})();