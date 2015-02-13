angular.module('tideApp')
.controller("progressBar",function($scope,$timeout){
  
  var amt = 100;
  
  $scope.countTo = amt;
  $scope.countFrom = 0;
  
  $timeout(function(){
    $scope.progressValue = amt;
  },200);
  
});

// http://angular-ui.github.io/bootstrap/#/progressbar
// https://github.com/sparkalow/angular-count-to