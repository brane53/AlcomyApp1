/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
	export namespace shared {
		'use strict';

		
		class VerticalToolbarController {

			constructor() {}

		}

		angular
			.module('verticalToolbar')
			.component('asVerticalToolbar', {
				templateUrl: './app/components/shared/vertical-toolbar/vertical-toolbar.component.html',
				controller: VerticalToolbarController,
				transclude: true
			});
	}
};