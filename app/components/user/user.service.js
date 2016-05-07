(function () {
	'use strict';
	
	angular
		.module('user')
		.service('userService', userService);
	
	userService.$inject = ['$q', 'firebaseRoot'];
	
	/* @ngInject */
	function userService($q) {
		var self = this;
		var user = {
			firstName: 'Brane',
			lastName: 'Vrajich',
			avatar: 'assets/images/avatars/brane.jpg'
		};


		self.setCurrentUser = setCurrentUser;
		self.getCurrentUser = getCurrentUser;
		
		////////////////

		// TODO-Implement
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

