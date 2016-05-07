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
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
				age: '28',
				color: 'green',
				avatar: 'assets/images/avatars/justin.jpg'
			},
			{
				firstName: 'brane',
				lastName: 'vrajich',
				age: '28',
				color: 'blue',
				avatar: 'assets/images/avatars/brane.jpg'
			},
			{
				firstName: 'rebekah',
				lastName: 'vrajich',
				age: '28',
				color: 'pink',
				avatar: 'assets/images/avatars/rebekah.jpg'
			},
			{
				firstName: 'justin',
				lastName: 'kunz',
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

