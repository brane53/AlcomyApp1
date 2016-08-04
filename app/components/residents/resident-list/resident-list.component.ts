/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
	export namespace residents {
		'use strict';


		class ResidentListController {
			static $inject: Array<string> = ['residentsService'];
			/* @ngInject */
			constructor(public residentsService) {
				this.init();
			 }

			// TODO: Implement $onInit() to get the residents from the residents service.

			// TODO CHECK: Don't know if this is correct 
			init(){
				this.residentsService.getResidents().then(function (residents) {

				});
			}
			

		}

		angular
		.module('residents')
		.component('residentList', {
			templateUrl: './app/components/residents/resident-list/resident-list.component.html',
			controller: ResidentListController,
			transclude: false
		});
}
};