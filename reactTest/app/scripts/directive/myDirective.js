var app = angular.module('reactTestApp');

app.directive('datetimepicker', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      $(element).datetimepicker({
        showSecond: true,
        timeFormat: 'hh:mm:ss'
      });
      element[0].onchange =function(val){
        ngModel.$setViewValue(val.timeStamp);
        scope.$apply()
      };
    }
  };
});


app.directive("mask", function() {
  return {
    restrict:'AEC',
    link:function(scope,el,attrs){
      scope.showMask = function(){
        this.maskShow = true;
      }

      scope.closeMask = function(){
        this.maskShow = false;
      }
    },
    template:'<div ng-show="maskShow" class="Mask"></div>'
  }
});
