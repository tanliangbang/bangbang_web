'use strict';

/**
 * @ngdoc overview
 * @name reactTestApp
 * @description
 * # reactTestApp
 *
 * Main module of the application.
 */
angular
  .module('reactTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/addArticle', {
        templateUrl: 'views/article/addArticle.html',
        controller: 'AddArticleCtrl',
        controllerAs: 'addArticle'
      })
      .otherwise({
        redirectTo: '/'
      });
     $locationProvider.html5Mode(true);
  });




