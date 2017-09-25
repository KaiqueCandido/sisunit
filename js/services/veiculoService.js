angular.module('veiculoService', []).service('veiculoService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'veiculo');
  }

  this.pesquisar = function(idveiculo) {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'veiculo/' + idveiculo);
  }

  this.salvar = function(veiculo) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'veiculo', veiculo);
  }

  this.atualizar = function(veiculo) {
    $rootScope.loading = true;
    return $http.put(baseUrl.server + 'veiculo', veiculo);
  }

  this.excluir = function(veiculo) {    
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'veiculo/' + veiculo.id);
  }

});
