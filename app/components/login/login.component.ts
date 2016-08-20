/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../user/shared/user.ts" />

declare var firebase;

namespace alcomy {
	'use strict';
	export namespace login {

		class LoginController {
			static $inject = ['$log', '$location', '$firebaseAuth', 'authService', 'userService'];
			// Firebase Root
			private fbRoot = firebase.database().ref();

			newUser: alcomy.user.IUser;
			register: Boolean;
			isLoggedIn: Boolean;
			$router: ng.Router;

			/* @ngInject */
			constructor(
				public $log: ng.ILogService,
				public $location: ng.ILocationService,
				public $firebaseAuth,
				public authService,
				public userService) {

				this.$log.info('Login Component Instanciated');
				this.newUser = {
					firstName: null,
					lastName: null,
					email: null,
					password: null
				};
				this.register = false;  // TODO this needs to be implemented correctly
				this.isLoggedIn = false; //$firebaseAuth().isLoggedIn;    // TODO this needs to
			}


			// TODO these need to be put into a service

			// beimplemented correctly


			$onInit() {
				console.log('url: ', this.$location.path());
				if (this.$location.path() === '/login') {
					this.register = false;
				} else if (this.$location.path() === '/register') {
					this.register = true;
				}
				this.isLoggedIn = this.$firebaseAuth().isLoggedIn;

				console.log('$router: ', this.$router);
				console.log('isLoggedIn', this.$firebaseAuth().isLoggedIn);

			}

			$routerOnActivate() {
				// console.log('Auth State: ', this.$firebaseAuth().$waitForSignIn());
				// return this.$firebaseAuth().$waitForSignIn().then(state => {
				// 	console.log('state: ', state);
				// 	this.isLoggedIn = !!state;
				// });
			}

			$routerCanDeactivate() {
				return this.isLoggedIn;
			}

			// LOGIN

			// TODO make this more secure. implement safeguards
			// TODO create route redirect if use is logged in
			// Calls the login function from $firebaseAuth
			login(email: string, password: string) {
					this.$log.info(`Email: ${email} Password: ${password}`);
					this.authService.login(email, password)
						.then(() => {
							this.isLoggedIn = this.$firebaseAuth().isLoggedIn;
							this.$router.navigate(['Home']);
						})
						.catch(err => {
							console.warn('Error: ' + err);
						});

			}

			// REGISTER
			registerNewUser(newUser: alcomy.user.IUser) {
				this.userService.createUser(newUser)
					.then(() => {
						this.isLoggedIn = true;
						this.register = false;
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
				this.register = true;
				this.$firebaseAuth().$waitForSignIn()
					.then(state => {
						this.isLoggedIn = !!state;
					});
			}

			goToRegister() {
				//this.$location.path('/register');
				this.$router.navigate(['NewAccount']);
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