angular.module('headerMotoristaController', [])
.controller('headerMotoristaController', function ($scope, $http, $state, $rootScope) {

  $scope.inicio = function () {
    $state.go('headerMotorista.home');
  }

  $scope.veiculos = function () {
    $state.go('headerMotorista.veiculos');
  }

  $scope.alterarSenha = function () {
    $state.go('headerMotorista.alterarSenha');
  }

  $scope.logout = function () {
    $state.go('login');
  }

});
