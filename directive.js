
"use strict";
/* jshint undef: true, unused: true */
/* global angular */

/**
 * @ngdoc overview
 * @name tdTooltip
 * @description
 * Plantilla para futuros directives (en caso de requerirse)
 *
 *
     restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function( scope, iElement ) {
 
      var content = angular.fromJson( scope.content ),
          template = $templateCache.get( content.templateUrl ),
          templateScope = scope,
          scopeElements = document.getElementsByClassName( 'ng-scope' );
 
      angular.forEach( scopeElements, function( element ) { 
        var aScope = angular.element( element ).scope();
        if ( aScope.$id == content.scopeId ) {
          templateScope = aScope;
        }
      });
 
      iElement.find('div.popover-content').html( $compile( template )( templateScope ) );
    }
 */

angular.module('tideApp')
.directive('popup', [ '$templateCache', '$compile', function ( $templateCache, $compile ) {
  return {
    restrict: 'A',
    scope: {
      beneficio: "=" // what needs to be passed to the template
    },
    //templateUrl: './templates/beneficio_asignado.html',
    link: function(scope, element) {
      var content = angular.fromJson( scope.content ),
          template = $templateCache.get( 'templateId.html' ),
          templateScope = scope,
          scopeElements = document.getElementsByClassName( 'ng-scope' );

        var options = {
            title:scope.beneficio.nombre+" ("+scope.beneficio.sigla+") - Detalle del beneficio",
            content: $compile($(template))(scope),
            placement: "right",
            html: true,
            //date: scope.date,
            trigger:'hover'
        };
        //$(element).popover(options);

/*
      element.attr('title', "Hola");
      element.attr('data-placement', "right");
      element.attr('data-html', true);
      element.attr('data-content', "Hola <strong>amigos</strong>");
      */
      
      //element.attr('data-delay', 0);
      element.popover(options);
    }
  };
}]);


angular.module('tideApp')
.directive('tdTooltip', ['$http', '$templateCache', '$compile', '$parse', '$timeout', function ($http, $templateCache, $compile, $parse, $timeout)
{
    //va-tooltip = path to template or pure tooltip string
    //tooltip-updater = scope item to watch for changes when template has to be reloaded [optional (only if template is dynamic)]
    //All other attributes can be added for standart boostrap tooltip behavior (ex. tooltip-placement)
    return {
        restrict: 'A',
        scope: true,
        compile: function (tElem, tAttrs)
        {
            //Add bootstrap directive
            if (!tElem.attr('tooltip-html-unsafe'))
            {
                tElem.attr('tooltip-html-unsafe', '{{tooltip}}');
            }
            return function (scope, element, attrs)
            {
                scope.tooltip = attrs.vaTooltip;
                var tplUrl = $parse(scope.tooltip)(scope);
                function loadTemplate()
                {
                    $http.get(tplUrl, { cache: $templateCache }).success(function (tplContent)
                    {
                        var container = $('<div/>');
                        container.html($compile(tplContent.trim())(scope));
                        $timeout(function ()
                        {
                            scope.tooltip = container.html();
                        });
                    });
                }
                //remove our direcive to avoid infinite loop
                element.removeAttr('va-tooltip');
                //compile element to attach tooltip binding
                $compile(element)(scope);

                if (angular.isDefined(attrs.tooltipUpdater))
                {
                    scope.$watch(attrs.tooltipUpdater, function ()
                    {
                        loadTemplate();
                    });
                } else
                {
                    loadTemplate();
                }
            };
        }
    };
}]);

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

