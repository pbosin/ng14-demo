angular
  .module('PbWs1App')
  .factory('InvoicesServ', InvoicesServ);

InvoicesServ.$inject = ['Restangular', 'AccountsServ'];

function InvoicesServ (Restangular, AccountsServ) {
  var theServ = {};

  theServ.getBlankInvoice = function (accountId) {
    return {id:'', name:'', accountId: accountId, amount:0, due:0 };
  };

  theServ.save = function (invoice) {
    if (invoice.id === '') { //create new
      return Restangular.one('accounts', invoice.accountId).all('invoices').post(invoice);
    } else { //update
      //return Restangular.one('accounts', invoice.accountId).one('invoices', invoice.id).put(invoice);
      return Restangular.allUrl('accounts/' + invoice.accountId + '/invoices/' + invoice.id +'/').post(invoice);
    }
  };

  theServ.delete = function (accountId, invoiceId) {
    return Restangular.one("accounts", accountId).one('invoices', invoiceId).remove();
  };

  theServ.findInvoiceById = function (accountId, invoiceId) {
    var account = AccountsServ.getAccount();
    var invoices = account.invoices.filter(function (invoice) {
      return Number(invoice.id) === Number(invoiceId);
    });
    return (invoices.length) ? invoices[0] : theServ.getBlankInvoice();
  }

  theServ.getInvoices = function () {
    //TODO: get all invoices for all or filtered accounts for invoices tab
  };

  return theServ;
}
