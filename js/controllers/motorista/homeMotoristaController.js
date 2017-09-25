angular.module('homeMotoristaController', [])

.controller('homeMotoristaController', function ($scope, $http, $state, $rootScope, $ionicPopup) {
  $scope.inicializarMap = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 15
      });
      directionsDisplay.setMap(map);

      var origemRota = new google.maps.LatLng(myLatLng.lat, myLatLng.lng);
      var fimRota = new google.maps.LatLng(-6.889861, -38.545258);

      $scope.pontos = [
        {location: new google.maps.LatLng(-6.899267,-38.548546), stopover: true},
        {location: new google.maps.LatLng(-6.897915,-38.563706), stopover: true},
        {location: new google.maps.LatLng(-6.889861,-38.545258), stopover: true}
      ]

      directionsService.route({
        origin: origemRota,
        destination: fimRota,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: $scope.pontos,
        optimizeWaypoints: true
      }, function(response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      // var icone = 'resourcers/marker_bus.png';
      // var marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map,
      //   icon: icone
      // });
    })
  }

  $scope.solicitarParticipacao = function(){
    $ionicPopup.confirm(
      {title: 'Confirmação!', template: 'Deseja realmente solicitar a confirmação dos passageiros ?'}
    ).then(function(res){
      if (res){
        $ionicPopup.alert({title: 'Sucesso!', template: 'Sua solicitaçao foi enviada com sucesso!'});
      }
    })
  }

  $scope.inicializarMap();
});
