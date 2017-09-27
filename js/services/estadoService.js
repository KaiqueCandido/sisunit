angular.module('estadoService', []).service('estadoService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'estado');
  }


});
