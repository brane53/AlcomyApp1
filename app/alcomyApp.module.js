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
			'angular.filter',
			'security',
			'mainToolbar',
			'user',
			'home',
			'dashboard',
			'residents'
		]);
})();