'use strict';
/* jshint undef: true, unused: true */
/* global angular */




/**
 * @ngdoc controller
 * @name tideApp.controller:AppController
 * @requires $scope
 * @requires tideApp.DataService
 *
 * @property {object} data Objeto con datos de resultados para un postulante
 * @description
 *
 * Controller for App Resultados
 *
 */
angular.module('tideApp')
.controller('AppController', ['$scope','DataService',function ($scope, dataService) {
  var myself = this;

  // 
  this.estadoSeleccionado = {}

 /*
  * QueryString
  * Función auxiliar que permite obtener parametros del url
  */
  // Aux function to get url GET params
  var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
        // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]], pair[1] ];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(pair[1]);
      }
    } 
      return query_string;
  } ();

  // Parámetros (RUT & token) asociados al postulante consultado
  this.rut = QueryString.rut ? QueryString.rut : "12345678";
  this.token = QueryString.token ? QueryString.token : null;

  // Parámetro mode para ser utilizado en test ( &mode=test )
  this.mode = QueryString.mode ? QueryString.mode : null;

 /*
  * iniciaEpataSeleccionada
  * Asigna valores iniciales para la etapa seleccionada de cada proceso
  */
  var iniciaEtapaSeleccionada = function(data) {
    if (data && data.misBeneficios && data.misBeneficios.procesos) {
      // Recorre cada una de las Procesos en los datos
      angular.forEach(data.misBeneficios.procesos, function(procesos) {
        var idProcesos = procesos.identificador;
        var etapaActual = procesos.etapaActual;
        myself.estadoSeleccionado[idProcesos] = etapaActual;
      })
    }
  }

  // Mantiene el estado abierto/cerrado de cada bloque del acordeón
  this.isOpenAccordion = {
    mensajesDestacados: true,
    datosPostulante: false,
    misBeneficios : false
  };

  this.loading = true;
  this.errorMsg=null;

  dataService.getData(this.rut, this.token, this.mode)
  .then(function(data) {
    myself.loading = false;
    iniciaEtapaSeleccionada(data);
    myself.data = data;
  })
  .catch(function(error) {
    myself.loading = false;
    if (error == 401) {
      myself.errorMsg="No se permiten consultas sucesivas sin volver a validar que no es un robot (cerrar y volver a ingresar RUT y captcha)";
    } else if (error == 404) {
      myself.errorMsg="No se encuentran datos para este RUT";
    } else {
      myself.errorMsg="Error en la consulta de datos";
    }
  })

/*mostrar/ocultar texto popup ver pasos..*/  
this.pasos = {
  show : false
}
/*barra de progreso al cargar pagina*/
this.procressbar = 20;

var isUndefined = function(val) {
  if(angular.isUndefinedOrNull(val))
    return true;
 
return false;
};

}]);