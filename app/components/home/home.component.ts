/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../user/shared/user.ts" />


namespace alcomy {
	'use strict';
	export namespace home {

		let routeConfig: Array<angular.RouteDefinition> = [
			{
				path: '/dashboard/...',
				name: 'Dashboard',
				component: 'dashboard',
				useAsDefault: true
			},
			{
				path: '/residents/...',
				name: 'Residents',
				component: 'residents'
			},
			{
				path: '/residents/:residentId/...',
				name: 'ResidentDetail',
				component: 'residentDetail'
			}
		];


		$canActivate.$inject = ['$nextInstruction', '$prevInstruction', '$firebaseAuth', '$rootRouter'];
		/* @ngInject */
		function $canActivate($nextInstruction, $prevInstruction, $firebaseAuth, $rootRouter) {
			console.log('$canActivate: ', arguments);

			return $firebaseAuth().$requireSignIn()
				.then(function (state) {
					console.log('You can access the home component');
					return state;
				})
				.catch(function (err) {
					console.log('Something is happening')
					console.log('Auth Error: ', err);
					$rootRouter.navigate(['Login']);
				});
		}

		class HomeController {
			static $inject = ['$mdSidenav', '$firebaseAuth', 'userService',];
			user: alcomy.user.IUser;

			/* @ngInject */
			constructor(public $mdSidenav: angular.material.ISidenavService,
				public $firebaseAuth,
				public userService: alcomy.user.IUserService) { }

			// TODO Resolve that the current user was retrieved before loading the
			// route

			$routerOnActivate() {

				// return this.userService.getCurrentUser()
				// 	.then(user => {
				// 		this.user = user;
				// 	})
				// 	.catch(function (err) {
				// 		console.error('Error MainToolbarController: ' + err);
				// 	});
			};



			$onInit() {
				this.userService.getCurrentUser().then(user => {
					this.user = user;
				})
					.catch(err => {
						console.error('Error HomeController: ' + err);
					});
			}

			toggleMobileSidenav() {
				this.$mdSidenav('mobile-sidenav').toggle();
			}

		}



		angular
			.module('home')
			.component('home', {
				templateUrl: './app/components/home/home.component.html',
				controller: HomeController,
				bindings: {
					$router: '<'
				},
				$canActivate: $canActivate,
				$routeConfig: routeConfig
			});

	}

};