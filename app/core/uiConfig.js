(function () {
	'use strict';

	angular
		.module('alcomyApp')
		.constant('uiConfig', uiConfig);


	var uiConfig = {
		button: {
			expandSubNav: {
				buttonText: 'Expand Sub Nav',
				label: 'Expand',
				ariaLabel: 'Expand Sub Navigation',
				icon: 'menu'
			},
			addResident: {
				buttonText: 'Add Resident',
				label: "Add Resident",
				ariaLabel: 'Add Resident',
				icon: 'add'
			},
			medications: {
				buttonText: '',
				label: 'Medications',
				ariaLabel: 'Medications Button',
				icon: ''
			},
			addMedication: {
				buttonText: 'Add Medication',
				label: 'Add Medication',
				ariaLabel: 'Medications Button',
				icon: ''
			}

		},
		modules: {
			dashboard: "Dashboard",
			residents: "Residents",
			staff: "Staff",
			settings: "Settings",
			messageCenter: "Message Center"
		}
	};


})();