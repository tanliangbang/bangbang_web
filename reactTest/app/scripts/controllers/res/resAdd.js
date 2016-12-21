
'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # ResAddCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('ResAddCtrl',['$scope','$http',function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var fieldType = ["text","file","time",'boolean','textarea','filte','enum','select']
    $scope.fields = [];

    $scope.fieldTypes = fieldType;
    $scope.showAddFieldFn = function(){
      $scope.showMask();
      $scope.fileFormShow = true;
      $scope.dataChinaName = "";
      $scope.name = "";
      $scope.brief ="";
      $scope.dataType = "text"
      $scope.isShow ='1';
      $scope.dataIsNeed= '1';
      $scope.enumVal = "";
    }

    var arr = [];
    var currFile={};
    $scope.addFileBtnFn = function(){
      if(isEmpty($scope.name)||isEmpty($scope.brief)||isEmpty($scope.dataChinaName)){
        return;
      }
      var fields = $scope.fields;
      for(var i=0;i<fields.length;i++){
        if(fields[i].name==$scope.name&&$scope.currChangeFieldIndex!=i){
          alert("字段名不能重复");
          return;
        }
      }
      $scope.closeMask();

      if($scope.isEditField){
        $scope.isEditField = false;
        currFile = setFieldJson($scope);
        $scope.fields[$scope.currChangeFieldIndex] = currFile;
        $scope.fileFormShow = false;
      }else{
        arr = $scope.fields;
        currFile = setFieldJson($scope);
        arr.push(currFile);
        $scope.fields =arr
        $scope.fileFormShow = false;
      }

    }



    $scope.editResFieldFn = function(){
      $scope.showMask();
      $scope.fileFormShow = true;
      if(this.field.dataType == "enum"||this.field.dataType == "select"){
        $scope.enum = true;
        $scope.enumVal =  this.field.enumVal;
      }else{
        $scope.enum = false;
        $scope.enumVal = "";
      }
      setField($scope,this.field);
      $scope.currChangeFieldIndex = this.$index;
      $scope.isEditField = true;
    }


    $scope.delResFieldFn = function(){
      var fields = $scope.fields;
      for(var i=0;i<fields.length;i++){
        if(fields[i].name==this.field.name){
          fields.splice(i,1)
        }
      }
    }



    $scope.closeCurrMask = function(){
      $scope.fileFormShow = false;
      $scope.closeMask();
    }




    $scope.addResFn = function(){
      var describe = $scope.res_desc;
      var name = $scope.res_name;

      if(isEmpty(describe)||isEmpty(name)){
        return;
      }

      if($scope.fields.length<1){
        alert("请添加字段");
        return;
      }

      var type_specification = deal_fieldFn($scope.fields);

        $http.post("/api/res/addRes", {name:name,cname:describe,type_specification:type_specification}).success(function(responseData) {
          $location.path("resList/");

        });

    /*
        var transform = function(data){
          return $.param(data);
        }
        $http.post(apiUrl+"/res/add", {type:$routeParams.type,name:name,cname:describe,type_specification:type_specification
        }, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          transformRequest: transform
        }).success(function(responseData) {
          $location.path("/");
          window.location.reload();
        });
      */

    }






    function setFieldJson(item){
      return {"dataChinaName":item.dataChinaName,"name":item.name,"brief":item.brief,"dataType":item.dataType,"dataIsNeed":item.dataIsNeed,"isShow":item.isShow,"enumVal":item.enumVal}
    }


    function deal_fieldFn(arr){
      var str = "{";
      for(var i=0;i<arr.length;i++){
        str =str+ '"'+arr[i].name+'":{"dataChinaName":"'+ arr[i].dataChinaName+'","dataType":"'+arr[i].dataType+'","dataIsNeed":"'+arr[i].dataIsNeed+'","brief":"'+arr[i].brief+'","isShow":"'+arr[i].isShow+'","enumVal":"'+arr[i].enumVal+'"},'
      }
      str = str.substr(0,str.length-1) + "}";
      return str;
    }


    function setField($scope,item){
      $scope.dataChinaName = item.dataChinaName;
      $scope.name = item.name;
      $scope.brief = item.brief;
      $scope.dataType = item.dataType;
      $scope.dataIsNeed = item.dataIsNeed;
      $scope.isShow = item.isShow;
    }


  }])
