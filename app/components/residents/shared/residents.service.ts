/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
	export namespace residents {
		'use strict';




		class residentsService {
			static $inject = ['$q', '$log', '$http', '$firebaseArray'];
			residents: Array<Object>;

			/* @ngInject */
			constructor(
					public $q: ng.IQService, 
					public $log: ng.ILogService,
					public $firebaseArray) {
				this.residents = [
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
			}

			////////////////

			// TODO Connect Firebase
			getResidents() {
				// es6 style promise
				/*return $q(function(resolve, reject){
					resolve(residents);
				});*/

				// common-js style promise
				var deferred = this.$q.defer();
				deferred.resolve(residents);
				return deferred.promise;
			}

			// TODO-Implement getResident()

			// TODO-Implement currentResident



		}

		angular
			.module('residents')
			.service('residentsService', residentsService);
	}
};

