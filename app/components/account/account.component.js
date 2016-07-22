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

    var user = {
      firstName: "Ilija",
      lastName: "Vrajich",
      email: "vrajich1@gmail.com",
      password: "12345"
    }

    var company = {
      name: "Alcomy"
    }

    function createAccount(){
      accountService.createAccount(user, company);
    }

  }
})();