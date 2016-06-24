function favoriteCtrl($scope, $state, $window, $stateParams, $ionicModal, $ionicSlideBoxDelegate, $cordovaSocialSharing, dealsFactory) {

  // Favorites

  $scope.favory = true;
  $scope.favories = dealsFactory.favorites;

  $scope.removeFavorite = function() {
    dealsFactory.favorites.splice(dealsFactory.favorites.indexOf($scope.dealsInShop[$scope.activeIndex]), 1);
    $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
  };

  $scope.shareAnywhere = function() {
    // $cordovaSocialSharing.share("Description de l'offre " + $scope.shop.deals[0].name + ":" + $scope.shop.deals[0].description, "Partage de l'offre: " + $scope.shop.deals[0].name, 'http://goodil.ibangf.ovh/' + $scope.shop.deals[0].image, "Offre partagée via l'application GOODIL.Téléchargez l'application sur: http://www.goodil.fr");
  };

  // Slider

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
    $scope.activeIndex = data.activeIndex;
  });

  // Display selected deal

  if ($stateParams.dealID) {
    for (var j = 0; j < dealsFactory.favorites.length; j++) {
      if (dealsFactory.favorites[j]._id == $stateParams.dealID) {
        $scope.activeIndex = j;
        break;
      }
    }
    setTimeout(function() {
      $ionicSlideBoxDelegate.slide(j);
      $ionicSlideBoxDelegate.update();
      $scope.$apply();
    });
  }

  // Go to map view

  $scope.goToMap = function(deal) {
    console.log(deal);
    $state.go('tab.mapFavorites', {
      lat: deal.shop.point.coordinates[0],
      lng: deal.shop.point.coordinates[1]
    }, {
      reload: true
    });
  };

  // Deal modal

  $ionicModal.fromTemplateUrl('templates/modal-deal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    return $scope.modal = modal;
  });

  $scope.openModal = function(deal) {
    $scope.deal = deal;
    return $scope.modal.show();
  };

  $scope.closeModal = function() {
    return $scope.modal.hide();
  };

}
