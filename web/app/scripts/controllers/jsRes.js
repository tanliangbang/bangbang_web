'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('jsResCtrl', ['$scope','$rootScope','$http','$location','$window', function ($scope,$rootScope,$http,$location,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.isActive = 1;
    $scope.name = 'jsRes';
    $http.get("/api/res/getResContentList",{params: {name:"jsRes"}}).success(function(data,status,headers,congfig){
      $scope.newsList = data.content;
    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });

    $scope.toDetail = function(){
       $location.path("articleDetail").search("name="+$scope.name+"&id="+this.item.id);
    }



  }]);
