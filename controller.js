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
.controller('AppController', ['$scope', 'DataService',function ($scope,dataService) {
  var myself = this;

  this.rut = "12345678";

  dataService.getData(this.rut)
  .then(function(data) {
    myself.data = data;
  })
  .catch(function(error) {
    myself.errorMsg="Error al consultar los datos";
  })

}]);