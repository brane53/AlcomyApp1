(function () {
  'use strict';

  angular
    .module('facility')
    .service('facilityService', facilityService);

  facilityService.$inject = ['$log'];
  function facilityService($log) {

    var self = this;
    var fbRoot = firebase.database().ref();

    self.createFacility = createFacility;

    ////////////////

    function createFacility(data) {

      var facilityData = {
        name: data.name
      };

      return fbRoot.child('facilities').push(facilityData)
        .then(function (data) {
          return data;
        })
        .catch(function (err) {
          $log.error('Error: ' + err);
        });
    }
  }
})();