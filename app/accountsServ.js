angular
  .module('PbWs1App')
  .factory('AccountsServ', AccountsServ);

AccountsServ.$inject = ['Restangular'];

function AccountsServ (Restangular) {
  var theServ = {context: { accounts: [] }};

  theServ.getContext = function () {
    return theServ.context;
  };

  theServ.loadAccounts = function () {
    return Restangular.all('accounts').getList().then(function (response) {
      theServ.context.accounts = response;
    });
  };

  theServ.getAccounts = function () { return theServ.context.accounts; }
  theServ.getAccount = function () { return theServ.context.account; }

  theServ.setCurrentBlankAccount = function () {
    theServ.context.account = {id: '', name: '', invoices: []};
  };

  theServ.setCurrentAccount = function (id) {
    var filtered = theServ.context.accounts.filter(function(account) {
      return account.id === id;
    });
    if (filtered.length) {
      theServ.context.account = filtered[0];
    } else {
      theServ.setCurrentBlankAccount();
    }
  }

  theServ.saveAccount = function () {
    var account = theServ.context.account;
    if (account.id === '') { //create new
      return Restangular.all('accounts').post(account);
    } else { //update
      return Restangular.allUrl('accounts/' + account.id).post(account);
    }
  };

  theServ.delete = function (accountId) {
    return Restangular.one("accounts", accountId).remove();
  };

  theServ.updateCurrentAccount = function (accountId) {
    theServ.loadAccounts().then(function (response) {
      theServ.setCurrentAccount(accountId);
    });
  };

  return theServ;
}
