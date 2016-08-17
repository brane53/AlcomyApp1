/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
	export namespace residents {
		'use strict';


		class ResidentListController {
			static $inject: Array<string> = ['residentsService'];
			residents: Array<any>;


			/* @ngInject */
			constructor(public residentsService) {
				
			 }

			$onInit(){
				this.residentsService.getResidents().then(residents => {
					this.residents = residents;
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