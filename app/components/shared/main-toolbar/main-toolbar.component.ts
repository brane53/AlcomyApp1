/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/shared/user.ts" />

namespace alcomy {
	export namespace shared {
		'use strict';

		class MainToolbarController {

			static $inject = ['$mdSidenav', '$rootRouter', '$firebaseAuth', 'userService'];
			user: string;

			/* @ngInject */
			constructor(
				public $mdSidenav: angular.material.ISidenavService,
				public $rootRouter,
				public $firebaseAuth,
				public userService: alcomy.user.IUserService) { }


			$onInit() {
				this.userService.getCurrentUser().then(function (user) {
					this.user = user;
				}).catch(function (err) {
					console.error('Error MainToolbarController: ' + err);
				});
			};

			logout() {
				this.$firebaseAuth().$signOut();
				this.$rootRouter.navigate(['Login']);
			}

			toggleMobileSidenav() {
				this.$mdSidenav('mobile-sidenav').toggle();
			}

		}

		angular
			.module('mainToolbar')
			.component('asMainToolbar', {
				templateUrl: './app/components/shared/main-toolbar/main-toolbar.component.html',
				controller: MainToolbarController

			});
	}
};