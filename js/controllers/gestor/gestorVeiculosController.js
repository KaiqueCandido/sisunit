angular.module('gestorVeiculosController', [])

.controller('gestorVeiculosController', function ($scope, $http, $state, $rootScope, $ionicPopup, $ionicModal, veiculoService) {
  $scope.isVeiculoSelecioando = true;
  $scope.newVeiculo = {};
  $scope.veiculo = {};
  $scope.veiculos = [];

  $scope.getVeiculos = function(){
    veiculoService.listar().then(function sucess(response) {
      $scope.veiculos = response.data;
    }, function error() {
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os veiculos!'});
    });
  }

  $ionicModal.fromTemplateUrl('templates/gestor/modals/modalNovoVeiculo.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modalNovoVeiculo) {
    $scope.modalNovoVeiculo = modalNovoVeiculo;
  });
  $scope.showModalNovoVeiculo = function (){
    $scope.modalNovoVeiculo.show();
  }
  $ionicModal.fromTemplateUrl('templates/gestor/modals/modalEditVeiculo.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modalEditVeiculo) {
    $scope.modalEditVeiculo = modalEditVeiculo;
  });
  $scope.showModalEditVeiculo = function (){
    $scope.modalEditVeiculo.show();
  }

  $scope.salvarNovoVeiculo = function(newVeiculo) {
    veiculoService.salvar(newVeiculo).then(function sucess(response) {
      $ionicPopup.alert({title:'Sucesso', template:'O veiculo de placa ' + newVeiculo.placa + ' foi cadastrado com sucesso!'});
      delete $scope.newVeiculo;
      $scope.getVeiculos();
    }, function error(){
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel salvar o veiculo!'});
    });
  }

  $scope.selecionaVeiculo = function(veiculo) {
    if (veiculo.selected === 'grey'){
      veiculo.selected = 'none';
      $scope.isVeiculoSelecioando = true;
    } else {
      $scope.limpaSelecoes();
      veiculo.selected = 'grey';
      $scope.isVeiculoSelecioando = false;
      $scope.veiculoSelecionado = veiculo;
    }
  }

  $scope.atualizarVeiculo = function(veiculo) {
    veiculoService.atualizar(veiculo).then(function sucesso(response) {
      $ionicPopup.alert({title:'Sucesso', template:'O veiculo de placa ' + veiculo.placa + ' foi atualizado com sucesso!'});
      delete $scope.veiculo;
      $scope.getVeiculos();
    }, function(error) {
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel atualizar os dados do veiculo!'});
    });
  }

  $scope.excluirVeiculo = function() {
    $ionicPopup.confirm({title:'Confirmação', template:'Tem certeza que deseja excluir o veiculo selecionado?'}).then(function(res){
      if (res){
        veiculoService.excluir($scope.veiculoSelecionado).then(function sucess() {
          $ionicPopup.alert({title:'Sucesso', template:'O veiculo foi definido como INATIVO!'});
          $scope.getVeiculos();
        }, function error() {
          $ionicPopup.alert({title:'Problema', template:'Não foi possivel excluir o veiculo selecionado!'});
        });
      }
    });
  }

  $scope.limpaSelecoes = function(){
    $scope.veiculos.forEach(function(currentValue){
      currentValue.selected = 'none';
    });
  }

  $scope.getVeiculos();

});
