'use strict';
/* jshint undef: true, unused: true */
/* global angular */

/**
 * @ngdoc service
 * @name tideApp.DataService
 * @requires $q
 * @requires $http
 *
 * @description
 * Obtiene objetos de datos correspondiente al RUT especificado
 *
 */
angular.module('tideApp')
.service('DataService',['$q', '$http',function($q, $http) {
  var myself = this;

  var host = './data';
  
 /*
  * getData
  */
  this.getData = function(rut) {
    var deferred = $q.defer();

    // Simple GET request example :
    $http.get(host+"/"+rut+".json").
      success(function(data, status, headers, config) {
        deferred.resolve(data)
      }).
      error(function(data, status, headers, config) {
        deferred.reject(status)
      });
      
    return deferred.promise;
  }


}])




