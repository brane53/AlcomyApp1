/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/shared/user.ts" />

declare var firebase;
declare var $firebaseAuth;

namespace alcomy {
	export namespace user {
		'use strict';

		class userService implements IUserService {

			static $inject: Array<string> = ['$log','$q', '$firebaseAuth'];
			private fbRoot = firebase.database().ref();

			constructor(public $log: ng.ILogService, 
									public $q, 
									public $firebaseAuth) {}


			public createUser(user: alcomy.user.IUser) {

				return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
					.then(function(authData){
						if(authData){

							var userData = {
								firstName: user.firstName,
								lastName: user.lastName,
								email: user.email,
								companyId: ''
							};

							return this.fbRoot.child('users').child(authData.uid).set(userData)
								.then(function(){

									return authData.uid;
								})
								.catch(function(err){
									this.$log.error('Error when returning authData: ' + err);
								});
						
						}
					})
					.catch(function(err){
						this.$log.error('UserService Error: ' + err);
					});
			}
		}


		angular
			.module('user')
			.service('userService', userService);

	}

};

