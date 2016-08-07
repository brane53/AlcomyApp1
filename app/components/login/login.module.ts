/// <reference path="../../../typings/index.d.ts" />

namespace alcomy {
	export namespace login {
	'use strict';
	
	angular
		.module('login', [
			'firebase'
		])
		.run(run);

		function run(){
			console.log("Login Module Instantiated")
		}
	}
};