angular.module('pontoDeParadaService', []).service('pontoDeParadaService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'pontodeparada');
  }

  this.pesquisar = function(idPontoDeParada) {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'pontodeparada/' + idPontoDeParada);
  }

  this.salvar = function(pontoDeParada) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'pontodeparada', pontoDeParada);
  }

  this.atualizar = function(pontoDeParada) {
    $rootScope.loading = true;
    return $http.put(baseUrl.server + 'pontodeparada', pontoDeParada);
  }

});
