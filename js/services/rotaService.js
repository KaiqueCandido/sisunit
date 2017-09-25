angular.module('rotaService', []).service('rotaService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'rota');
  }

  this.pesquisar = function(idrota) {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'rota/' + idrota);
  }

  this.salvar = function(rota) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'rota', rota);
  }

  this.atualizar = function(rota) {
    $rootScope.loading = true;
    return $http.put(baseUrl.server + 'rota', rota);
  }

  this.excluir = function(rota) {
    $rootScope.loading = true;
    return $http.delete(baseUrl.server + 'rota', rota);
  }

});
