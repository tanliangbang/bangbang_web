/**
 * Created by funny on 2015/12/24.
 */
var app = angular.module('reactTestApp');


    var dateNI = 'fieldType=="date"'
    var  date=    '<div ng-if='+dateNI+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
        '<div class="col-sm-3">'+
        '<input class="form-control"  ng-click="dateSeleFn($event)" value="{{content}}"  name="{{name}}"  type="text" placeholder="{{name}}"  required />'+
        '</div>'+
        '</div>';


    var textNI = 'fieldType=="text"'
    var  textInput='<div ng-if='+textNI+'  class="form-group">'+
      '<label class="col-lg-3 col-md-3 control-label">{{desc}}：</label>'+
      '<div class="col-lg-9 col-md-9">'+
      '<input class="form-control"  value="{{content}}" name="{{name}}"  type="text" placeholder="{{name}}"  required />'+
      '</div>'+
      '</div>';


    var numberNI = 'fieldType=="number"'
    var  number=    '<div ng-if='+numberNI+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
        '<div class="col-sm-3">'+
        '<input class="form-control"  value="{{content}}"  name="{{name}}"  type="number" placeholder="{{name}}"  required />'+
        '</div>'+
        '</div>';


    var booleanNI = 'fieldType=="boolean"'
    var  boolean =    '<div ng-if='+booleanNI+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
        '<div class="col-sm-3">'+
            '<select  class="form-control" ng-model="content"  name="{{name}}">'+
                '<option value="1" >是</option>'+
                 '<option value="0" selected>否</option>'+
            '</select>'+
        '</div>'+
        '</div>';




    var timeIn = 'fieldType=="time"'
    var  time=    '<div ng-if='+timeIn+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
        '<div class="col-sm-3">'+
        '<input class="form-control timeClass" ng-click="timeClickFn($event)" value="{{content}}"  name="{{name}}"  type="text" placeholder="{{name}}"  required />'+
        '</div>'+
        '</div>';



    var fileNI = 'fieldType=="file"'
    var  file=  ' <div ng-if='+fileNI+'  class="form-group tAlign">'+
                        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
                        '<div  class="imgPreview" ng-click="addFileFn($event)">'+
                               '<img ng-if="content" ng-src="{{content}}">'+
                               '<i ng-if="!content" class="fa fa-plus addBtn"></i>'+
                          '</div>'+
                          '<div class="btn uploadBtn"    ng-click="uploadFiles($event)"> 上传</div>'+
                         '<input onchange="getImgDate(this)" url="{{content}}" class="fileInput none" id="{{name}}" name="{{name}}" type="file">'+
                 '</div>';



    var textareaNI = 'fieldType=="textarea"'
    var  textarea=    '<div ng-if='+textareaNI+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
        '<div class="col-sm-9">'+
        '<script id="my{{name}}" type="text/plain" style="width:100%;height:800px;position:relative;" ></script>'+
        '</div>'+
        '</div>';


    //过滤器
    var filteNI = 'fieldType=="filte"'
    var  filte =    '<div ng-if='+filteNI+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}:</label>'+
        '<div class="col-sm-5">'+
        '<select class="form-control filteSelect" name="{{name}}" ng-model="filteVal"  >'+
        '<option value="{{filte.id}}" ng-selected="filteVal==filte.id"  ng-repeat="filte in filteList">{{filte.cname}}</option>'+
        '</select>'+
         '<a ng-click="addFileBtn()" ng-show="showSelect" class="btn btn-success hover-link colorbox-button cboxElement filteBtn" title="添加"><i class="fa fa-plus fa-1x"></i></a>'
        '</div>'+
        '</div>';


    //枚举
    var enumNI = 'fieldType=="enum"'
    var  enumType =    '<div ng-if='+enumNI+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}：</label>'+
        '<div class="col-sm-9">'+
        '<span ng-repeat="enumVal in enumVals" class="enumClass">{{enumVal}}: <input name="{{enumVal}}" ng-checked="{{content[$index]}}"    type="checkbox"   /></span> '+
        '</div>'+
        '</div>';

    //下拉列表框
    var selectIN = 'fieldType=="select"'
    var  select =    '<div ng-if='+selectIN+'  class="form-group">'+
        '<label class="col-sm-3 control-label">{{desc}}:</label>'+
        '<div class="col-sm-5">'+
        '<select class="form-control filteSelect" ng-model="operaVal"  name="{{name}}"   >'+
        '<option   ng-repeat="select in selectList">{{select}}</option>'+
        '</select>'+
    '</div>'+
    '</div>';





    app.directive("field",['$timeout',"$http", function(timer,$http) {
        return {
            restrict:'AEC',
            scope:{
                temp:'@'
            },
            link:function(scope,el,attrs){
                scope.fieldType = attrs.type;
                scope.name = attrs.name;
                scope.desc = attrs.desc;
                scope.num = attrs.num;
              if(attrs.type=='date'&&!isEmpty(attrs.content)){
                    scope.content = changeTime(attrs.content,"-");
                }else if(attrs.type=='boolean'&&isEmpty(attrs.content)){
                    scope.content = '0';
                }else if(attrs.type=='enum'){
                    var enumList = scope.enumVals = attrs.enumval.split(",");
                    var hasEnumList = scope.content = attrs.content.split(",");
                    var checkedArr = [];
                    for(var i=0;i<enumList.length;i++){
                       for(var j=0;j<hasEnumList.length;j++){
                           if(enumList[i]==hasEnumList[j]){
                               checkedArr[i] = true;
                               break;
                           }else{
                               checkedArr[i] = false;
                           }
                       }
                    }
                    scope.content = checkedArr;
                }else if(attrs.type=='select'){
                    scope.selectList = attrs.enumval.split(",");
                    scope.operaVal = scope.selectList[0];
                    if(attrs.content){
                        scope.operaVal = attrs.content;
                    }
                }
                else if(scope.fieldType=="textarea"){
                    timer(function(){
                        UE.getEditor('my'+attrs.name);
                        timer(function(){
                            UE.getEditor('my'+attrs.name).setContent(attrs.content,false);
                        },100)
                    },100);
                }else if(scope.fieldType=="filte"){
                        $http.get(apiUrl+"/res/filteList", {params: {}
                        }).success(function(data, status, headers, config) {
                            console.log(scope);
                            var filte = {
                                'cname':'所有',
                                'content':'',
                                'id':-1,
                                'name':'所有'
                            }
                            data.unshift(filte);
                            scope.filteList = data;
                            if(attrs.content){
                                scope.filteVal = attrs.content;
                            }else{
                                scope.filteVal = -1;
                            }
                        }).error(function(data, status, headers, config) {
                        });

                } else{
                    scope.content = attrs.content;
                }


                scope.isNeed = attrs.isNeed;
                scope.addFileFn = function(event) {
                   var target = event.target;
                    var currClick = null;
                    if(isCurrClick(target)){
                        currClick = target;
                    }else{
                        currClick = target.parentNode;
                    }
                    currClick.nextSibling.nextSibling.click();
                }
                scope.uploadFiles = function(event){
                    var target = event.target
                    target.nextSibling.setAttribute("name","resImg");
                    target.nextSibling.setAttribute("id","resImg");
                    uploadImg(function(url){
                        target.nextSibling.setAttribute("url",url);
                        target.nextSibling.setAttribute("name",scope.name);
                        target.nextSibling.setAttribute("id",scope.name);
                        target.style.display = "none";
                    },scope.$root)
                }

                scope.dateSeleFn = function(event){
                    var target = event.target;
                    $(target).datetimepicker({
                      timeFormat: 'hh:mm:ss',
                      dateFormat: 'yy-mm-dd',
                      changeYear:true,
                      beforeShow: function () {
                        setTimeout(function () {
                          $('#ui-datepicker-div').css("z-index", 1000);
                        }, 100);
                      }
                    });
                    $(target).focus();
                }
                scope.timeClickFn = function(event){
                    var target = event.target;
                    $(target).timepicker({
                        showSecond: true,
                        timeFormat: 'hh:mm:ss'
                    });
                    $(target).focus();

                }

            },
            template:select+textInput+file+date+time+number+boolean+textarea+enumType+filte
        }
    }]);


    function isCurrClick(target){
         var classNames = target.className;
        classNames = classNames.split(" ");
        for(var i=0;i<classNames.length;i++){
            if(classNames[i]=="imgPreview"){
                return true;
            }
        }
        return false;
    }





        app.directive("date", function() {
        return {
            restrict:'AEC',
            scope:{
              value:"@"
            },
            link:function(scope,el,attrs){
                scope.value =changeTime(attrs.value,"-");
                scope.$watch('value', function(newValue, oldValue) {
                    if(attrs.value!=0){
                        scope.value = changeTime(attrs.value,"-");
                    }else{
                        scope.value = "";
                    }
                });
            },
            template:'<span>{{value}}</span>'
        }
    });









function uploadImg(callbak){
    if(!$("input[name*='resImg']").get(0).files[0]){
        return;
    }
    var callbak = callbak;
    $.ajaxFileUpload
    (
        {
            url:'/api/upload/uploadImg',//用于文件上传的服务器端请求 地址（本机为fxb.abc.com）
            secureuri:false,//一般设置为false
            fileElementId:"resImg",//文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'jsonp',//返回值类型 一般设置为json
            jsonp: 'jsoncallback',
            jsonpCallback:'success_jsonpCallback',
            success: function (data, status)  //服务器成功响应处理函数
            {
                callbak(data);
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert("上传失败，请重新上传");
            }
        }
    )
}



