
'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # ResAddCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('ResContentListCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
    console.log($routeParams)

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    getTypeBuyId(function() {
        $http.get("/api/res/getResContentList?name=" + $scope.type).success(function (data, status, headers, congfig) {
          $scope.currTypeContents = data;
        }).error(function (data, status, headers, congfig) {
          defer.reject(data);
        });
    });

    function getTypeBuyId(callback){
      $http.get("/api/res/getRes?id="+$scope.id).success(function(data){
        $scope.currItem = data[0];
        $scope.typeItems = JSON.parse($scope.currItem.type_specification);
        callback();
      }).error(function (data, status, headers, congfig) {
        defer.reject(data);
      });
    }




  }]);


