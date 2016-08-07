/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	export namespace security {
		'use strict';

		angular
			.module('security', [
				'login'
			])
			.run(run);

			function run(){
				console.log("Securty Module - run block is running")
			}

	}
};