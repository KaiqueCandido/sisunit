angular.module("starter").config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state("headerPassageiro", {
    url:"/headerPassageiro",
    templateUrl:"templates/passageiro/headerPassageiro.html",
    abstract: true,
    controller: "headerPassageiroController"
  })

  .state("headerPassageiro.home", {
    cache: false,
    url:"/homePassageiro",
    views:{
      'menuContent':{
        templateUrl:"templates/passageiro/homePassageiro.html",
        controller:"homePassageiroController"
      }
    }
  })

  .state("headerPassageiro.veiculos", {
    cache: false,
    url:"/veiculos",
    views:{
      'menuContent':{
        templateUrl:"templates/passageiro/veiculos.html",
        controller:"passageiroVeiculosController"
      }
    }
  })

  .state("headerPassageiro.alterarSenha", {
    cache: false,
    url:"/alterarSenha",
    views:{
      'menuContent':{
        templateUrl:"templates/passageiro/alterarSenha.html",
        controller:"passageiroAlterarSenhaController"
      }
    }
  })

});
