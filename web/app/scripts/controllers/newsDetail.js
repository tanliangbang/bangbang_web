/**
 * Created by funny on 2016/12/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('NewsDetailCtrl',['$scope','$http','$routeParams','$sce','$rootScope', function ($scope,$http,$routeParams,$sce,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.isActive = 2;
    var id = $routeParams.id;
    var name = $routeParams.name;
    $http.get("/api/res/getResContentById?id="+id+"&name="+name).success(function(data,status,headers,congfig){
      $scope.newsDetail = data[0].content;
      $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content)
    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });;

  }]);
