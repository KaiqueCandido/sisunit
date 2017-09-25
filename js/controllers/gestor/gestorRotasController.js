angular.module('gestorRotasController', [])

.controller('gestorRotasController', function ($scope, $http, $state, $rootScope, $ionicPopup,
  $ionicModal, rotaService, motoristaService, veiculoService, pontoDeParadaService) {
    $scope.isRotaSelecionada = true;
    $scope.rotas = [];
    $scope.motoristas = [];
    $scope.veiculos = [];
    $scope.pontosDeparada = [];
    $scope.pontosDeparadaSelecionados = [];
    var map;

    $scope.getRotas = function() {
      rotaService.listar().then(function sucess(response) {
        console.log('Imprimindo Response');
        console.log(response);
        $scope.rotas = response.data;
      }, function error(response) {
        console.log('Imprimindo Erro Response');
        console.log(response);
        $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar as rotas!'});
      });
    }

    $scope.getMotoristas = function() {
      motoristaService.listar().then(function sucess(response) {
        $scope.motoristas = response.data;
      }, function error() {
        $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os motoristas!'});
      });
    }

    $scope.getVeiculos = function() {
      veiculoService.listar().then(function sucess(response) {
        $scope.veiculos = response.data;
      }, function error() {
        $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os veiculos!'});
      });
    }

    $scope.getPontosDeParada = function() {
      pontoDeParadaService.listar().then(function sucess(response) {
        $scope.pontosDeparada = response.data;
      }, function error() {
        $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os pontos de parada!'});
      });
    }

    $scope.inserirPontosNoMapa = function() {
      navigator.geolocation.getCurrentPosition( function (position) {
        var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
          center: myLatlng,
          zoom: 13
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var infowindow = new google.maps.InfoWindow({
          maxWidth: 250
        });

        $scope.pontosDeparada.forEach(function(currentValue){
          var marker = new google.maps.Marker({
            position:new google.maps.LatLng(currentValue.latitude, currentValue.longitude),
            map:map
          });
          marker.setAttribution({source:currentValue.id.toString()});

          marker.addListener('click', function(event){
            if(typeof marker.getIcon() === 'undefined' || marker.getIcon() === null) {
              marker.setIcon("resourcers/ponto_selecionado.png");
              addPontoSelecionado(marker.getAttribution().source);
            } else {
              marker.setIcon(null);
              removePontoSelecionado(marker.getAttribution().source);
            }
          });
          marker.addListener('mousemove', function(){
            var conteudoMarker ='<div><p><strong>Ponto de parada: </strong>' + currentValue.nome + '</p>';
            infowindow.setContent(conteudoMarker);
            infowindow.open(map, this);
          });
          marker.addListener('mouseout', function(){
            infowindow.close();
          });
        });
      });
    }

    $scope.inserirPontosEditaveisNoMapa = function() {
      console.log($scope.rotaSelecionada.pontosDeParada[0].latitude);
      console.log($scope.rotaSelecionada.pontosDeParada[0].longitude);
        var myLatlng = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[0].latitude, $scope.rotaSelecionada.pontosDeParada[0].longitude);
        var mapOptions = {
          center: myLatlng,
          zoom: 13
        };
        var mapEdit = new google.maps.Map(document.getElementById("mapEdit"), mapOptions);

        // var infowindow = new google.maps.InfoWindow({
        //   maxWidth: 250
        // });
        //
        // $scope.pontosDeparada.forEach(function(currentValue){
        //   var marker = new google.maps.Marker({
        //     position:new google.maps.LatLng(currentValue.latitude, currentValue.longitude),
        //     map:map
        //   });
        //   marker.setAttribution({source:currentValue.id.toString()});
        //
        //   marker.addListener('click', function(event){
        //     if(typeof marker.getIcon() === 'undefined' || marker.getIcon() === null) {
        //       marker.setIcon("resourcers/ponto_selecionado.png");
        //       addPontoSelecionado(marker.getAttribution().source);
        //     } else {
        //       marker.setIcon(null);
        //       removePontoSelecionado(marker.getAttribution().source);
        //     }
        //   });
        //   marker.addListener('mousemove', function(){
        //     var conteudoMarker ='<div><p><strong>Ponto de parada: </strong>' + currentValue.nome + '</p>';
        //     infowindow.setContent(conteudoMarker);
        //     infowindow.open(map, this);
        //   });
        //   marker.addListener('mouseout', function(){
        //     infowindow.close();
        //   });
        // });
    }

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    desenharRotaAoSelecionarOsPontosDeParada = function() {
      if ($scope.pontosDeparadaSelecionados.length > 1){
        directionsDisplay.setMap(map);
        directionsDisplay.setOptions( { suppressMarkers: true } );
        var origemRota = new google.maps.LatLng($scope.pontosDeparadaSelecionados[0].latitude, $scope.pontosDeparadaSelecionados[0].longitude);
        var fimRota = new google.maps.LatLng($scope.pontosDeparadaSelecionados[$scope.pontosDeparadaSelecionados.length-1].latitude, $scope.pontosDeparadaSelecionados[$scope.pontosDeparadaSelecionados.length-1].longitude);

        $scope.pontosParaDesenharARota = [];
        $scope.pontosDeparadaSelecionados.forEach(function(currentValue) {
          $scope.pontosParaDesenharARota.push({location: new google.maps.LatLng(currentValue.latitude,currentValue.longitude), stopover: true});
        });

        directionsService.route({
          origin: origemRota,
          destination: fimRota,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: $scope.pontosParaDesenharARota,
          optimizeWaypoints: true
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      } else if ($scope.pontosDeparadaSelecionados.length < 1){
        directionsDisplay.setMap(null);
      }
    }

    addPontoSelecionado = function(id){
      $scope.pontosDeparada.forEach(function(currentValue){
        if (currentValue.id === parseInt(id)){
          $scope.pontosDeparadaSelecionados.push(currentValue);
          desenharRotaAoSelecionarOsPontosDeParada();
        }
      });
    }

    removePontoSelecionado = function(id) {
      $scope.pontosDeparadaSelecionados = $scope.pontosDeparadaSelecionados.filter(function (pontoDeParada) {
        if (pontoDeParada.id != parseInt(id)) return pontoDeParada;
      });
      desenharRotaAoSelecionarOsPontosDeParada();
    }

    $scope.salvarNovaRota = function(rota) {
      console.log('rota1 ->' + rota);
      $ionicPopup.confirm(
        {title: 'Confirmação!', template: 'Deseja realmente salvar esta rota ?'}
      ).then(function(res){
        if (res){
          if ($scope.pontosDeparadaSelecionados.length > 1){
            rota.pontosDeParada = $scope.pontosDeparadaSelecionados;
            rotaService.salvar(rota).then(function sucess(response) {
              $ionicPopup.alert({title: 'Sucesso!', template: 'Rota cadastrada com sucesso!'});
              $scope.getRotas();
            }, function error() {
              $ionicPopup.alert({title: 'Prblema!', template: 'Não foi possivel salvar a rota. Por favor tente novamente!'});
            });
          } else {
            $ionicPopup.alert({title: 'Prblema!', template: 'Selecione no minimo dois pontos!'});
          }
        }
      })
    }

    $ionicModal.fromTemplateUrl('templates/gestor/modals/modalNovaRota.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modalNovaRota) {
      $scope.modalNovaRota = modalNovaRota;
    });
    $scope.showModalNovaRota = function (){
      $scope.getMotoristas();
      $scope.getVeiculos();
      $scope.getPontosDeParada();
      $scope.inserirPontosNoMapa();
      $scope.modalNovaRota.show();
    }

    $ionicModal.fromTemplateUrl('templates/gestor/modals/modalEditRota.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modalEditRota) {
      $scope.modalEditRota = modalEditRota;
    });
    $scope.showModalEditRota = function (){
      $scope.inserirPontosEditaveisNoMapa();
      $scope.modalNovaRota.show();
    }

    $scope.selecionaRota = function(rota) {
      if (rota.selected === 'grey'){
        rota.selected = 'none';
        $scope.isRotaSelecionada = true;
      } else {
        $scope.limpaSelecoes();
        rota.selected = 'grey';
        $scope.isRotaSelecionada = false;
        $scope.rotaSelecionada = rota;
      }
    }

    $scope.limpaSelecoes = function(){
      $scope.rotas.forEach(function(currentValue){
        currentValue.selected = 'none';
      });
    }

    $scope.getRotas();

  });
