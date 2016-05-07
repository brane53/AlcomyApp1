(function () {
	'use strict';
	
	angular
		.module('home')
		.component('home', {
			templateUrl: './app/components/home/home.component.html',
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

		// TODO Resolve that the current user was retrieved before loading the
		// route
		/*vm.$routerOnActivate = function(){
			return userService.getCurrentUser()
				.then(function(user){
					vm.user = user;
				})
				.catch(function(err){
					console.error('Error MainToolbarController: ' + err);
				});
		}*/


		
		/*vm.$onInit = function(){
			userService.getCurrentUser().then(function(user){
				vm.user = user;
			}).catch(function(err){
				console.error('Error MainToolbarController: ' + err);
			});
		}*/

		vm.toggleMobileSidenav = toggleMobileSidenav;

		function toggleMobileSidenav(){
			$mdSidenav('mobile-sidenav').toggle();
		}
		
	}
	
	
})();