/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	'use strict';
	export namespace dashboard {

		let routeConfig: angular.RouteDefinition = [
					{
						path: '/tasks',
						nane: 'Tasks',
						component: 'tasks',
						useAsDefault: true
					}
				]



		class DashboardController {

		static $inject = [];

		/* @ngInject */
		constructor() {}
		

		}
		

		angular
			.module('dashboard')
			.component('dashboard', {
				templateUrl: './app/components/dashboard/dashboard.component.html',
				controller: DashboardController,
				transclude: false,
				$routeConfig: routeConfig

			});

	}
};