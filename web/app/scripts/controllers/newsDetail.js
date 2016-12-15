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
    $http.get("/api/article/getArticleDetail?id="+id).success(function(data,status,headers,congfig){
      $scope.newsDetail = data[0];
      $scope.newsDetail.content = $sce.trustAsHtml($scope.newsDetail.content)
    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });;

  }]);
