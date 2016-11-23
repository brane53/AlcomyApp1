/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../user/shared/user.ts" />
declare var firebase;

namespace alcomy {
  export namespace account {
    'use strict';

    export interface IAccountService {
      // Creates an account and a new user within that account
      createAccount(user: alcomy.user.IUser);
    }


    class accountService {
      static $inject: Array<string> = ['$log', '$firebaseAuth', 'userService'];
      private fbRoot = firebase.database().ref();

      constructor(
        public $log: ng.ILogService,
        public $firebaseAuth,
        public userService: alcomy.user.IUserService) { }

      // Creates an account and a new user within that account
      createAccount(user, accountInfo): ng.IPromise<any> {

        return this.userService.createUser(user)
          .then(userId => {

            this.$log.info('User Id: ' + userId);

            let accountRef = this.fbRoot.child('accounts').push(accountInfo);

            return accountRef.child('users').child(userId).set(true);
             
          })
          .catch(err => {
            this.$log.warn('AccountService Error: ');
            this.$log.warn(err);
          });

      }
    }

    angular
      .module('account')
      .service('accountService', accountService);

  }
};