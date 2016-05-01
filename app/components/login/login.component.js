(function () {
	'use strict';

	angular
		.module('login')
		.component('login', {
			templateUrl: './app/components/login/login.component.html',
			controller: LoginController,

		});

	LoginController.$inject = ['authService'];

	/* @ngInject */
	function LoginController(authService) {
		var vm = this;

		vm.login = function(email, password){
			authService.login
		}
	}

})();