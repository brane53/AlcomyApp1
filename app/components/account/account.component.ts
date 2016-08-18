/// <reference path="../../../typings/index.d.ts" />
/// <reference path="shared/account.ts" />
/// <reference path="../user/shared/user.ts" />

namespace alcomy {
  export namespace account {
  'use strict';

    /* @ngInject */
    class AccountController {
      static $inject: Array<string> = ['$log', 'accountService'];

      user: alcomy.user.IUser;
      company: alcomy.account.ICompany;
      $router: ng.Router;

      constructor(public $log: ng.ILogService,
        public accountService: alcomy.account.IAccountService) { }


      public createAccount(user: alcomy.user.IUser, company: alcomy.account.ICompany): void {
        this.accountService.createAccount(user, company)
        .then(() => {
          this.$router.navigate(['Home']);
        });
      }

    }



    angular
      .module('account')
      .component('account', {
        templateUrl: './app/components/account/account.component.html',
        controller: AccountController,
        bindings: {
          $router: '<'
        }
      });

  }
};