angular.module('reactTestApp').directive('datetimepicker', function() {
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
