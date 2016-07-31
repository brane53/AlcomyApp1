/// <reference path="../../../../typings/index.d.ts" />

namespace alcomy.account {
  'use strict';

class accountService {
  static $inject: Array<string> = ['$log', '$firebaseAuth', 'userService']

  constructor($log: ng.ILogService, 
              $firebaseAuth, 
              userService: alcomy.u) {}

}
  

  accountService.$inject = ['$log', '$firebaseAuth', 'userService'];
  function accountService2($log, $firebaseAuth, userService) {

    var self = this;
    var fbRoot = firebase.database().ref();

    self.createAccount = createAccount;

    ////////////////

    function createAccount(user, accountInfo) {

      return userService.createUser(user)
        .then(function (userId) {

          $log.info('User Id: ' + userId);

          var accountRef = fbRoot.child('accounts').push(accountInfo);
          
          return accountRef.child('users').child(userId).set(true)
            .then(function (data) {
              $log.info('Account Data: ' + data);
            })
            .catch(function (err) {
              $log.warn('Error: ' + err);
            });
        })
        .catch(function (err) {
          $log.warn('AccountService Error: ' + err);
        });

    }

  }



  angular
    .module('account')
    .service('accountService', accountService);
};