angular.module('gestorPontosDeParadaController', [])

.controller('gestorPontosDeParadaController', function ($scope, $http, $state, $rootScope, $ionicModal, $ionicPopup, pontoDeParadaService) {
  $scope.isPontoDeParadaSelecioando = true;
  $scope.pontos = [];

  $scope.getPontosDeParada = function(){
    pontoDeParadaService.listar().then(function success(response) {
      $scope.pontos = response.data;
    }, function error() {
      $ionicPopup.alert({title:'Problema', template:'Não foi possivel carregar os pontos de parada!'});
    });
  }

  $ionicModal.fromTemplateUrl('templates/gestor/modals/pontoDeParada/NovoPontoDeParada.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: false
  }).then(function(NovoPontoDeParada) {
    $scope.NovoPontoDeParada = NovoPontoDeParada;
  });
  $ionicModal.fromTemplateUrl('templates/gestor/modals/pontoDeParada/VisualizarPontoDeParada.html', {
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(VisualizarPontoDeParada) {
    $scope.VisualizarPontoDeParada = VisualizarPontoDeParada;
  });
  $ionicModal.fromTemplateUrl('templates/gestor/modals/pontoDeParada/EditarPontoDeParada.html', {
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(EditarPontoDeParada) {
    $scope.EditarPontoDeParada = EditarPontoDeParada;
  });

  $scope.showModalNovoPontoDeParada = function (){
    $scope.NovoPontoDeParada.show();
    $scope.inicializaMap();
  }
  $scope.showModalVisualizarPontoDeParada = function (){
    $scope.VisualizarPontoDeParada.show();
    $scope.inicializaVisualizarPontoDeParadaMap();
  }
  $scope.showModalEditarPontoDeParada = function (){
    $scope.EditarPontoDeParada.show();
    $scope.inicializaEditarPontoDeParadaMap();
  }

  $scope.inicializaMap = function() {
    navigator.geolocation.getCurrentPosition( function (position) {
      var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var mapOptions = {
        center: myLatlng,
        zoom: 16
      };
      var map = new google.maps.Map(document.getElementById("mapNovoPonto"), mapOptions);
      var marker = new google.maps.Marker({position:myLatlng, map:map, draggable: true});

      $scope.latLngPontoDeParada = {lat:myLatlng.lat(), lng:myLatlng.lng()};
      marker.addListener('dragend', function(event){
        $scope.latLngPontoDeParada = {lat:event.latLng.lat(), lng:event.latLng.lng()}
      })
    });
  };
  $scope.inicializaVisualizarPontoDeParadaMap = function() {
    var pontoPosition = new google.maps.LatLng($scope.pontoDeParadaSelecionado.latitude, $scope.pontoDeParadaSelecionado.longitude);
    var mapOptions = {
      center: pontoPosition,
      zoom: 16
    };
    var map = new google.maps.Map(document.getElementById("mapVizualizarPonto"), mapOptions);
    var marker = new google.maps.Marker({position:pontoPosition, map:map});

    var conteudoMarker = '<div align="center"><strong>Detalhes</strong></div><br/>'+
    '<div><p><strong>Nome: </strong>' + $scope.pontoDeParadaSelecionado.nome + '</p>' +
    '<p><strong>Referencia: </strong>' + $scope.pontoDeParadaSelecionado.referencia + '</p></div>';
    var infowindow = new google.maps.InfoWindow({
      content: conteudoMarker,
      maxWidth: 200
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  };
  $scope.inicializaEditarPontoDeParadaMap = function() {
    var pontoPosition = new google.maps.LatLng($scope.pontoDeParadaSelecionado.latitude, $scope.pontoDeParadaSelecionado.longitude);
    var mapOptions = {
      center: pontoPosition,
      zoom: 16
    };
    var map = new google.maps.Map(document.getElementById("mapEditarPonto"), mapOptions);
    var marker = new google.maps.Marker({position:pontoPosition, map:map, draggable: true});

    marker.addListener('dragend', function(event){
      $scope.pontoDeParadaSelecionado.latitude = event.latLng.lat();
      $scope.pontoDeParadaSelecionado.longitude = event.latLng.lng();
    })
  };

  $scope.salvarNovoPontoDeParada = function(pontoDeParada) {
    $ionicPopup.confirm(
      {title: 'Confirmação!', template: 'Deseja realmente salvar este ponto de parada ?'}
    ).then(function(res){
      if (res){
        pontoDeParada.latitude = $scope.latLngPontoDeParada.lat;
        pontoDeParada.longitude = $scope.latLngPontoDeParada.lng;
        pontoDeParadaService.salvar(pontoDeParada).then(function sucess(response) {
          $ionicPopup.alert({title:'Sucesso', template:'Ponto de parada salvo com sucesso!'});
          $scope.getPontosDeParada();
        }, function error(){
          $ionicPopup.alert({title:'Problema', template:'Não foi possivel salvar o Ponto de parada, por favor tente novamente!'});
        });
      }
    });
  }

  $scope.editarPontoDeParada = function(pontoDeParada) {
    $ionicPopup.confirm(
      {title: 'Confirmação!', template: 'Deseja realmente atualizar este ponto de parada ?'}
    ).then(function(res){
      if (res){
        pontoDeParadaService.atualizar(pontoDeParada).then(function sucess(response) {
          $ionicPopup.alert({title:'Sucesso', template:'Ponto de parada atualizado com sucesso!'});
          $scope.getPontosDeParada();
        }, function error(){
          $ionicPopup.alert({title:'Problema', template:'Não foi possivel atualizar o Ponto de parada, por favor tente novamente!'});
        });
      }
    });
  }

  $scope.selecionaPontoDeParada = function(ponto) {
    if (ponto.isSelected === 'grey'){
      ponto.isSelected = 'none';
      $scope.isPontoDeParadaSelecioando = true;
    } else {
      $scope.limpaSelecoes();
      ponto.isSelected = 'grey';
      $scope.isPontoDeParadaSelecioando = false;
      $scope.pontoDeParadaSelecionado = ponto;
    }
  }

  $scope.limpaSelecoes = function(){
    $scope.pontos.forEach(function(currentValue){
      currentValue.isSelected = 'none';
    });
  }

  $scope.getPontosDeParada();

});
