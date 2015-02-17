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

  var apiUrl = "http://bcphp-95e000a0-1.elaval.cont.tutum.io";
  //var apiUrl = "http://localhost/tutum";
  var host = './data';
  
 /*
  * getData
  */
  this.getData = function(rut, token, mode) {
    if (token) {
      return myself.getDataRemota(rut,token,mode)
    } else {
      return myself.getDataLocal(rut);
    }
  }


  this.getDataLocal = function(rut) {
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

  /*
  * getData (getDataRemota temporalmente)
  * Consulta a Web api por los resultados de un RUT incuyendo un token asociado al RUT
  */
  this.getDataRemota = function(rut, token, mode) {
    var deferred = $q.defer();

    // Simple GET request example :
    $http.jsonp(apiUrl+"/index.php/resultados/"+rut+"?token="+token+"&mode="+mode+"&callback=JSON_CALLBACK").
      success(function(data, status, headers, config) {
        if (data.status && data.status == 200) {
          deferred.resolve(data.resultado)
        } else {
          deferred.reject(data.status);
        }
        
      }).
      error(function(data, status, headers, config) {
        if (status==401) {
          deferred.reject(status);
        } else if (status==404) {
          deferred.reject(status);
        } else {
          deferred.reject(status);
        }
        
      });
      
    return deferred.promise;

  }

  


}])




