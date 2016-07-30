(function () {
	'use strict';

	angular
		.module('alcomyApp')
		.constant('uiConfig', uiConfig);


	var uiConfig = {
		buttons: {
			expandMobileSidenav: {
				buttonText: 'Expand Mobile Sidenav',
				label: 'Expand',
				ariaLabel: 'Expand Mobile Sidenav',
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
				icon: 'local-hospital'
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
			messageCenter: "Message Center",
			userProfile: "User Profile"
		}
	};


})();