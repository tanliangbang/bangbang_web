/**
 * Created by funny on 2016/12/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:comController
 * @description
 * # comController
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('comController',['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.changeColor = function(num){
      $scope.isActive = num;
    }
  }]);
