/// <reference path="../../../../typings/index.d.ts" />

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
					templateUrl: '../shared/new-resident-dialog/new-resident-dialog.html',
					controller: function() {
						let vm = this;
						vm.resident = {
							firstName: '',
							lastName: '',
							gender: '',
							dateOfBirth: null
						};

						this.createNewResident = createNewResident;

						function createNewResident(resident: Object){

						}
					},
					controllerAs: '$ctrl',
					parent: angular.element(document.body),
					clickOutsideToClose: false
				})
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