(function () {
	'use strict';
	
	angular
		.module('alcomyApp')
		.service('authService', authService);
	
	authService.$inject = ['$firebaseAuth', 'firebaseRoot'];
	
	/* @ngInject */
	function authService($firebaseAuth, firebaseRoot) {
		
		var self = this
		// creates a firebase authentication object
		var authObj = $firebaseAuth(firebaseRoot);
		
		self.createUser = createUser;
		self.login = login;
		self.logout = logout;
		
		////////////////

		// Registers a new user in firebase
		function createUser(email, password){
			var credentials = {
				email: email,
				password: password
			};
			authObj.createUser(credentials)
				.then(function(userData){
					
				})
		}

		// Logs a user in given their email and password. Aka authenticates a user
		function login(email, password) {
			var credentials = {
				email: email,
				password: password
			};

			authObj.$authWithPassword(credentials)
		}

		// Logs out the current user.
		function logout(){
			authObj.unauth();
		}

	}
	
})();

