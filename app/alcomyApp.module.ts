/// <reference path="../typings/index.d.ts" />

namespace alcomy {
	'use strict';

	angular.module('alcomyApp', [
			// Vender Modules
			'ngComponentRouter',
			'ngAnimate',
			'ngAria',
			'ngMessages',
			'ngMaterial',
			'ngIdle',
			'firebase',
			'angular.filter',
			'angularMoment',
			'ngFileUpload',
			'ngImgCrop',
			// App Modules
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