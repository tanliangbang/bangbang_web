/**
 * Created by funny on 2016/11/24.
 */
function getImgDate(_this){
  var file =  _this.files[0];
  console.log(_this);

   _this.previousSibling.style.display="inline-block";
   if(file.type=="image/png"||file.type=="image/jpg"||file.type=="image/jpeg"){
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(){
    _this.previousSibling.previousSibling.innerHTML = "<img src="+this.result+">";
  }
    }else{
    _this.value = null;
   alert("请选择正确的图片");
   }
}

function isEmpty(iptstr){
  if(!iptstr||iptstr==""||iptstr==null){
    return true;
  }
  return false;
}


function getApp(){


  var app =  angular.module('reactTestApp', ['ngRoute','ngSanitize','ajaxLoading'],function($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj) {
                value = obj[name];

                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

    });


    return app;



}
