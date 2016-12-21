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
angular.module('reactTestApp')
  .controller('bodyController',['$scope','$http', function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get("/api/res/getResList").success(function(data,status,headers,congfig){
         $scope.resList = data;
    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });


    $scope.changeSub = function(event){
      var ul = null;
      if(event.target.tagName=='A'){
          ul = $(event.target).next()
      }else{
        ul = $(event.target).parent().next()
      }
      if(ul.css("display")=="none"){
        ul.css("display","block");
        ul.prev().children().addClass("rotateM90")
      }else{
        ul.css("display","none")
        ul.prev().children().removeClass("rotateM90")
      }
    }
  }]);
