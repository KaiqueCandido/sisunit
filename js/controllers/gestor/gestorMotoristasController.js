angular.module('gestorMotoristasController', [])

.controller('gestorMotoristasController', function ($scope, $http, $state, $rootScope, $ionicPopup, $ionicModal, motoristaService) {
  $scope.isMotoristaSelecioando = true;
  $scope.motoristas = [];

  $scope.getMotoristas = function(){
    motoristaService.listar().then(function sucess(response) {
      $scope.motoristas = response.data;      
    }, function error(){
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os motoristas!'});
    });
  }

  $ionicModal.fromTemplateUrl('templates/gestor/modals/modalNovoMotorista.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modalNovoMotorista) {
    $scope.modalNovoMotorista = modalNovoMotorista;
  });
  $scope.showModalNovoMotorista = function (){
    $scope.modalNovoMotorista.show();
  }
  $ionicModal.fromTemplateUrl('templates/gestor/modals/modalEditMotorista.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modalEditMotorista) {
    $scope.modalEditMotorista = modalEditMotorista;
  });
  $scope.showModalEditMotorista = function (){
    $scope.modalEditMotorista.show();
  }

  $scope.salvarNovoMotorista = function(newMotorista) {
    console.log(newMotorista);
    motoristaService.salvar(newMotorista).then(function sucess(response) {
      $ionicPopup.alert({title:'Sucesso', template:'O motorista foi cadastrado com sucesso!'});
      $scope.getMotoristas();
    }, function error(){
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel salvar o motorista!'});
    });
  }

  $scope.selecionaMotorista = function(motorista) {
    if (motorista.selected === 'grey'){
      motorista.selected = 'none';
      $scope.isMotoristaSelecioando = true;
    } else {
      $scope.limpaSelecoes();
      motorista.selected = 'grey';
      $scope.isMotoristaSelecioando = false;
      $scope.motoristaSelecionado = motorista;      
    }
  }

  $scope.atualizarMotorista = function(motorista) {    
    motoristaService.atualizar(motorista).then(function sucesso(response) {
      console.log(motorista);
      $ionicPopup.alert({title:'Sucesso', template:'O motorista foi atualizado com sucesso!'});
      $scope.getMotoristas();
    }, function(error) {
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel atualizar os dados do motorista!'});
    });
  }

  $scope.excluirMotorista = function() {
    $ionicPopup.confirm({title:'Confirmação', template:'Tem certeza que deseja excluir o motorista selecionado?'}).then(function(res){
      if (res){
        motoristaService.excluir($scope.motoristaSelecionado).then(function sucess() {
          $ionicPopup.alert({title:'Sucesso', template:'O motorista foi definido como INATIVO!'});
          $scope.getMotoristas();
        }, function error() {
          $ionicPopup.alert({title:'Problema', template:'Não foi possivel excluir o motorista selecionado!'});
        });
      }
    });
  }

  $scope.limpaSelecoes = function(){
    $scope.motoristas.forEach(function(currentValue){
      currentValue.selected = 'none';
    });
  }

  $scope.getMotoristas();

});
