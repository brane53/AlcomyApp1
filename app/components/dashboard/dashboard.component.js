(function () {
	'use strict';
	
	angular
		.module('dashboard')
		.component('dashboard', {
			templateUrl: './app/components/dashboard/dashboard.component.html',
			controller: DashboardController,
			transclude: false,
			$routeConfig: [
				{
					path: '/tasks',
					nane: 'Tasks',
					component: 'tasks',
					useAsDefault: true
				}
			]
			
		});
	
	DashboardController.$inject = [];
	
	/* @ngInject */
	function DashboardController() {
		var vm = this;
		
	}
	
	
})();