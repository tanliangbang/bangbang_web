
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
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;

    window.localStorage.currentPage = 1;
    $scope.paginationConf = {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 5,
      pagesLength: 15,
      perPageOptions: [10, 20, 30, 40, 50],
      onChange: function(){
        var _this = this;
        if(window.localStorage.currentPage!=1){
          this.currentPage = parseInt(window.localStorage.currentPage);
        }else{
          window.localStorage.currentPage = this.currentPage;
        }
        $scope.paginationObj = this;
        getList($scope,_this,$scope.currItem);
      }
    };



    function getList($scope,_this,currItem){
      var start = _this.itemsPerPage*(_this.currentPage-1);
      if(!start){
        start =0;
      }
      getTypeBuyId(function() {
            $http.get("/api/res/getResContentList",{params: {name:$scope.type,start:start,size:_this.itemsPerPage}}).success(function (data, status, headers, congfig) {
              data = data.data;
              $scope.currTypeContents = data.content;
              _this.totalItems = data.pageTotal;
            }).error(function (data, status, headers, congfig) {
              defer.reject(data);
            });
      });



    }






    function getTypeBuyId(callback){
      $http.get("/api/res/getRes?id="+$scope.id).success(function(data){
        data = data.data;
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

    $scope.editResFn = function(index){
      $location.path("resAddContent").search("type="+ $scope.type+"&id="+ $scope.id+"&resContentId="+$scope.currTypeContents[index].id);
    }


    $scope.resDeleteFn = function(){
      if(confirm("确认要删除？")){
        var transform = function(data){
          return $.param(data);
        }
        $http.post("/api/res/delRes", {name:$routeParams.type,id:$scope.id}).success(function(){
          alert("删除成功");
          $location.path("/");
          window.location.reload();
        }) .error(function(data) {
          alert("删除失败");
        });


      }
    }



    $scope.editResContentFn = function(){
       $location.path("resAdd").search("id="+ $scope.id);
    }






  }]);


