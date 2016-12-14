'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('NewsCtrl',['$scope','$http', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.get("/api/article/getArticleList").success(function(data,status,headers,congfig){
      $scope.newsList = data;
    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });;

  }]);
