
'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('ResAddCtrl',['$scope','$http',function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.fields = [];


    $scope.showAddFieldFn = function(){
      console.log($scope)
      $scope.showMask();
      $scope.fileFormShow = true;
      $scope.dataChinaName = "";
      $scope.name = "";
      $scope.brief ="";
      $scope.dataType = "text"
      $scope.isShow =1;
      $scope.dataIsNeed= 1;
    }

   $scope.addResFn = function(){
     console.log("aaaaaaaaa")
   }

  }])
