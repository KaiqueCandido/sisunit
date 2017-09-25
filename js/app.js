angular.module('starter', [
  'ionic',
  'uiDateDirective',
  'ngMask',
  'baseUrl',
  'veiculoService',
  'pontoDeParadaService',
  'passageiroService',
  'motoristaService',
  'rotaService',
  'loginController',
  'headerPassageiroController',
  'homePassageiroController',
  'headerMotoristaController',
  'homeMotoristaController',
  'headerGestorController',
  'homeGestorController',
  'passageiroAlterarSenhaController',
  'passageiroVeiculosController',
  'motoristaAlterarSenhaController',
  'motoristaVeiculosController',
  'gestorAlterarSenhaController',
  'gestorMotoristasController',
  'gestorPassageirosController',
  'gestorPontosDeParadaController',
  'gestorRotasController',
  'gestorVeiculosController'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
