(function () {
	'use strict';

	angular
		.module('alcomyApp')
		.component('alcomyApp', {
			templateUrl: './app/alcomyApp.component.html',
			controller: AlcomyAppController,
			controllerAs: 'alcomy', // default is $ctrl
			transclude: false,
			$routeConfig: [
				{
					path: '/dashboard/...',
					name: 'Dashboard',
					component: 'dashboard',
					useAsDefault: true
				},
				{
					path: '/residents/...',
					name: 'Residents',
					component: 'residents'
				}
			]


		});

	function AlcomyAppController() {
		var vm = this;

	}


})();