function dealCtrl($scope, $state, $stateParams, $ionicSlideBoxDelegate, $cordovaSocialSharing, dealsFactory) {

  // Favorites

  $scope.favory = false;

  $scope.toggleFavorite = function() {
    if ($scope.favory) {
      dealsFactory.favorites.splice(dealsFactory.favorites.indexOf($scope.dealsInShop[$scope.activeIndex]), 1);
      $scope.favory = false;
    } else {
      if (dealsFactory.favorites.indexOf($scope.dealsInShop[$scope.activeIndex]._id) < 0) {
        dealsFactory.favorites.push($scope.dealsInShop[$scope.activeIndex]);
        $scope.favory = true;
      }
    }
  };

  $scope.isFavorite = function() {
    if (dealsFactory.favorites.indexOf($scope.dealsInShop[$scope.activeIndex]) > -1) {
      $scope.favory = true;
    }
  };

  // Share functions

  $scope.shareAnywhere = function() {
    $cordovaSocialSharing.share("Description de l'offre " + $scope.shop.deals[0].name + ":" + $scope.shop.deals[0].description, "Partage de l'offre: " + $scope.shop.deals[0].name, 'http://goodil.ibangf.ovh/' + $scope.shop.deals[0].image, "Offre partagée via l'application GOODIL.Téléchargez l'application sur: http://www.goodil.fr");
  };

  // Slider

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
    $scope.activeIndex = data.activeIndex;
    $scope.isFavorite();
  });


  // Get deals in Shop

  if ($stateParams.shopID) {
    $scope.dealsInShop = [];
    for (var i = 0; i < dealsFactory.deals.length; i++) {
      if (dealsFactory.deals[i].shop && dealsFactory.deals[i].shop._id == $stateParams.shopID) {
        $scope.dealsInShop.push(dealsFactory.deals[i]);
      }
    }
  }

  // Display selected view

  if ($stateParams.dealID) {
    for (var j = 0; j < $scope.dealsInShop.length; j++) {
      if ($scope.dealsInShop[j]._id == $stateParams.dealID) {
        $scope.activeIndex = j;
        $scope.isFavorite();
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
    $state.go('tab.mapDeals', {
      lat: deal.shop.point.coordinates[0],
      lng: deal.shop.point.coordinates[1]
    }, {
      reload: true
    });
  };
}
