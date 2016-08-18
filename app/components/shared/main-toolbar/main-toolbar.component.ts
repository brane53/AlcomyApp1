/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/shared/user.ts" />

namespace alcomy {
	export namespace shared {
		'use strict';

		class MainToolbarController {

			static $inject = ['$log', '$mdSidenav', '$rootRouter', '$firebaseAuth', 'userService'];
			user: Object;

			/* @ngInject */
			constructor(
				public $log: ng.ILogService,
				public $mdSidenav: angular.material.ISidenavService,
				public $rootRouter,
				public $firebaseAuth,
				public userService: alcomy.user.IUserService) { }


			$onInit() {
				this.userService.getCurrentUser()
				.then((user) => {
					this.user = user;
				
				})
				.catch(() => {
					this.$log.warn('Main Toolbar Component: Could not load user data');
				});
			}

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