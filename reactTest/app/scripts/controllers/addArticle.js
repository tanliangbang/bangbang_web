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
     $scope.articleDate =  {};
      UE.getEditor('article')
       $('.datetimepicker').datetimepicker({
         showSecond: true,
         timeFormat: 'hh:mm:ss'
       });

    $scope.addArticleBtn = function(){
      console.log($scope.articleDate)
      //$scope.articleDate.content = UE.getEditor("article").getContent();
      /*$http.post("/api/article/addArticle",$scope.article,function(data){
        console.log(data)
      });*/
    }

    $scope.$on('$locationChangeSuccess',function(){
        UE.getEditor("article").destroy();
    })








  }])
