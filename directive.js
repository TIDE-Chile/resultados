
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
            /*en prueba aun falta afinar mas esto */
            $("body").on('click',function(){
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

/*
* tdTimeline
*/
angular.module('tideApp')
.directive('tdTimeline', [ '$templateCache', '$compile', '$http', function ( $templateCache, $compile, $http ) {
  return {
    restrict: 'A',
    scope: {
        etapa: "=?ngModel", // etapa seleccionada
        infoEtapas: "=?tdInfoEtapas",  // objetos de datos para usarlo en scope del compile
        templateUrl: "=?tdTemplateUrl"
    },
    link: function(scope, element) {
        /*
        * selectEtapa
        * Función que se llama al hacer click sobre alguna de las etapas
        * Cambia la clase de la etapa a "active" y modifica el ng-model con el id de la etapa
        */
        var selectEtapa = function(e) {
            var $etapaSeleccionada = angular.element(this);
            var idEtapa = $etapaSeleccionada.attr("id");

            // Elimina clase "active" de todas las etapas
            var $etapas = angular.element(element[0].querySelectorAll(".etapa"));
            $etapas.attr("class","etapa");

            // Agrega clase "active" a etapa seleciconada
            $etapaSeleccionada.attr("class", "etapa active");

            scope.$apply(function() {
                scope.etapa = idEtapa;
            })

        }

        // Obtener template desde archivo externo si se define atributo td-template-url
        if (scope.templateUrl) {
            $http.get(scope.templateUrl)
            .then(function(response) {
              var template = $templateCache.put( 'templateBeneficio.html', response.data );
              var content= $compile($(template))(scope);
              element.html(content);

              var $etapas = angular.element(element[0].querySelectorAll(".etapa"));
              // Asocia evento "on click" a cada elemento de clase "etapa"
              $etapas.on('click', selectEtapa);
              $etapas.tooltip({container: 'body',placement: 'auto'});

              var $etapaSeleccionada = angular.element(element[0].querySelectorAll("#"+scope.etapa+".etapa"));
              $etapaSeleccionada.attr("class", "etapa active");
            }) 
        } 
    }
  };
}]);


