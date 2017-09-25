angular.module("starter").config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state("headerMotorista", {
    url:"/headerMotorista",
    templateUrl:"templates/motorista/headerMotorista.html",
    abstract: true,
    controller: "headerMotoristaController"
  })

  .state("headerMotorista.home", {
    cache: false,
    url:"/homeMotorista",
    views:{
      'menuContent':{
        templateUrl:"templates/motorista/homeMotorista.html",
        controller:"homeMotoristaController"
      }
    }
  })

  .state("headerMotorista.veiculos", {
    cache: false,
    url:"/homeVeiculos",
    views:{
      'menuContent':{
        templateUrl:"templates/motorista/veiculos.html",
        controller:"motoristaVeiculosController"
      }
    }
  })

  .state("headerMotorista.alterarSenha", {
    cache: false,
    url:"/alterarSenha",
    views:{
      'menuContent':{
        templateUrl:"templates/motorista/alterarSenha.html",
        controller:"motoristaAlterarSenhaController"
      }
    }
  })

});
