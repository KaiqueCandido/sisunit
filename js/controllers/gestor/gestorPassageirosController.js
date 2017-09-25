angular.module('gestorPassageirosController', [])

.controller('gestorPassageirosController', function ($scope, $http, $state, $rootScope, $ionicModal, $ionicPopup, passageiroService) {
  $scope.isPassageiroSelecioando = true;
  $scope.passageiros = [];

  $scope.getPassageiros = function(){
    passageiroService.listar().then(function(response) {
      $scope.passageiros = response.data;
    }, function error() {
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os passageiros!'});
    });
  }

  $ionicModal.fromTemplateUrl('templates/gestor/modals/modalNovoPassageiro.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modalNovoPassageiro) {
    $scope.modalNovoPassageiro = modalNovoPassageiro;
  });
  $scope.novoPassageiro = function (){
    $scope.modalNovoPassageiro.show();
  }

  $ionicModal.fromTemplateUrl('templates/gestor/modals/modalEditPassageiro.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modalEditPassageiro) {
    $scope.modalEditPassageiro = modalEditPassageiro;
  });
  $scope.showFormEditPassageiro = function (){
    $scope.modalEditPassageiro.show();
  }

  $scope.editarPassageiro = function (passageiroAtualizado){
    passageiroService.atualizar(passageiroAtualizado).then(function sucess() {
      $ionicPopup.alert({title:'Sucesso', template:'O passageiro ' + passageiroAtualizado.nome + ' foi atualizado com sucesso!'});
      $scope.isMotoristaSelecioando = true;
      $scope.getPassageiros();
    }, function error() {
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel atualizar o passageiro ' + passageiroAtualizado.nome});
    });
  }

  $scope.excluirPassageiro = function (){
    $ionicPopup.confirm({title:'Confirmação', template:'Você realmente deseja excluir o passageiro ' + $scope.passageiroSelecionado.nome + ' ?'})
    .then(function(res) {
      if (res) {
        passageiroService.excluir($scope.passageiroSelecionado).then(function sucess() {
          $ionicPopup.alert({title:'Sucesso', template:'O passageiro ' + $scope.passageiroSelecionado.nome + ' foi excluido com sucesso!'});
          $scope.isMotoristaSelecioando = true;
          $scope.getPassageiros();
        }, function error() {
          $ionicPopup.alert({title:'Problema', template:'Não foi possivel excluir o passageiro ' + $scope.passageiroSelecionado.nome});
        });
      }
    });
  }

  $scope.selecionaPassageiro = function (passageiro){
    if (passageiro.isSelected === 'grey'){
      passageiro.isSelected = 'none';
      $scope.isPassageiroSelecioando = true;
    } else {
      $scope.limpaSelecoes();
      passageiro.isSelected = 'grey';
      $scope.isPassageiroSelecioando = false;
      $scope.passageiroSelecionado = passageiro;
    }
  }

  $scope.limpaSelecoes = function(){
    $scope.passageiros.forEach(function(currentValue){
      currentValue.isSelected = 'none';
    });
  }

  $scope.getPassageiros();

});
