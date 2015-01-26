
"use strict";
/* jshint undef: true, unused: true */
/* global angular */

/**
 * @ngdoc overview
 * @name tdTest
 * @description
 * Plantilla para futuros directives (en caso de requerirse)
 *
 *
 */
angular.module("tideApp")
.directive("tdTest",["$compile",function ($compile) {
 return {
  restrict: "A",
      //transclude: false,
      //template: "<div style='background-color:red' ng-transclude></div>",
      scope: {
        data: "=tdData"
      },
      
      link: function (scope, element, attrs) {

        /*
        * Render
        */
        var render = function(data) {
 			element.text(data);
        };

        scope.$watch("data", function () {
          render(scope.data);
        });      

 
      }
      
      
    };
  }]);

