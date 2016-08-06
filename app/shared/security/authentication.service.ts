/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../components/user/shared/user.ts" />


namespace alcomy {
	export namespace security {
		'use strict';

		angular
			.module('alcomyApp')
			.factory('authService', authService);

		class authService {
			static $inject = ['$log', '$q', '$timeout', '$firebaseAuth', 'userService'];
			isLoggedIn = false;

			/* @ngInject */
			constructor(
				public $log: ng.ILogService,
				public $q: ng.IQService,
				public $timeout: ng.ITimeoutService,
				public $firebaseAuth,
				public userService: alcomy.user.IUserService) { }



		// Registers a new user in firebase
		registerUser(newUserObj){
			var credentials = {
				email: newUserObj.email,
				password: newUserObj.password
			};
			authObj.$createUser(credentials)
				.then(function (userData) {
					if (userData) {
						return authObj.$authWithPassword(credentials)
					}
				})
				.then(function (authData) {
					firebaseRoot.child('users').child(authData.uid).set({
						firstName: newUserObj.firstName,
						lastName: newUserObj.lastName,
						email: newUserObj.email
					})
				})
				.catch(function (err) {
					console.warn("Error: " + err)
				});
		}

		// Logs a user in given their email and password and retrieve their info
		login(email, password) {

			return this.$firebaseAuth().signInWithEmailAndPassword(email, password)
				.then(authData => {
					if(authData){
						return this.userService.setCurrentUser(authData.uid)
					}
				})
				.catch(err => {
					this.$log.error('Error: ' + err)
					return err;
				});
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

};

