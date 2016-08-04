/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../user/shared/user.ts" />

declare var firebase;

namespace alcomy {
	'use strict';
	export namespace login {

		class LoginController {

			// Firebase Root
			private fbRoot = firebase.database().ref();

			static $inject = ['$log', '$location', '$firebaseAuth', 'userService'];
			newUserObj: Object;
			isRegister: Boolean;
			isLoggedIn: Boolean;

			/* @ngInject */
			constructor(public $log: ng.ILogService,
								public $location: ng.ILocationService,
								public $firebaseAuth,
								public userService) {

				this.newUserObj = {
					firstName: null,
					lastName: null,
					email: null,
					password: null
				};
				this.isRegister = null;  // TODO this needs to be implemented correctly
				this.isLoggedIn = null; //$firebaseAuth().isLoggedIn;    // TODO this needs to
			}


			// TODO these need to be put into a service

			// beimplemented correctly


			$onInit() {
				console.log('url: ', this.$location.path());
				if (this.$location.path() === '/login') {
					this.isRegister = false;
				} else if (this.$location.path() === '/register') {
					this.isRegister = true;
				}

				console.log('$router: ', $router);
				console.log('isLoggedIn', this.$firebaseAuth().isLoggedIn);
				this.isLoggedIn = this.$firebaseAuth().isLoggedIn;

			}

			$routerOnActivate() {
				console.log('Auth State: ', this.$firebaseAuth().$waitForSignIn());
				return this.$firebaseAuth().$waitForSignIn().then(state => {
					console.log('state: ', state);
					this.isLoggedIn = !!state;
				});
			}

			$routerCanDeactivate() {
				return this.isLoggedIn;
			}

			// LOGIN

			// TODO make this more secure. implement safeguards
			// TODO create route redirect if use is logged in
			// Calls the login function from $firebaseAuth
			login(email, password) {

				this.$log.info('Email: ' + email + 'Password' + password);

				// $firebaseAuth().$signInWithEmailAndPassword(credentials)
				this.$firebaseAuth().$signInWithEmailAndPassword(email, password)
					.then(authData => {
						if (authData) {
							console.log('User id: ', authData.uid);
							/*userService.setCurrentUser(authData.uid);*/
							this.isLoggedIn = true;
							this.$router.navigate(['Home']);
						}
					})
					.catch(err => {
						console.warn('Error: ' + err);
					});
			}

			// REGISTER
			registerNewUser(newUserObj) {

				// Credientials 
				var credentials = {
					email: newUserObj.email,
					password: newUserObj.password
				};

				// Create user with given credentials
				this.$firebaseAuth().$createUserWithEmailAndPassword(credentials)
					.then(userData => {
						if (userData) {
							return this.$firebaseAuth().$signInWithEmailAndPassword(credentials);
						}
					})
					.then(authData => {
						return this.fbRoot.child('users').child(authData.uid).set({
							firstName: newUserObj.firstName,
							lastName: newUserObj.lastName,
							email: newUserObj.email
						})
							.then(data => {
								console.log('Data: ', data);
								this.isLoggedIn = true;
								this.$router.navigate(['Home']);
							});

					})
					.catch(err => {
						console.warn("Error: " + err);
					});
			}

			// LOGOUT
			/*FIX
			* if you have multiple tabs open and the Home component is already
			* loaded you can continue to navigate through the app once you logout.
			*
			* */
			logout() {
				this.$firebaseAuth().$signOut();
				this.isRegister = true;
				this.$firebaseAuth().$waitForSignIn()
					.then(state => {
						this.isLoggedIn = !!state;
					});
			}

			goToRegister() {
				this.$location.path('/register');
				/*vm.$router.navigate(['Register']);*/
				this.isRegister = true;
			}

		}

		angular
			.module('login')
			.component('login', {
				templateUrl: './app/components/login/login.component.html',
				controller: LoginController,
				bindings: {
					$router: '<'
				}
			});

	}
};