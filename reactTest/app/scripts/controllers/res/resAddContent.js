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
    $(".pickerDate").datetimepicker({
        beforeShow: function () {
          setTimeout(function () {
              $('#ui-datepicker-div').css("z-index", 1000);
            }, 100);
        }
      });
    $scope.$on('$locationChangeSuccess',function(){
      var ueditor = UE.myObj;
      for(var i=0;i<ueditor.length;i++){
        UE.getEditor("my"+ueditor[i]).destroy();
      }
    })


    var id = $routeParams.id;
    $http.get("/api/res/getRes?id="+id).success(function(data,status,headers,congfig){
       $scope.currResType = currResType = data[0];
        fields = JSON.parse(currResType.type_specification);
        console.log(fields)
        $scope.fields = fields;
        $scope.otherField = {};
        $scope.otherField.isOnLine = '1';
        UE.myObj = [];
      for(var obj in fields){
        if(fields[obj].dataType=="textarea"){
          UE.myObj.push(obj);
        }
      }

    }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });


    $scope.submitResFn = function(){
      var content = {};
      var tempName = "";

      for(var obj in fields){
          if(fields[obj].dataType=="text"||fields[obj].dataType=="time"||fields[obj].dataType=="number"){
            tempName ="input[name="+obj+"]";
            content[obj] = $(tempName).val();
          }else if(fields[obj].dataType=="boolean"||fields[obj].dataType=="filte"||fields[obj].dataType=="select"){
            tempName ="select[name="+obj+"]";
            content[obj] = $(tempName).val();
          } else if(fields[obj].dataType=="file"){
            tempName ="input[name="+obj+"]";
            content[obj] = $(tempName).attr("url");
          }else if(fields[obj].dataType=="date"){
            tempName ="input[name="+obj+"]";
            tempName = getTimeStamp($(tempName).val());
            tempName = tempName.substr(0, tempName.length - 3);
            content[obj] = tempName;
          }else if(fields[obj].dataType=="textarea") {
            tempName = "textarea[name=" + obj + "]";
            content[obj] = UE.getEditor(obj).getContent();
          }else if(fields[obj].dataType=="enum") {
            tempName ="input[type=checkbox]";
            var str = "";
            for(var i=0;i<$(tempName).length;i++){
              if($(tempName)[i].checked){
                str = str + $(tempName)[i].name+",";
              }
            }
            str = str.substr(0,str.length-1);
            content[obj] = str;
          }
      }
      commitResContentFn(content);


    }

    function commitResContentFn(content) {
      console.log($scope.otherField);
        $http.post("/api/res/addResContent", {onLine:$scope.otherField.isOnLine,startTime:$scope.otherField.startTime,endTime:$scope.otherField.endTime,content:content,name:currResType.name}).success(function(){
          $location.path("resList/"+resId);
        }) .error(function(data) {
          alert("failure message:" + JSON.stringify({data:data}));
        });
      }


  }]);
