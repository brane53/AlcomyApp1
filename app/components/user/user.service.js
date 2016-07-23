(function () {
	'use strict';
	
	angular
		.module('user')
		.service('userService', userService);
	
	userService.$inject = ['$log','$q', '$firebaseAuth'];
	
	/* @ngInject */
	function userService($log, $q, $firebaseAuth) {
		var self = this;

		self.createUser = createUser;
		
		////////////////

		function createUser(user){

			$firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
				.then(function(userData){
					if(userData){
						
						return $firebaseAuth().$signInWithEmailAndPassword(credentials);
					}
				})
				.then(function(authData){

					var userData = {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email
					};

					return fbRoot.child('users').child(authData.uid).set(userData)
					.then(function(data){
						console.log('Data: ', data);
						return data;
					});

				})
				.catch(function(err){
					console.warn("Error: " + err);
				});
		}




	}
	
})();

