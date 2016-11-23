/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	export namespace residents {
		'use strict';

		let routeConfig: Array<angular.RouteDefinition> = [
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
					},
					{
						path: '/resident-groups',
						name: 'ResidentGroups',
						component: 'residentGroups'
					},
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