/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../components/user/shared/user.ts" />
declare var firebase;

namespace alcomy {
	export namespace security {
		'use strict';


		class authService {
			static $inject: Array<string> = ['$log', '$q', '$timeout', '$firebaseAuth', 'userService'];
			isLoggedIn = false;
			private fbRoot = firebase.database().ref();

			/* @ngInject */
			constructor(
				public $log: ng.ILogService,
				public $q: ng.IQService,
				public $timeout: ng.ITimeoutService,
				public $firebaseAuth,
				public userService: alcomy.user.IUserService) { }

			// Logs a user in given their email and password and retrieve their info
			login(email, password) {

				return this.$firebaseAuth().$signInWithEmailAndPassword(email, password);
					
			}


			// LOGOUT
			/*
			* FIX
			* if you have multiple tabs open and the Home component is already
			* loaded you can continue to navigate through the app once you logout.
			*
			* */
			logout() {
				this.$firebaseAuth().$signOut();
				this.$firebaseAuth().$waitForSignIn()
					.then(state => {
						this.isLoggedIn = !!state;
					});
			}


		}


		angular
			.module('alcomyApp')
			.service('authService', authService);
	}
};