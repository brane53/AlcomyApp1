(function () {
  'use strict';
  angular
    .module('account')
    .component('account', {
      templateUrl: './app/components/account/account.component.html',
      controller: AccountController
    });

  AccountController.$inject = ['$log','accountService'];

  /* @ngInject */
  function AccountController($log, accountService) {
    var vm = this;

    vm.createAccount = createAccount;

    function createAccount(){
      accountService.createAccount();
    }

  }
})();