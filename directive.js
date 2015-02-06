
"use strict";
/* jshint undef: true, unused: true */
/* global angular */

/**
 * @ngdoc overview
 * @name popupBeneficio
 * @description
 * Plantilla para futuros directives (en caso de requerirse)
 *
 *
 */
angular.module('tideApp')
.directive('popupBeneficio', [ '$templateCache', '$compile', '$http', function ( $templateCache, $compile, $http ) {
  return {
    restrict: 'A',
    scope: {
      beneficio: "=ngModel", // what needs to be passed to the template
      templateUrl: "=?tdTemplateUrl"
    },
    link: function(scope, element) {
        var options = {
            title:scope.beneficio.nombre+" ("+scope.beneficio.sigla+") - Detalle del beneficio"+"<button type='button' class='close'>×</button>",
            content: "",
            placement: "auto",
            container: $('body'),
            html: true,
        };

        // Obtener template desde archivo externo si se define atributo td-template-url
        if (scope.templateUrl) {
            $http.get(scope.templateUrl)
            .then(function(response) {
              var template = $templateCache.put( 'templateBeneficio.html', response.data );
              options.content= $compile($(template))(scope);
              element.popover(options);
            }) 
        } 

        // Obtener template definida localmente con ngTemplate & id templateBeneficio.html
        else {
            var template = $templateCache.get( 'templateBeneficio.html');
            options.content= $compile($(template))(scope);
            element.popover(options);
        }


      element.on('shown.bs.popover', function () {
        var popover = element.data('bs.popover');
        if (typeof popover !== "undefined") {
            var $tip = popover.tip();
            var zindex = $tip.css('z-index');
            
            $tip.find('.close').bind('click', function () {
                popover.hide();
            });
            
            $tip.mouseover(function () {
                $tip.css('z-index', function () {
                    return zindex + 1;
                });
            })
                .mouseout(function () {
                $tip.css('z-index', function () {
                    return zindex;
                });
            });
        }
    });
    }
  };
}]);


