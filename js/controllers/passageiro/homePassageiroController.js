angular.module('homePassageiroController', [])

.controller('homePassageiroController', function ($scope, $http, $state, $rootScope) {

  $scope.vaiVoltar = {
    condicao : true,
    estado : "Eu vou!",
    cor : "gree"
  };

  $scope.euVou = function () {
    if ($scope.vaiVoltar.condicao === true){
      $scope.vaiVoltar.condicao = false;
      $scope.vaiVoltar.estado = "Eu não vou!";
      $scope.vaiVoltar.cor = "red";
    } else if ($scope.vaiVoltar.condicao === false){
        $scope.vaiVoltar.condicao = true;
        $scope.vaiVoltar.estado = "Eu vou!";
        $scope.vaiVoltar.cor = "gree";
    }
  }

});
