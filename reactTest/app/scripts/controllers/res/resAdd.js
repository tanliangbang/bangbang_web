
'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # ResAddCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('ResAddCtrl',['$scope','$http','$routeParams','$location',function ($scope,$http,$routeParams,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var fieldType = ["text","file","date","time",'boolean','textarea','filte','enum','select']
    $scope.id = $routeParams.id;
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

    var currResType = null;

    if($scope.id) {
      $http.get("/api/res/getRes", {
        params: {id: $scope.id}
      }).success(function (data) {
        currResType = data.data[0];
        $scope.fields = analysisField(currResType.type_specification);
        $scope.res_desc = currResType.cname;
        $scope.res_name = currResType.name;
      }).error(function (data, status, headers, congfig) {
        defer.reject(data);
      });

    }else{
      $scope.fields = [];
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
      if(!$scope.fields||$scope.fields.length<1){
        alert("请添加字段");
        return;
      }
      var type_specification = deal_fieldFn($scope.fields);
      if($scope.id){
          $http.post("/api/res/updateRes", {id:$scope.id,name:name,cname:describe,type_specification:type_specification}).success(function(responseData) {
            $location.path("resList");
          });
      }else{
        $http.post("/api/res/addRes", {name:name,cname:describe,type_specification:type_specification}).success(function(responseData) {
           $location.path("resList");
        });
      }


    }


    function analysisField(obj){
      var arr = [];
      obj = JSON.parse(obj);
      for(var curr in obj){
        arr.push(fieldObjToArr(curr,obj[curr]));
      }
      return arr;
    }

    function fieldObjToArr(name,filed){
      var fieldObj = {"name":name};
      for(var obj in filed){
        fieldObj[obj] = filed[obj];
      }
      return fieldObj;
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
