/**
 * Created by funny on 2016/12/27.
 */

var app = angular.module('webApp');
app.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;
    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
});



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
