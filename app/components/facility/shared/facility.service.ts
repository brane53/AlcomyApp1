/// <reference path="../../../../typings/index.d.ts" />

declare var firebase;
namespace alcomy {
  'use strict';
  export namespace facility {
    
    class facilityService {
      static $inject = ['$log'];
      private fbRoot = firebase.database().ref();

      constructor($log) {}

      createFacility(data) {

        let facilityData = {
          name: data.name
        };

        return this.fbRoot.child('facilities').push(facilityData)
          .then(function (data) {
            return data;
          })
          .catch(function (err) {
            this.$log.error('Error: ' + err);
          });
      }
    }


    angular
      .module('facility')
      .service('facilityService', facilityService);
  }
};