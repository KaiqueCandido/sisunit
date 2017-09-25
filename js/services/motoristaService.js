angular.module('motoristaService', []).service('motoristaService', function(baseUrl, $http, $rootScope) {

  this.listar = function() {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'motorista');
  }

  this.pesquisar = function(idmotorista) {
    $rootScope.loading = true;
    return $http.get(baseUrl.server + 'motorista/' + idmotorista);
  }

  this.salvar = function(motorista) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'motorista', motorista);
  }

  this.atualizar = function(motorista) {
    $rootScope.loading = true;
    return $http.put(baseUrl.server + 'motorista', motorista);
  }

  this.excluir = function(motorista) {
    $rootScope.loading = true;
    return $http.post(baseUrl.server + 'motorista/' + motorista.id);
  }

});
