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
      firstName: 'ilija',
      lastName: 'vrajich',
      photoUrl: '',
      accountId: '',
      email: 'vrajich1@gmail.com',
      password: '123456'
    };

    var accountInfo = {
      companyName: 'Alcomy'
    };

    function createAccount(){
      accountService.createAccount(user, accountInfo);
    }

  }
})();