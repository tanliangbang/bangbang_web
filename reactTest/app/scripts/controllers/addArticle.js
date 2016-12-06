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
    $scope.article =  {};
      UE.getEditor('article')
     $('.datetimepicker').datetimepicker();

    $scope.addArticleBtn = function(){
      $scope.addArticle.content = UE.getEditor("article").getContent();
      $http.post("/api/addArticle",$scope.addArticle,function(data){
        console.log(data)
      });
    }

    console.log($scope);
    $scope.$on('$locationChangeSuccess',function(){
        UE.getEditor("article").destroy();
    })


  }])
