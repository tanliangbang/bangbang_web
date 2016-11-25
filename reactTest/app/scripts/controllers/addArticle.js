'use strict';

/**
 * @ngdoc function
 * @name reactTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reactTestApp
 */
angular.module('reactTestApp')
  .controller('AddArticleCtrl',['$scope','$rootScope',function ($scope,$rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      UE.getEditor('article')
    /*   function uploadImg(callbak){
         console.log($("input[name*='resImg']"))
         if(!$("input[name*='resImg']").get(0).files[0]){
           return;
         }
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
       }*/




  }]).run(function(){ $rootScope.$on('$stateChangeStart', function(){
  alert("aaaaaaaaaa");
  UE.getEditor('article').destroy();
}) });
