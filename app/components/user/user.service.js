(function () {
	'use strict';
	
	angular
		.module('user')
		.service('userService', userService);
	
	userService.$inject = ['$q'];
	
	/* @ngInject */
	function userService($q) {
		var self = this;
		var user = {
			firstName: 'Brane',
			lastName: 'Vrajich',
			avatar: 'assets/images/avatars/brane.jpg'
		};
		
		self.getCurrentUser = getCurrentUser;
		
		////////////////
		
		function getCurrentUser() {
			var deferred = $q.defer();
			deferred.resolve(user);
			return deferred.promise;
		}
	}
	
})();

