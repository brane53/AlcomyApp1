(function () {
	'use strict';
	
	angular
		.module('alcomyApp')
		.service('authService', authService);
	
	authService.$inject = ['$q', '$timeout', '$firebaseAuth', 'firebaseRoot', 'userService'];
	
	/* @ngInject */
	function authService($q, $timeout, $firebaseAuth, firebaseRoot, userService) {
		
		var self = this
		// creates a firebase authentication object
		var authObj = $firebaseAuth(firebaseRoot);
		self.isLoggedIn = false;
		
		self.registerUser = registerUser;
		self.login = login;
		self.logout = logout;
		
		////////////////

		// Registers a new user in firebase
		function registerUser(newUserObj){
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
		}

		// Logs a user in given their email and password. Aka authenticates a user
		function login(email, password) {
			var credentials = {
				email: email,
				password: password
			};

			return authObj.$authWithPassword(credentials)
				.then(function(authData){
					/*userService.setCurrentUser(authData.uid)*/
					
					return true;
				})
				.catch(function(err){
					console.warn('Error: ' + err)
					return false;
				});
		}

		/*getStatusTimeout();*/

		authObj.$onAuth(function(authData){
			if(authData){
				self.isLoggedIn = true;
			}
			else {
				self.isLoggedIn = false
			}
		})
		

		/*function getStatusTimeout(){
			$timeout(function(){
				isLoggedIn = true;
				console.log('User Logged In')
			}, 3000)
		}*/

		// Logs out the current user.
		function logout(){
			authObj.$unauth();
		}

	}
	
})();

