angular.module("starter").config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state("headerGestor", {
    url:"/headerGestor",
    templateUrl:"templates/gestor/headerGestor.html",
    abstract: true,
    controller: "headerGestorController"
  })

  .state("headerGestor.home", {
    cache: false,
    url:"/homeGestor",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/homeGestor.html",
        controller:"homeGestorController"
      }
    }
  })

  .state("headerGestor.veiculos", {
    cache: false,
    url:"/gestorVeiculos",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/veiculos.html",
        controller:"gestorVeiculosController"
      }
    }
  })

  .state("headerGestor.motoristas", {
    cache: false,
    url:"/gestorMotoristas",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/motoristas.html",
        controller:"gestorMotoristasController"
      }
    }
  })

  .state("headerGestor.passageiros", {
    cache: false,
    url:"/gestorPassageiros",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/passageiros.html",
        controller:"gestorPassageirosController"
      }
    }
  })

  .state("headerGestor.rotas", {
    cache: false,
    url:"/gestorRotas",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/rotas.html",
        controller:"gestorRotasController"
      }
    }
  })

  .state("headerGestor.pontosDeParada", {
    cache: false,
    url:"/gestorPontosDeParada",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/pontosDeParada.html",
        controller:"gestorPontosDeParadaController"
      }
    }
  })

  .state("headerGestor.alterarSenha", {
    cache: false,
    url:"/gestorAlterarSenha",
    views:{
      'menuContent':{
        templateUrl:"templates/gestor/alterarSenha.html",
        controller:"gestorAlterarSenhaController"
      }
    }
  })

});
