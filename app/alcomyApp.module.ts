/// <reference path="../typings/index.d.ts" />

namespace alcomy {
	'use strict';

	angular.module('alcomyApp', [
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