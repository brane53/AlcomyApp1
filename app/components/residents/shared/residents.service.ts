/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="residents.ts" />
declare var firebase;
import Residents = alcomy.residents;
namespace alcomy {
	export namespace residents {
		'use strict';




		class residentsService {
			static $inject = ['$q', '$log', '$firebaseArray'];
		
			private fbRoot = firebase.database().ref();
			private residentsRef = this.fbRoot.child('residents');
			
			residents: Array<Residents.IResident>;
			residentsMock: Array<Object>;


			/* @ngInject */
			constructor(
				private $q: ng.IQService,
				private $log: ng.ILogService,
				private $firebaseArray) {
				this.$log.info('Resident Service Instantiated');
				this.residents = this.$firebaseArray(this.residentsRef);
				this.residentsMock = [
					{
						id: '1',
						firstName: 'brane',
						lastName: 'vrajich',
						age: '28',
						color: 'blue',
						avatar: 'assets/images/avatars/brane.jpg'
					},
					{
						id: '2',
						firstName: 'rebekah',
						lastName: 'vrajich',
						age: '28',
						color: 'pink',
						avatar: 'assets/images/avatars/rebekah.jpg'
					},
					{
						id: '3',
						firstName: 'justin',
						lastName: 'kunz',
						age: '28',
						color: 'green',
						avatar: 'assets/images/avatars/justin.jpg'
					},
					{
						id: '4',
						firstName: 'brane',
						lastName: 'vrajich',
						age: '28',
						color: 'blue',
						avatar: 'assets/images/avatars/brane.jpg'
					},
					{
						id: '5',
						firstName: 'rebekah',
						lastName: 'vrajich',
						age: '28',
						color: 'pink',
						avatar: 'assets/images/avatars/rebekah.jpg'
					},
					{
						id: '6',
						firstName: 'justin',
						lastName: 'kunz',
						age: '28',
						color: 'green',
						avatar: 'assets/images/avatars/justin.jpg'
					},
					{
						id: '7',
						firstName: 'brane',
						lastName: 'vrajich',
						age: '28',
						color: 'blue',
						avatar: 'assets/images/avatars/brane.jpg'
					},
					{
						id: '8',
						firstName: 'rebekah',
						lastName: 'vrajich',
						age: '28',
						color: 'pink',
						avatar: 'assets/images/avatars/rebekah.jpg'
					},
					{
						id: '9',
						firstName: 'justin',
						lastName: 'kunz',
						age: '28',
						color: 'green',
						avatar: 'assets/images/avatars/justin.jpg'
					},
					{
						id: '10',
						firstName: 'brane',
						lastName: 'vrajich',
						age: '28',
						color: 'blue',
						avatar: 'assets/images/avatars/brane.jpg'
					},
					{
						id: '11',
						firstName: 'rebekah',
						lastName: 'vrajich',
						age: '28',
						color: 'pink',
						avatar: 'assets/images/avatars/rebekah.jpg'
					},
					{
						id: '12',
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
				deferred.resolve(this.residentsMock);
				return deferred.promise;
			}



			// TODO-Implement getResident()
			getResident(id: string) {
				let deferred = this.$q.defer();
				return this.residentsMock.forEach(resident => {
					if (resident.id === id) {
						deferred.resolve(resident);
						return deferred.promise;
					}
				});
			}

			// TODO-Implement currentResident

			// Create Resident
			createResident(resident: Residents.IResident) {
				let residentsRef =	this.fbRoot.child('residents');
				return this.residents.$add(resident).then(ref => {
					this.$log.info(ref);
					return;
				})
			}


		}

		angular
			.module('residents')
			.service('residentsService', residentsService);
	}
};

