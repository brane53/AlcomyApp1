(function () {
	'use strict';
	
	angular
		.module('user')
		.service('userService', userService);
	
	userService.$inject = ['$q', '$firebaseAuth'];
	
	/* @ngInject */
	function userService($q, $firebaseAuth) {
		var self = this;
		

		var user = {
			firstName: null,
			lastName: null,
			avatar: 'assets/images/avatars/brane.jpg'
		};


		self.setCurrentUser = setCurrentUser;
		self.getCurrentUser = getCurrentUser;
		self.createUser = createUser;
		
		////////////////

		// TODO-Implement figure out how to set the current user with the userRef
		function setCurrentUser(userId){
			var userRef = firebaseRoot.child('users').child(userId);
		}
		
		function getCurrentUser(){

			var deferred = $q.defer();
			deferred.resolve(user);
			return deferred.promise;
		}

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

