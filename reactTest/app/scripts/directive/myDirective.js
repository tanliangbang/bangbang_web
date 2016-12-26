var app = angular.module('reactTestApp');
app.directive('datetimepicker', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      $(element).datetimepicker({
        timeFormat: 'hh:mm:ss',
        dateFormat: 'yy-mm-dd',
        changeYear:true,
        beforeShow: function () {
          setTimeout(function () {
            $('#ui-datepicker-div').css("z-index", 1000);
          }, 100);
        }
      });
      setTimeout(function(){
        if(ngModel.$viewValue){
          ngModel.$setViewValue(new Date(ngModel.$viewValue).getTime());
        }
      },100)
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

