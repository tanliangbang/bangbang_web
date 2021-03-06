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
  .controller('ResAddContentCtrl',['$scope','$http','$routeParams','$location',function ($scope,$http,$routeParams,$location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var currResType = null;
    var fields  = null;
    $(".pickerDate").datetimepicker({
       format: 'yyyy-mm-dd',
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
    var resContentId =  $scope.resContentId = $routeParams.resContentId;
    $http.get("/api/res/getRes?id="+id).success(function(data,status,headers,congfig){
        data = data.data;
        $scope.currResType = currResType = data[0];
        fields = JSON.parse(currResType.type_specification);
        UE.myObj = [];
      for(var obj in fields){
        if(fields[obj].dataType=="textarea"){
          UE.myObj.push(obj);
        }
      }
        if(resContentId){
            $http.get("/api/res/getResContentById?id="+resContentId+"&name="+$routeParams.type).success(function(data,status,headers,congfig){
               data = data.data;
                var currdata =  $scope.otherField = data[0];
                currdata.startTime = changeTime(currdata.startTime,"-");
                currdata.endTime = changeTime(currdata.endTime,"-");
                currdata.isOnLine = currdata.isOnLine+"";
                var tempArr =[];
                for(var obj in fields){
                    tempArr.push(currdata.content);
                }
                $scope.editorContent = tempArr;
                $scope.fields = fields;
            });

        }else{
            $scope.fields = fields;
            $scope.otherField = {};
            $scope.otherField.isOnLine = '1';


        }



        }).error(function(data,status,headers,congfig){
      defer.reject(data);
    });




    $scope.submitResFn = function(){
      var content = {};
      var tempName = "";
      if(!checkIsFill()){
        return;
      }
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
            tempName = $(tempName).val();
            content[obj] = tempName;
          }else if(fields[obj].dataType=="textarea") {
            tempName = "textarea[name=" + obj + "]";
            content[obj] = UE.getEditor("my"+obj).getContent();
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
        if($scope.resContentId){
            $http.post("/api/res/UpdateResContent", {resContentId:$scope.resContentId,onLine:$scope.otherField.isOnLine,startTime:$scope.otherField.startTime,endTime:$scope.otherField.endTime,content:JSON.stringify(content),name:currResType.name}).success(function(){
               $location.path("resContentList").search("type="+currResType.name+"&id="+$routeParams.id);
            }) .error(function(data) {
              alert("failure message:" + JSON.stringify({data:data}));
            });
        }else{
          $http.post("/api/res/addResContent", {onLine:$scope.otherField.isOnLine,startTime:$scope.otherField.startTime,endTime:$scope.otherField.endTime,content:JSON.stringify(content),name:currResType.name}).success(function(){
            $location.path("resContentList").search("type="+currResType.name+"&id="+$routeParams.id);
          }) .error(function(data) {
            alert("failure message:" + JSON.stringify({data:data}));
          });
        }

      }


  }]);

function checkIsFill(){
  var isTrue = true;
  $(".otherFields").each(function(){
    var fileType = $(this).attr("data-type");
    var isNeed = $(this).attr("data-isNeed");
    var input = $(this).find("input");
    if(isNeed==1){
      switch(fileType){
        case 'text':
        case 'number':
          if(isEmpty(input.val())){
            isTrue = isTrue&&false;
          }else{
            isTrue = isTrue&&true;
          }
          break;
        case 'file':
          if(isEmpty(input.attr("url"))){
            isTrue = isTrue&&false;
            alert("请选择照片");
          }else{
            isTrue = isTrue&&true;
          }
          break;
      }
    }else{
      isTrue = isTrue&&true;
      input.removeAttr("required");
    }
  });

  return isTrue;
}
