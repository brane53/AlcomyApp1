/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../shared/new-resident-dialog/new-resident-dialog.controller.ts" />
/// <reference path="../shared/residents.ts" />


namespace alcomy {
	export namespace residents {
		'use strict';


		class ResidentListController {
			static $inject: Array<string> = ['$log', '$mdDialog', 'residentsService'];
			residents: Array<any>;


			/* @ngInject */
			constructor(private $log, 
									private $mdDialog: ng.material.IDialogService, 
									private residentsService) {

			}

			$onInit() {
				this.residentsService.getResidents().then(residents => {
					this.residents = residents;
				});
			}

			openResidentDialog(event) {
				this.$mdDialog.show({
					templateUrl: './app/components/residents/shared/new-resident-dialog/new-resident-dialog.html',
					controller: Residents.NewResidentDialogController,
					targetEvent: event,
					controllerAs: '$ctrl',
					parent: angular.element(document.body),
					clickOutsideToClose: true,
					fullscreen: true
				})
				.then(resident => {
					return this.residentsService.createResident(resident)
						.then(() => {
							this.$log.info('New Resident Created!');
							this.$log.info(resident);
						})
						.catch(err => {
							this.$log.warn('Error with OpenResidentDialog');
							this.$log.warn(err);
						});
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