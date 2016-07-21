(function () {
	'use strict';

	angular
		.module('security')
		.component('logout', {
			controller: LogoutController,

		});

	LogoutController.$inject = ['$firebaseAuth', '$rootRouter'];
	/* @ngInject */
	function LogoutController($firebaseAuth, $rootRouter) {
		$firebaseAuth().$signOut();
		$rootRouter.navigate(['Login']);
	}


})();