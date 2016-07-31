/// <reference path="../typings/index.d.ts" />


namespace alcomyApp {
	'use strict';

	let routeConfig: Array<Object> = [
				// {
				// 	path: '/login/',
				// 	name: 'Login',
				// 	component: 'login'
				// },
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

	// AlcomyAppController Definition

	AlcomyAppController.$inject = ['$log'];

	class AlcomyAppController {
		
		constructor($log: ng.ILogService){

		}

	}









	angular
		.module('alcomyApp')
		.component('alcomyApp', {
			templateUrl: './app/alcomyApp.component.html',
			controller: AlcomyAppController,
			$routeConfig: routeConfig

		});

};