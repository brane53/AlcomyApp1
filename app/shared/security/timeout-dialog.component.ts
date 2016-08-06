/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	export namespace security {
		'use strict';

		class TimeoutDialogController {
			static $inject = ['$mdDialog'];
			
			/* @ngInject */
			constructor(public $mdDialog) { }

		}

		angular
			.module('security')
			.component('timeout-dialog', {
				controller: TimeoutDialogController

			});
	}
};