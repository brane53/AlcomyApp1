/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
	export namespace tasks {
		'use strict';


		class TasksController {
			static $inject = [];
			title: string;
			/* @ngInject */
			constructor() {
				this.title = 'Tasks';
			}

		}

		angular
			.module('tasks')
			.component('tasks', {
				templateUrl: './app/components/dashboard/tasks/tasks.component.html',
				controller: TasksController,
				transclude: false
			});

	}
};