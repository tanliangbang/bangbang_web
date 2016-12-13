'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('AddArticleCtrl',['$scope','$http',function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      UE.getEditor('article')

    $scope.articleDate =  {};
    $(".pickerDate").datetimepicker();
    $scope.addArticleBtn = function(){
      $scope.articleDate.content = UE.getEditor("article").getContent();
      $http.post("/api/article/addArticle",$scope.articleDate,function(data){
        console.log(data)
      });
    }



    $scope.$on('$locationChangeSuccess',function(){
        UE.getEditor("article").destroy();
    })






  }])
