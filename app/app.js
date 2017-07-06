'use strict';
var PbWs1App = angular.module('PbWs1App', ['ui.router', 'restangular' ]);

angular
  .module('PbWs1App')
  .config(config)
  .controller('AppCtrl', AppCtrl);

function config($stateProvider, $urlRouterProvider, RestangularProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html'
    })
    .state('accounts', {
      url: '/accounts',
      templateUrl: 'accounts.html'
    })
    .state('accounts.list', {
      url: '/list',
      templateUrl: 'accounts_list.html'
    })
    .state('accounts.new', {
      url: '/new',
      templateUrl: 'accounts_edit.html'
    })
    .state('accounts.edit', {
      url: '/edit',
      templateUrl: 'accounts_edit.html'
    })
    .state('accounts.invoices', {
      url: '/invoices',
      templateUrl: 'accounts_invoices.html'
    })
    .state('accounts.invoices.list', {
      url: '/list',
      templateUrl: 'accounts_invoice_list.html'
    })
    .state('accounts.invoices.new', {
      url: '/new',
      templateUrl: 'accounts_invoice_edit.html'
    })
    .state('accounts.invoices.edit', {
      url: '/edit',
      templateUrl: 'accounts_invoice_edit.html'
    });

  RestangularProvider.setBaseUrl('http://thinkful-pb-1.getsandbox.com/');
}

function AppCtrl () {
  //TODO
}
