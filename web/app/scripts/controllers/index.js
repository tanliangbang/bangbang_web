'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('IndexCtrl',['$scope','$http','$rootScope', function ($scope,$http,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [];


    $rootScope.isActive = 1;
    $scope.name = 'jsRes';
    $http.get("/api/res/getResContentList",{params: {name:"jsRes"}}).success(function(data,status,headers,congfig){
      $scope.newsList = data.content;

    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });;

  }]);
