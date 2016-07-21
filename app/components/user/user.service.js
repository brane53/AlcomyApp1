(function () {
	'use strict';
	
	angular
		.module('user')
		.service('userService', userService);
	
	userService.$inject = ['$q', 'firebaseRoot', '$firebaseAuth'];
	
	/* @ngInject */
	function userService($q, firebaseRoot, $firebaseAuth) {
		var self = this;
		
		var user = {
			firstName: null,
			lastName: null,
			avatar: 'assets/images/avatars/brane.jpg'
		};


		self.setCurrentUser = setCurrentUser;
		self.getCurrentUser = getCurrentUser;
		
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
	}
	
})();

