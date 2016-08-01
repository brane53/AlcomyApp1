/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/user.service.ts" />

declare var firebase;
namespace alcomy {
  export namespace account {
    'use strict';

    class accountService {
      static $inject: Array<string> = ['$log', '$firebaseAuth', 'userService'];
      private fbRoot = firebase.database().ref();

      constructor($log: ng.ILogService,
        $firebaseAuth,
        userService: alcomy.user.IUserService) { }

      createAccount(user, accountInfo) {

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

  }
};