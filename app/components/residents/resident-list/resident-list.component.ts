(function () {
	'use strict';
	
	angular
		.module('residents')
		.component('residentList', {
			templateUrl: './app/components/residents/resident-list/resident-list.component.html',
			controller: ResidentListController,
			transclude: false
			
		});
	
	ResidentListController.$inject = ['residentsService'];
	/* @ngInject */
	function ResidentListController(residentsService) {
		var vm = this;
		
		
		//vm.residents = residentsService.getResidents();
		residentsService.getResidents().then(function(residents){
			vm.residents = residents;
		});
		
	}
	
	
})();