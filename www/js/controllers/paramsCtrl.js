function paramsCtrl($scope, $window, dealsService, dealsFactory) {

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address-input'));

  dealsService.findAllBVsName().then(function(res){
    $scope.bassinDeVies = res.data;
    console.log(res.data);
  });

  $scope.selectBassinDeVie = function(selectedBassinDeVie) {
    console.log(selectedBassinDeVie);
    dealsFactory.parameters.selectedBassinDeVie = selectedBassinDeVie;
    $window.localStorage.setItem("parameters", JSON.stringify(dealsFactory.parameters));
  };

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    var codePostal = place.address_components[place.address_components.length - 1].long_name;

    dealsService.findOneBV(codePostal).then(function(res) {
      dealsFactory.parameters.selectedBassinDeVie = res.data;
      $window.localStorage.setItem("parameters", JSON.stringify(dealsFactory.parameters));
    });
  });

}
