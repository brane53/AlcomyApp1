/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
  export namespace residents {
    
    /**
     * ResidentDetailsController
     */
    class ResidentDetailsController {
      constructor(parameters) {
        
      }
    }


    angular
      .module('residents')
      .component('residentDetails', {
        templateUrl: './app/components/residents/resident-details/resident-details.component.html',
        controller: ResidentDetailsController
      });
  }
}


