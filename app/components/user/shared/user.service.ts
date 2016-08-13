/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/shared/user.ts" />

declare var firebase;
declare var $firebaseAuth;

namespace alcomy {
	export namespace user {
		'use strict';

		class userService implements IUserService {

			static $inject: Array<string> = ['$log', '$q', '$firebaseObject', '$firebaseAuth'];
			private fbRoot = firebase.database().ref();
			public currentUser: alcomy.user.IUser;

			constructor(
				public $log: ng.ILogService,
				public $q: ng.IQService,
				public $firebaseObject,
				public $firebaseAuth) { }


			public createUser(user: alcomy.user.IUser): ng.IPromise<alcomy.user.IUser> {

				return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
					.then(function (authData) {
						if (authData) {

							let userData: alcomy.user.IUser = {
								firstName: user.firstName,
								lastName: user.lastName,
								email: user.email,
								accountId: user.accountId
							};

							return this.fbRoot.child(`users/${authData.uid}`).set(userData)
						}
					})
					.then(function (authData) {
						return this.setCurrentUser(authData.uid);

					})
					.catch(function (err) {
						this.$log.error(`UserService Error: ${err}`);
					});
			}

			public getCurrentUser(): IUser {
				if (this.currentUser) {
					return this.currentUser;
				} else {
					this.$log.warn('User Service > getCurrentUser: current user is not set')
				}
			}

			public setCurrentUser(id: string) {
				let userRef = this.fbRoot.child(`users/${id}`);
				let userObj = this.$firebaseObject(userRef);


				return userObj.$loaded().then(data => {
					this.$log.info(`user data:`);
					this.currentUser = userObj;

				});

			}

			public clearCurrentUser(): void {
				this.currentUser = null;
			}

		}


		angular
			.module('user')
			.service('userService', userService);

	}

};

