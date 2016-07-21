(function () {
	'use strict';
	
	angular
		.module('alcomyApp')
		.factory('authService', authService);
	
	authService.$inject = ['$q', '$timeout', '$firebaseAuth', 'userService'];
	
	/* @ngInject */
	function authService($q, $timeout, $firebaseAuth, userService) {
		var self = this;

		// creates a firebase authentication object
		return $firebaseAuth();

/*  self.isLoggedIn = false;
		self.registerUser = registerUser;
		self.login = login;
		self.logout = logout;*/
		
		////////////////

		// Registers a new user in firebase
		/*function registerUser(newUserObj){
			var credentials = {
				email: newUserObj.email,
				password: newUserObj.password
			};
			authObj.$createUser(credentials)
				.then(function(userData){
					if(userData){
						return authObj.$authWithPassword(credentials)
					}
				})
				.then(function(authData){
					firebaseRoot.child('users').child(authData.uid).set({
						firstName: newUserObj.firstName,
						lastName: newUserObj.lastName,
						email: newUserObj.email
					})
				})
				.catch(function(err){
					console.warn("Error: " + err)
				});
		}*/

		// Logs a user in given their email and password. Aka authenticates a user
		/*function login(email, password) {
			var credentials = {
				email: email,
				password: password
			};

			return authObj.$authWithPassword(credentials)
				.then(function(authData){
					/!*userService.setCurrentUser(authData.uid)*!/
					if(authData){
						self.isLoggedIn = true;
						return true;
					}
					return true;
				})
				.catch(function(err){
					console.warn('Error: ' + err)
					return false;
				});
		}*/

	}
	
})();

