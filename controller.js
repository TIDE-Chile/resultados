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


this.estadoSeleccionado["primerano"] = "postulacion";
this.estadoSeleccionado["superiores"] = "preseleccion";
this.estadoSeleccionado["complementarias"] = "preseleccion";


/*this.estados = {}

this.estados[0]="postulacion";
this.estados[1]="preseleccion";
this.estados[2]="asignacion";
this.estados[3]="apleacion";
*/
  this.openModalBeneficioAsignado = function() {
     var modalInstance = $modal.open({
      templateUrl: 'templates/beneficioAsignado.html',
      //controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  }

  dataService.getData(this.rut)
  .then(function(data) {
    myself.data = data;
  })
  .catch(function(error) {
    myself.errorMsg="Error al consultar los datos";
  })

  // Obtener datos para v2 de JSON y no interferir con version actual
  dataService.getData(this.rut+"v2")
  .then(function(data) {
    myself.datav2 = data;
  })
  .catch(function(error) {
    myself.errorMsg="Error al consultar los datos";
  })



}]);