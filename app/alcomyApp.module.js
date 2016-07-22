(function () {
	'use strict';
	
	angular
		.module('alcomyApp', [
			'ngComponentRouter',
			'ngAnimate',
			'ngAria',
			'ngMessages',
			'ngMaterial',
			'ngIdle',
			'firebase',
			'angular.filter',

			'security',
			'mainToolbar',
			'user',
			'home',
			'dashboard',
			'residents',
			'company',
			'account'
		]);
})();