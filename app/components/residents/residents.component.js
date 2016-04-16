(function () {
	'use strict';

	angular
		.module('residents')
		.component('residents', {
			templateUrl: './app/components/residents/residents.component.html',
			controller: ResidentsController,
			controllerAs: '$ctrl', // default is $ctrl
			transclude: false,
			$routeConfig: [
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
			]

		});

	ResidentsController.$inject = [];

	/* @ngInject */
	function ResidentsController() {
		var vm = this;


	}


})();