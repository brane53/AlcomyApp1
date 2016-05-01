(function () {
	'use strict';

	angular
		.module('mainToolbar')
		.component('asMainToolbar', {
			templateUrl: './app/components/shared/main-toolbar/main-toolbar.component.html',
			controller: MainToolbarController

		});

	MainToolbarController.$inject = ['$mdSidenav', 'userService'];
	/* @ngInject */
	function MainToolbarController($mdSidenav, userService) {
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