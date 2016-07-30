/// /// <reference path="../typings/globals/angular/index.d.ts" />


namespace alcomyApp {
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
			'facility',
			'account'
		]);
};