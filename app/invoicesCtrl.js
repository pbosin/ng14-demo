angular
  .module('PbWs1App')
  .controller('InvoicesCtrl', InvoicesCtrl);

InvoicesCtrl.$inject = ['InvoicesServ', 'AccountsServ', '$state'];

function InvoicesCtrl (InvoicesServ, AccountsServ, $state) {
  var vm = this;

  //vm.invoices = InvoicesServ.getInvoices();

  vm.addNew = function (accountId) {
    vm.invoice = InvoicesServ.getBlankInvoice(accountId);
    $state.go('accounts.invoices.new');
  };

  vm.edit = function (accountId, invoiceId) {
    vm.invoice = InvoicesServ.findInvoiceById(accountId, invoiceId);
    $state.go('accounts.invoices.edit');
  };

  vm.save = function () {
    InvoicesServ.save(vm.invoice).then(function (response) {
      AccountsServ.updateCurrentAccount(vm.invoice.accountId);
      $state.go('accounts.invoices.list');
    });
  };

  vm.delete = function (accountId, invoiceId) {
    InvoicesServ.delete(accountId, invoiceId).then(function (response) {
      AccountsServ.updateCurrentAccount(accountId);
    });
  };

}
