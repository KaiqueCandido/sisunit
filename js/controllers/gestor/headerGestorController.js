angular.module('headerGestorController', [])
.controller('headerGestorController', function ($scope, $http, $state, $rootScope) {

  $scope.inicio = function () {
    $state.go('headerGestor.home');
  }
  $scope.veiculos = function () {
    $state.go('headerGestor.veiculos');
  }
  $scope.motoristas = function () {
    $state.go('headerGestor.motoristas');
  }
  $scope.passageiros = function () {
    $state.go('headerGestor.passageiros');
  }
  $scope.rotas = function () {
    $state.go('headerGestor.rotas');
  }
  $scope.pontosDeParada = function () {
    $state.go('headerGestor.pontosDeParada');
  }
  $scope.alterarSenha = function () {
    $state.go('headerGestor.alterarSenha');
  }
  $scope.logout = function () {
    $state.go('login');
  }

});
