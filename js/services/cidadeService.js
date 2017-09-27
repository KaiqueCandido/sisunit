angular.module('cidadeService', []).service('cidadeService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'cidade');
  }

  this.listarPorEstado = function(idEstado) {  	
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'cidade/' + idEstado);
  }


});
