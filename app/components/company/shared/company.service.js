(function() {
'use strict';

  angular
    .module('company')
    .service('companyService', companyService);

  companyService.$inject = [''];
  function companyService() {

    var self = this;
    var fbRoot = firebase.database().ref();

    self.createCompany = createCompany;

    
    ////////////////

    function createCompany(data) {
      
      var companyData = {
        name: data.name
      }

      fbRoot.child(companies).push(companyData)
      .then(function(data){
        return data;
      })
    }
  }
})();