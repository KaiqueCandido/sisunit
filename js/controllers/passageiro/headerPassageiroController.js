angular.module('headerPassageiroController', [])
.controller('headerPassageiroController', function ($scope, $http, $state, $rootScope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/passageiro/modals/passageiroNotificacoes.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(popover) {
    $scope.passageiroNotificacoes = popover;
  });

  $ionicPopover.fromTemplateUrl('templates/passageiro/modals/VoceNaoPossuiNotificacoes.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(popover) {
    $scope.passageiroVoceNaoPossuiNotificacoes = popover;
  });

  $scope.abrirNotificacoes = function($event) {
    $scope.passageiroNotificacoes.show($event);
  };

  $scope.voceNaoPossuiNotificacoes = function($event) {
    $scope.passageiroVoceNaoPossuiNotificacoes.show($event);
  };

  $scope.verificaSeHaNotificcoes = function() {
    return $scope.notificacoes.length > 0;
  };

  $scope.inicio = function () {
    $state.go('headerPassageiro.home');
  }

  $scope.veiculos = function () {
    $state.go('headerPassageiro.veiculos');
  }


  $scope.alterarSenha = function () {
    $state.go('headerPassageiro.alterarSenha');
  }

  $scope.logout = function () {
    $state.go('login');
  }

  $scope.notificacoes = [
    {id:'id', notificacao:'Vou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porra!Vou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porra!'},
    {id:'id', notificacao:'Vou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porra!'},
    {id:'id', notificacao:'Vou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porraVou terminar essa porra!'}
  ]

});
