(function () {
	'use strict';

	angular
		.module('alcomyApp')
		.component('alcomyApp', {
			templateUrl: './app/alcomyApp.component.html',
			controller: AlcomyAppController,
			$routeConfig: [
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
					name: 'Register',
					component: 'login'
				},
				{
					path: '/...',
					name: 'Home',
					component: 'home'
				}
			]

		});

	function AlcomyAppController() {
		var vm = this;

	}


})();