(function () {
	'use strict';

	angular
		.module('mainToolbar')
		.component('asMainToolbar', {
			templateUrl: './app/components/shared/main-toolbar/main-toolbar.component.html',
			controller: MainToolbarController

		});

	MainToolbarController.$inject = ['$mdSidenav', '$rootRouter', '$firebaseAuth', 'userService'];
	/* @ngInject */
	function MainToolbarController($mdSidenav, $rootRouter, $firebaseAuth, userService) {
		var vm = this;
		
		vm.$onInit = function(){
			userService.getCurrentUser().then(function(user){
				vm.user = user;
			}).catch(function(err){
				console.error('Error MainToolbarController: ' + err);
			});
		};

		vm.logout = logout;
		vm.toggleMobileSidenav = toggleMobileSidenav;

		function logout(){
			$firebaseAuth().$signOut();
			$rootRouter.navigate(['Login']);
		}

		function toggleMobileSidenav(){
			$mdSidenav('mobile-sidenav').toggle();
		}

	}
	
})();