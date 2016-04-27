(function() {
'use strict';

    angular
        .module('alcomyApp')
        .constant('uiConfig', uiConfig);

        
        var uiConfig = {
            button: {
                addResident: {
                    buttonText: 'Add Resident',
                    ariaLabel: 'Add Resident',
                    icon: 'add'
                },
                medications: {
                    buttonText: '',
                    ariaLabel: 'Medications Button',
                    icon: ''
                }
                
            }
        }
        
        
})();