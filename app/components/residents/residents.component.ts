/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	export namespace residents {
		'use strict';

		let routeConfig: ng.RouteDefinition = [
					{
						path: '/',
						name: 'ResidentList',
						component: 'residentList',
						useAsDefault: true
					},
					{
						path: '/:residentId',
						name: 'ResidentDetail',
						component: 'residentDetail'
					}
				];


		
		class ResidentsController {
			static $inject = [];

			/* @ngInject */
			constructor() {}
		
		}

		angular
			.module('residents')
			.component('residents', {
				templateUrl: './app/components/residents/residents.component.html',
				controller: ResidentsController,
				transclude: false,
				$routeConfig: routeConfig
			});

	}
};