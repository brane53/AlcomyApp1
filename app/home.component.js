(function () {
	'use strict';
	
	angular
		.module('home')
		.component('home', {
			templateUrl: './app/home.component.html',
			controller: HomeController,
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
				},
			]
			
		});

	HomeController.$inject = ['userService', '$mdSidenav'];
	/* @ngInject */
	function HomeController(userService, $mdSidenav) {
		var vm = this;
		
		vm.$onInit = function(){
			userService.getCurrentUser().then(function(user){
				vm.user = user;
			}).catch(function(err){
				console.error('Error MainToolbarController: ' + err);
			});
		}

		vm.toggleMobileSidenav = toggleMobileSidenav;

		function toggleMobileSidenav(){
			$mdSidenav('mobile-sidenav').toggle();
		}
		
	}
	
	
})();