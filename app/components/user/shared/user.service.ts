/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/shared/user.ts" />

declare var firebase;
declare var $firebaseAuth;

namespace alcomy {
	export namespace user {
		'use strict';

		class userService implements IUserService {

			static $inject: Array<string> = ['$log', '$q', '$firebaseAuth'];
			private fbRoot = firebase.database().ref();
			public currentUser: alcomy.user.IUser;

			constructor(
				public $log: ng.ILogService,
				public $q: ng.IQService,
				public $firebaseObject,
				public $firebaseAuth) { }


			public createUser(user: alcomy.user.IUser) {

				return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
					.then(function (authData) {
						if (authData) {

							let userData = {
								firstName: user.firstName,
								lastName: user.lastName,
								email: user.email,
								accountId: ''
							};

							return this.fbRoot.child(`users/${authData.uid}`).set(userData)
						}
					})
					.then(function () {
						let id = firebase.auth().currentUser.uid;
						let userRef = this.fbRoot.child(`users/${id}`).ref()
						return this.currentUser = this.$firebaseObject(userRef);
							
					})
					.catch(function (err) {
						this.$log.error(`UserService Error: ${err}`);
					});
			}

			public getUserProfile(){
					if(this.currentUser){
						return this.currentUser;
					} else {
						this.$log.warn('currentUser is not set')
					}
			}

			public setCurrentUser() {
				let id = firebase.auth().currentUser.uid;
				let userRef = this.fbRoot.child(`users/${id}`).ref()
				this.currentUser = this.$firebaseObject(userRef);
			}



		}


		angular
			.module('user')
			.service('userService', userService);

	}

};

