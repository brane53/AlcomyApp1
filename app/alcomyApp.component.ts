/// <reference path="../typings/index.d.ts" />


namespace alcomy {
	'use strict';

	let routeConfig: Array<Object> = [
				{
					path: '/login/',
					name: 'Login',
					component: 'login'
				},
				{
					path: '/logout/',
					name: 'Logout',
					component: 'logout'
				},
				{
					path: '/register/',
					name: 'Account',
					component: 'account'
				},
				{
					path: '/...',
					name: 'Home',
					component: 'home'
				}
			];



	class AlcomyAppController {
		static $inject: Array<string> = ['$log'];
		
		constructor($log: ng.ILogService) {}


	}


	angular
		.module('alcomyApp')
		.component('alcomyApp', {
			templateUrl: './app/alcomyApp.component.html',
			controller: AlcomyAppController,
			$routeConfig: routeConfig

		});

};