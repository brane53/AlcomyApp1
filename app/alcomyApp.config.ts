/// <reference path="../typings/index.d.ts" />
/// <reference path="components/user/shared/user.ts" />


namespace alcomy {
	'use strict';

	angular
		.module('alcomyApp')
		.config(config)
		.value('$routerRootComponent', 'alcomyApp');

/////////////////////// CONFIG BLOCK /////////////////////////////


	config.$inject = [
		'$mdThemingProvider',
		'$mdIconProvider',
		'$locationProvider',
		'IdleProvider'
	];
	/* @ngInject */
	function config(
		$mdThemingProvider: angular.material.IThemingProvider, 
		$mdIconProvider: angular.material.IIconProvider, 
		$locationProvider: ng.ILocationProvider,
	  IdleProvider): void {
		// TODO make sure you pre-load and cache the icons
		// see: https://material.angularjs.org/latest/api/service/$mdIconProvider
		$mdIconProvider.defaultIconSet('app/assets/svg/icons.svg', 24);

		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('amber', {
				//'default': '500'
			});

		$mdThemingProvider.theme('neutral')
			.primaryPalette('grey', {
				'default': '500',
				'hue-1': '50',
				'hue-2': '300',
				'hue-3': '800'
			})
			.accentPalette('blue-grey', {
				'default': '500',
				'hue-1': '100',
				'hue-2': '300',
				'hue-3': '800'
			});

		// Sets the number of seconds of inactivity
		// until the idle event is triggered
		IdleProvider.idle(1200);

		// Sets the number os sections of inactivity after the idle event is 
		// triggered until the timeout event is triggered
		IdleProvider.timeout(300);

		$locationProvider.html5Mode(true);
	}

};