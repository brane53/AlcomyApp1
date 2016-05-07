(function () {
	'use strict';

	angular
		.module('login')
		.component('login', {
			templateUrl: './app/components/login/login.component.html',
			controller: LoginController,

		});

	LoginController.$inject = ['$location', 'authService'];

	/* @ngInject */
	function LoginController($location, authService) {
		var vm = this;
		vm.newUserObj = {
			firstName: null,
			lastName: null,
			email: null,
			password: null
		};

		// TODO these need to be put into a service
		vm.isRegister = false;  // TODO this needs to be
		// implemented
		// correctly
		vm.isLoggedIn = authService.isLoggedIn;    // TODO this needs to be implemented correctly

		
		// Calls the login from authService
		vm.login = function (email, password) {
			authService.login(email, password)
				.then(function (loggedIn) {
					vm.isLoggedIn = loggedIn;
					console.log('IsLoggedIn: ' + vm.isLoggedIn)

				})
				.catch(function (loggedIn) {
				});
		}


		// TODO make this more secure. implement safeguards
		// TODO create route redirect if use is logged in
		vm.registerUser = function (newUserObj) {
			authService.registerUser(newUserObj);
		};

		vm.$routerCanDeactivate = function () {
			return vm.isLoggedIn;
		}

		// TODO-Implement Create Logout function
		vm.logout = function(){
			authService.logout();
		}
	}

})();