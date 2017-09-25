angular.module('passageiroAlterarSenhaController', [])
.controller('passageiroAlterarSenhaController', function ($scope, $http, $state, $rootScope, $ionicPopup) {

  $scope.cancelarAlteracaoDeenha = function () {
    $state.go('headerPassageiro.home');
  }

  $scope.alterarSenha = function (senhaAntiga, novaSenha, confirmarNovaSenha) {
    if (typeof senhaAntiga != "undefined" && typeof novaSenha != "undefined" && typeof confirmarNovaSenha != "undefined"){
      if (novaSenha === confirmarNovaSenha){
        if (novaSenha != senhaAntiga){
          $ionicPopup.confirm(
            {title: 'Confirmação!', template: 'Deseja realmente alterar sua senha ?'}
          ).then(function(res){
            if (res){
              $ionicPopup.alert({title: 'Sucesso!', template: 'Sua senha foi alterada com sucesso!'});
              $state.reload();
            }
          });
        } else {
          $ionicPopup.alert({title: 'Problema!', template: 'A nova senha precisa ser diferente da senha antiga!'});
        }
      } else {
        $ionicPopup.alert({title: 'Problema!', template: 'As senhas informadas não batem!'});
      }
    } else {
      if (typeof senhaAntiga === "undefined") $ionicPopup.alert({title: 'Aviso!', template: 'O campo Senha antiga é necessaria!'});
      else if (typeof novaSenha === "undefined") $ionicPopup.alert({title: 'Aviso!', template: 'O campo Nova senha é necessaria!'});
      else $ionicPopup.alert({title: 'Aviso!', template: 'O campo Confirmar nova senha é necessaria!'});
    }
  }
});
