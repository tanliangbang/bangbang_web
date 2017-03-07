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



app.directive("modelItem",['$timeout', '$parse', function($timeout,$parse) {
  return {
    restrict:'AEC',
    scope:{
      value:"@"
    },
    link:function(scope,el,attrs){
      var num = attrs.delay%10;
      var colorArray = ['3B5B99','6FA014','3E3F3A','C23916','3C7780','94C849','BE213E','00ACED','F29500','91009B'];
      scope.bgColor = '#'+colorArray[num];
      scope.content = attrs.content
      $timeout(function () {
        var delay = attrs.delay*0.1;
        el[0].firstChild.style.webkitTransform = "rotateY(0deg)";
        el[0].firstChild.style.oTransform = "rotateY(0deg)";
        el[0].firstChild.style.transform = "rotateY(0deg)";
        el[0].firstChild.style.msTransform = "rotateY(0deg)";
        el[0].firstChild.style.mozTransform = "rotateY(0deg)";
        el[0].firstChild.style.transition = "-webkit-transform 0.2s linear "+delay+"s";
        el[0].firstChild.style.transition = "-o-transform 0.2s linear "+delay+"s";
        el[0].firstChild.style.transition = "-ms-transform 0.2s linear "+delay+"s";
        el[0].firstChild.style.transition = "-moz-transform 0.2s linear "+delay+"s";
        el[0].firstChild.style.transition = "transform 0.2s linear "+delay+"s";
      });

    },
    template:'<div class="indexAnimation" style="background:{{bgColor}}">{{content}}</div>'
  }
}]);


app.directive("listAnimate1", function($timeout) {
  return {
    restrict:'AEC',
    scope:{
      value:"@"
    },
    link:function(scope,el,attrs){
      var size = parseInt(attrs.size)
      var index = parseInt(attrs.index);
      var delay = index%size*0.2;
      $timeout(function () {
        el[0].parentNode.style.webkitTransform = "scale(1)";
        el[0].parentNode.style.oTransform = "scale(1)";
        el[0].parentNode.style.transform = "scale(1)";
        el[0].parentNode.style.msTransform = "scale(1)";
        el[0].parentNode.style.mozTransform = "scale(1)";
        el[0].parentNode.style.transition = "-webkit-transform 0.5s linear "+delay+"s";
        el[0].parentNode.style.transition = "-o-transform 0.5s linear "+delay+"s";
        el[0].parentNode.style.transition = "-ms-transform 0.5s linear "+delay+"s";
        el[0].parentNode.style.transition = "-moz-transform 0.5s linear "+delay+"s";
        el[0].parentNode.style.transition = "transform 0.5s linear "+delay+"s";
      });
    },
    template:""
  }
});



app.directive("listAnimate2", function($timeout) {
  return {
    restrict:'AEC',
    scope:{
      value:"@"
    },
    link:function(scope,el,attrs){
      var size = parseInt(attrs.size)
      var index = parseInt(attrs.index);
      var delay = index%size*0.1;
      $timeout(function () {
        el[0].parentNode.style.transition = "-webkit-transform 0.2s linear "+delay+"s";
        el[0].parentNode.style.transition = "-o-transform 0.2s linear "+delay+"s";
        el[0].parentNode.style.transition = "-ms-transform 0.2s linear "+delay+"s";
        el[0].parentNode.style.transition = "-moz-transform 0.2s linear "+delay+"s";
        el[0].parentNode.style.transition = "transform 0.2s linear "+delay+"s";
        el[0].parentNode.style.webkitTransform = "rotate(0deg) scale(1)";
        el[0].parentNode.style.oTransform = "rotate(0deg) scale(1)";
        el[0].parentNode.style.transform = "rotate(0deg) scale(1)";
        el[0].parentNode.style.msTransform = "rotate(0deg) scale(1)";
        el[0].parentNode.style.mozTransform = "rotate(0deg) scale(1)";
      });
    },
    template:""
  }
});


