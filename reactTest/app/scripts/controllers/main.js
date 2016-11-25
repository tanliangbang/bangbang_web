'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('MainCtrl',['$http',function ($http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*$http.post("/api/login",{username:'bangbang',password:'123123'},function(data){
    console.log(data)
  });*/

/*
    UE.getEditor('test');
*/




  }]);
