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
 * Controller for Carreras explorer
 *
 */
angular.module('tideApp')
.controller('AppController', ['$scope','$modal','DataService',function ($scope, $modal, dataService) {
  var myself = this;

  this.rut = "12345678";
  this.estadoSeleccionado = {}


 /*
  * iniciaEpataSeleccionada
  * Asigna valores iniciales para 
  */
  var iniciaEtapaSeleccionada = function(data) {
    if (data && data.misBeneficios && data.misBeneficios.categorias) {
      // Recorre cada una de las categorías en los datos
      angular.forEach(data.misBeneficios.categorias, function(categoria) {
        var idCategoria = categoria.identificador;
        var etapaActual = categoria.etapaActual;
        myself.estadoSeleccionado[idCategoria] = etapaActual;
      })
    }
  }

  dataService.getData(this.rut)
  .then(function(data) {
    iniciaEtapaSeleccionada(data);
    myself.data = data;
  })
  .catch(function(error) {
    myself.errorMsg="Error al consultar los datos";
  })




}]);