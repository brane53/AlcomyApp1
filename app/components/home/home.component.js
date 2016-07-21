(function () {
	'use strict';
	
	angular
		.module('home')
		.component('home', {
			templateUrl: './app/components/home/home.component.html',
			controller: HomeController,
			bindings: {
				$router: '<'
			},
			$canActivate: $canActivate,
			// ROUTES
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


	$canActivate.$inject = ['$nextInstruction', '$prevInstruction', '$firebaseAuth', '$rootRouter'];
	/* @ngInject */
	function $canActivate($nextInstruction, $prevInstruction, $firebaseAuth, $rootRouter){
		console.log('$canActivate: ', arguments);
		
		return $firebaseAuth().$requireSignIn()
			.then(function(state){
				console.log('You can access the home component');
				return state;
			})
			.catch(function(err){
				console.log('Auth Error: ', err);
				$rootRouter.navigate(['Login']);
			});
	}

	HomeController.$inject = ['$mdSidenav', '$firebaseAuth', 'userService', ];
	/* @ngInject */
	function HomeController($mdSidenav, $firebaseAuth, userService) {
		var vm = this;

		// TODO Resolve that the current user was retrieved before loading the
		// route
		
		vm.$routerOnActivate = function(){
			
			return userService.getCurrentUser()
				.then(function(user){
					vm.user = user;
				})
				.catch(function(err){
					console.error('Error MainToolbarController: ' + err);
				});
		};


		
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