angular.module('passageiroVeiculosController', [])
.controller('passageiroVeiculosController', function ($scope, $http, $state, $rootScope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/passageiro/modals/passageiroDetalhesVeiculo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.abrirVeiculoDialog = function(veiculo){
    console.log(veiculo.motorista)
    $scope.veiculoSelecionado = veiculo;
    $scope.openModal();
  }

  $scope.soliciouParticipacao = {
    condicao : false,
    estado : "Solicitar participação?",
    cor : "grey"
  };

  $scope.solicitarParticipacao = function () {
    if ($scope.soliciouParticipacao.condicao === true){
      $scope.soliciouParticipacao.condicao = false;
      $scope.soliciouParticipacao.estado = "Solicitação cancelada!";
      $scope.soliciouParticipacao.cor = "grey";
    } else if ($scope.soliciouParticipacao.condicao === false){
        $scope.soliciouParticipacao.condicao = true;
        $scope.soliciouParticipacao.estado = "Solicitação enviada!";
        $scope.soliciouParticipacao.cor = "gree";
    }
  }

  $scope.veiculos = [
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
    {identificacao:"identificacao 1", motorista:"motorista 1", turno:"turno", placa:"placa", status:"status"},
  ]


});
