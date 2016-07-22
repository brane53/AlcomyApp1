(function () {
  'use strict';

  angular
    .module('account')
    .service('accountService', accountService);

  accountService.$inject = ['$log', '$firebaseAuth', 'userService', 'companyService'];
  function accountService($log, $firebaseAuth, userService, companyService) {

    var self = this;
    var fbRoot = firebase.database().ref();

    self.createAccount = createAccount;

    ////////////////

    function createAccount(user, company) {


      userService.createUser(user)
        .then(function (userData) {

          companyService.createCompany(company)
            .then(function (companyData) {

              var accountData = {
                userId: userData.uid;
              }

              $log.info(fbRoot);
              fbRoot.child('accounts').push(accountData)
                .then(function (data) {
                  $log.info(data);
                })
                .catch(function (err) {
                  $log.warn("Error: " + err);
                });
            });



          fbRoot.child('accounts').push(accountData)
            .then(function (data) {
              $log.info(data);
            });
        })
        .catch(function (err) {
          $log.warn("Error: " + err);
        });



    }


  }
})();