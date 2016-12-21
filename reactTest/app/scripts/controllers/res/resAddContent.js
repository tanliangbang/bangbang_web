/**
 * Created by funny on 2016/12/21.
 */

'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # ResAddCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('ResAddContentCtrl',['$scope','$http','$routeParams',function ($scope,$http,$routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var currResType = null;
    var fields  = null;

    $scope.$on('$locationChangeSuccess',function(){
      var ueditor = UE.myObj;
      for(var i=0;i<ueditor.length;i++){
        UE.getEditor(ueditor[i]).destroy();
      }
    })


    var id = $routeParams.id;
    $http.get("/api/res/getRes?id="+id).success(function(data,status,headers,congfig){

       $scope.currResType = currResType = data.data[0];
        fields = JSON.parse(currResType.type_specification);
        $scope.fields = fields;
        $scope.otherField = {};
        $scope.otherField.isOnLine = 1;
      UE.myObj = [];
      for(var obj in fields){
        if(fields[obj].dataType=="textarea"){
          UE.myObj.push(obj);
        }
      }











    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });

  }]);
