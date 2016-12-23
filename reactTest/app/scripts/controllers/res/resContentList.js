
'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # ResAddCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('ResContentListCtrl',['$scope','$http','$routeParams','$location',function ($scope,$http,$routeParams,$location) {
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

    $scope.delResContent = function(index) {
      if (confirm("确认要删除？")) {
        $http.post("/api/res/delResContent", {id: $scope.currTypeContents[index].id,type:$scope.type}).success(function () {
          $scope.currTypeContents.splice(index,1)
          alert("删除成功");
        }).error(function (data) {
          alert("删除失败");
        });
      }
    }

    $scope.editResContentFn = function(){
      $location.path("resAddContent").search("type="+ $scope.type+"&id="+ $scope.id+"&resContentId="+$scope.currTypeContents[index].id);
    }




  }]);


