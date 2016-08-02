/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="facility.ts" />

declare var firebase;
namespace alcomy {
  'use strict';
  export namespace facility {
    
    class facilityService {
      static $inject = ['$log'];
      private fbRoot = firebase.database().ref();

      constructor(public $log: ng.ILogService) {}

      createFacility(facility: alcomy.facility.IFacility) {

        return this.fbRoot.child('facilities').push(facility)
          .then(data => data)
          .catch(err => {
            return this.$log.error('Error: ' + err);
          });
      }
    }


    angular
      .module('facility')
      .service('facilityService', facilityService);
  }
};