(function () {
	'use strict';
	
	angular
		.module('verticalToolbar')
		.component('asVerticalToolbar', {
			templateUrl: './app/components/shared/vertical-toolbar/vertical-toolbar.component.html',
			controller: VerticalToolbarController,
			transclude: true
			
			
		});
	
	function VerticalToolbarController() {
		var vm = this;
		

		
	}
	
	
})();