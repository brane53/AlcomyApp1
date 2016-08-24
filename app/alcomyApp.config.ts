/// <reference path="../typings/index.d.ts" />
/// <reference path="components/user/shared/user.ts" />


namespace alcomy {
	'use strict';

	angular
		.module('alcomyApp')
		.config(config)
		.value('$routerRootComponent', 'alcomyApp')
		.run(run);

	////////////////// RUN BLOCK FUNCTION //////////////////////////////

	run.$inject = ['$log', '$rootScope', '$rootRouter', '$mdDialog', 'Idle', '$firebaseAuth', 'userService'];
	/* @ngInject */
	function run(
		$log: ng.ILogService, 
		$rootScope: ng.IRootScopeService, 
		$rootRouter, 
		$mdDialog: angular.material.IDialogService, 
		Idle, 
		$firebaseAuth,
		userService: alcomy.user.IUserService): void {

		$log.info('AlcomyApp Module - run block is running')

		var alert: angular.material.IAlertDialog | angular.material.IPromptDialog;

		// User gets redirected to the login screen if they they become unauthenticated
		$firebaseAuth().$onAuthStateChanged(authData => {
			if (!authData) {
				$rootRouter.navigate(['Login']);
				userService.clearCurrentUser();
				Idle.unwatch();
				

			} else {
				Idle.watch();
			}

		});

		// A dialog appears informing the user that they are about to be logged out
		$rootScope.$on('IdleStart', () => {
			$log.warn('You are Idling');
			// Configure the alert
			alert = $mdDialog.alert()
				.title('Session About to Expire')
				.textContent("You have been idle for a long time and your session is" +
				             " about to expire. Do something if you don't want that to happen")
				.ok('Ok');
			// Display the alert and delete it once closed
			$mdDialog.show(alert).finally(() => {
				alert = undefined;
			});
		});

		// Signs user out and alerts them that they were signed out
		$rootScope.$on('IdleTimeout', () => {
			$mdDialog.cancel('Session Expired');
			// Sign out user
			$firebaseAuth().$signOut();
			// Configure alert
			alert = $mdDialog.prompt()
				.title('Session Expired')
				.textContent('Your session has timed out. Please press continue and' +
				             ' log back in')
				.ok('Continue')
				.cancel('Cancel');
			// Display alert and delete alert once closed
			$mdDialog.show(alert).finally(() => {
				alert = undefined;
			});

			$log.warn('You are timed out!');
		});

	}

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
			.accentPalette('light-green', {
				'default': '500'
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