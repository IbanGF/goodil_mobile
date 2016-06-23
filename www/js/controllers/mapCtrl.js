function mapCtrl($scope, $state, $stateParams, $http) {

  console.log($stateParams.lng);

  if ($stateParams.lat) {
    var mapOptions = {

      center: {
        lat: parseFloat($stateParams.lat),
        lng: parseFloat($stateParams.lng)
      },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {
        lat: parseFloat($stateParams.lat),
        lng: parseFloat($stateParams.lng)
      }
    });
  }
}
