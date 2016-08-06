/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	export namespace security {
		'use strict';

		class LogoutController {
			static $inject = ['$firebaseAuth', '$rootRouter'];
			/* @ngInject */
			constructor(public $firebaseAuth, public $rootRouter) {
				this.$firebaseAuth().$signOut();
				this.$rootRouter.navigate(['Login']);
			}
		}

		angular
			.module('security')
			.component('logout', {
				controller: LogoutController,
			});
	}
};