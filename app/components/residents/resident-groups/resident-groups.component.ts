/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy {
  export namespace residents {

    /**
     * ResidentGroupsController
     */
    class ResidentGroupsController {
      static $inject = ['$log'];
      constructor($log) {
        
      }
    }



    angular
      .module('residents')
      .component('residentGroups', {
        templateUrl: './app/components/residents/resident-groups/resident-groups.component.html',
				controller: ResidentGroupsController
      });
  }
}