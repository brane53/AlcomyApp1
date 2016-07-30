(function () {
	'use strict';
	
	angular
		.module('user')
		.service('userService', userService);
	
	userService.$inject = ['$log','$q', '$firebaseAuth'];
	
	/* @ngInject */
	function userService($log, $q, $firebaseAuth) {
		var self = this;

		var fbRoot = firebase.database().ref();

		self.createUser = createUser;
		
		////////////////

		function createUser(user){

			return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
				.then(function(authData){
					if(authData){

						var userData = {
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							companyId: ''
						};

						return fbRoot.child('users').child(authData.uid).set(userData)
							.then(function(){

								return authData.uid;
							})
							.catch(function(err){
								$log.error('Error when returning authData: ' + err);
							});
					
					}
				})
				.catch(function(err){
					$log.error('UserService Error: ' + err);
				});
		}




	}
	
})();

