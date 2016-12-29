'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('htmlResCtrl', ['$scope','$rootScope','$http','$location','$window', function ($scope,$rootScope,$http,$location,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var start = 0;
    var size = 12;
    $rootScope.isActive = 1;
    $scope.name = 'jsRes';
    $scope.newsList = [];
    getList(start,size);



    $scope.toDetail = function(){
       $location.path("articleDetail").search("name="+$scope.name+"&id="+this.item.id);
    }

    $scope.loadMore = function(){
        getList(start,size);
        start = start+size;
    }

    function getList(start,size){
      $scope.loading = true;
      $http.get("/api/res/getResContentList",{params: {name:"jsRes",start:start,size:size}}).success(function(data,status,headers,congfig){
        $.merge($scope.newsList,data.content);
        $scope.loading = false;
      }).error(function(data,status,headers,congfig){
        $scope.loading = false;
        defer.reject(data);
      });
    }


  }]);
