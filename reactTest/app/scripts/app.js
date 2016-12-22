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

      .when('/resAdd', {
        templateUrl: 'views/res/resAdd.html',
        controller: 'ResAddCtrl',
        controllerAs: 'resAdd'
      })
      .when('/resContentList/:type', {
        templateUrl: 'views/res/resContentList.html',
        controller: 'ResContentListCtrl',
        controllerAs: 'resContentList'
      })

      .when('/resAddContent', {
        templateUrl: 'views/res/resAddContent.html',
        controller: 'ResAddContentCtrl',
        controllerAs: 'resAddContent'
      })





      .otherwise({
        redirectTo: '/'
      });
     $locationProvider.html5Mode(true);
  });




