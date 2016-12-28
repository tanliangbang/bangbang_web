'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl',
        controllerAs: 'index'
      })
      .when('/index', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl',
        controllerAs: 'index'
      })
      .when('/jsRes', {
        templateUrl: 'views/article/jsRes.html',
        controller: 'jsResCtrl',
        controllerAs: 'jsRes'
      })
      .when('/articleDetail', {
        templateUrl: 'views/article/articleDetail.html',
        controller: 'articleDetailCtrl',
        controllerAs: 'articleDetail'
      })
      .when('/htmlRes', {
        templateUrl: 'views/article/htmlRes.html',
        controller: 'htmlResCtrl',
        controllerAs: 'htmlRes'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode({enabled: true, requireBase: false})
  });
