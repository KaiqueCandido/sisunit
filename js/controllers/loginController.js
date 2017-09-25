angular.module('loginController', [])

.controller('loginController', function ($scope, $http, $state, $ionicPopup, $timeout, $rootScope) {

  $scope.variavel = 'teste';

  $scope.autenticacao = function (login) {
    $state.go('menuGestor.cadastroMotorista');
    $http.post('http://192.168.1.102:8080/SisUniT_Server/sisunit/login', login).then(function success(response) {
      var pessoaType = response.data.pessoa_Type
      if (pessoaType === 'Passageiro'){
        $state.go('menu.home');
      } else if (pessoaType === 'Cliente'){
        $state.go('menuGestor.cadastroMotorista');
      } else{
        $state.go('menuGestor.cadastroMotorista');
      }
    }, function error(response) {
      $ionicPopup.alert({title: 'Erro!', template: 'Login ou senha invalidos, por favor tente novamente!'});
    });
  }

  $scope.goToMotorista = function () {
    $state.go('headerMotorista.home');
  }

  $scope.goToPassageiro = function () {
    $state.go('headerPassageiro.home');
  }

  $scope.goToGestor = function () {
    $state.go('headerGestor.home');
  }

});
