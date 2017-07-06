angular
  .module('PbWs1App')
  .controller('AccountsCtrl', AccountsCtrl);

AccountsCtrl.$inject = ['AccountsServ', '$state'];

function AccountsCtrl (AccountsServ, $state) {

  var vm = this;
  //context ac allows us to share data via services
  vm.ac = AccountsServ.getContext();

  function loadAccounts() {
    AccountsServ.loadAccounts();
  }
  // load accounts when this file is loaded
  loadAccounts();

  vm.addNew = function () {
    AccountsServ.setCurrentBlankAccount();
    $state.go('accounts.new');
  };

  vm.edit = function (accountId) {
    AccountsServ.setCurrentAccount(accountId);
    $state.go('accounts.edit');
  };

  vm.save = function () {
    AccountsServ.saveAccount().then(function (response) {
      loadAccounts();
      $state.go('accounts.list');
    });
  };

  vm.delete = function (accountId) {
    AccountsServ.delete(accountId).then(function (response) {
      loadAccounts();
    });
  };

  vm.invoices = function (accountId) {
    AccountsServ.setCurrentAccount(accountId);
    $state.go('accounts.invoices.list');
  }

}
