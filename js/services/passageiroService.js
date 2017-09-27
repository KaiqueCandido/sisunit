angular.module('passageiroService', []).service('passageiroService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'passageiro');
  }

  this.pesquisar = function(idPassageiro) {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'passageiro/' + idPassageiro);
  }

  this.salvar = function(passageiro) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'passageiro', passageiro);
  }

  this.atualizar = function(passageiro) {
    $rootScope.loading = true;
    return $http.put(baseUrl.server + 'passageiro', passageiro);
  }

  this.excluir = function(passageiro) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'passageiro/remove/' +  passageiro.id);
  }

});
