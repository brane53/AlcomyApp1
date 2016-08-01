/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../shared/interfaces/account.ts" />


namespace alcomy {
  export namespace account {
  'use strict';

    /* @ngInject */
    class AccountController {
      static $inject: Array<string> = ['$log', 'accountService'];

      user: alcomy.account.IUser;
      company: alcomy.account.ICompany;

      constructor(public $log: ng.ILogService,
        public accountService: alcomy.account.IAccountService) { }


      public createAccount(user: alcomy.account.IUser, company: alcomy.account.ICompany): void {
        this.accountService.createAccount(user, company);
      }

    }



    angular
      .module('account')
      .component('account', {
        templateUrl: './app/components/account/account.component.html',
        controller: AccountController
      });

  }
};