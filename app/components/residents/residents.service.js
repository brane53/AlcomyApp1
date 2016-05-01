(function () {
	'use strict';
	
	angular
		.module('residents')
		.service('residentsService', residentsService);
	
	residentsService.$inject = ['$q','$log','$http', '$firebaseArray'];
	
	/* @ngInject */
	function residentsService($q, $log, $http, $firebaseArray) {
		var self = this;
		
		var residents = [
			{
				name: 'brane',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				name: 'rebekah',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				name: 'justin',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			}
		];

		

		self.getResidents = getResidents;
		
		////////////////

		// TODO Connect Firebase
		function getResidents() {
			// es6 style promise
			/*return $q(function(resolve, reject){
				resolve(residents);
			});*/

			// common-js style promise
			var deferred = $q.defer();
			deferred.resolve(residents);
			return deferred.promise;
		}

		// TODO-Implement getResident()

		// TODO-Implement currentResident



	}
	
})();

