(function () {
	'use strict';

	angular
		.module('tasks')
		.component('tasks', {
			templateUrl: './app/components/dashboard/tasks/tasks.component.html',
			controller: TasksController,
			transclude: false


		});

	TasksController.$inject = [];

	/* @ngInject */
	function TasksController() {
		var vm = this;
		vm.title = 'Tasks';


	}


})();