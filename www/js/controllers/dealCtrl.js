function dealCtrl($scope, $state, $stateParams, $window, $ionicSlideBoxDelegate, $ionicModal, $cordovaSocialSharing, dealsFactory) {

  // Favorites

  $scope.favory = false;

  $scope.toggleFavorite = function() {
    if ($scope.favory) {
      dealsFactory.favorites.splice(dealsFactory.favorites.indexOf($scope.dealsInShop[$scope.activeIndex]), 1);
      $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
      $scope.favory = false;
    } else {
      if (dealsFactory.favorites.indexOf($scope.dealsInShop[$scope.activeIndex]._id) < 0) {
        dealsFactory.favorites.push($scope.dealsInShop[$scope.activeIndex]);
        $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
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
    $cordovaSocialSharing.shareViaEmail("Description de l'offre " + $scope.dealsInShop[$scope.activeIndex].name + ":" + $scope.dealsInShop[$scope.activeIndex].description, "Partage de l'offre: " + $scope.dealsInShop[$scope.activeIndex].name, '', '', '', $scope.dealsInShop[$scope.activeIndex].image);
    $cordovaSocialSharing.shareViaTwitter("Description de l'offre " + $scope.dealsInShop[$scope.activeIndex].name + ":" + $scope.dealsInShop[$scope.activeIndex].description, "Partage de l'offre: " + $scope.dealsInShop[$scope.activeIndex].name, $scope.dealsInShop[$scope.activeIndex].image, 'http://www.goodil.fr');
    // $cordovaSocialSharing.shareViaSMS("Description de l'offre " + $scope.dealsInShop[$scope.activeIndex].name + ":" + $scope.dealsInShop[$scope.activeIndex].description, "Partage de l'offre: " + $scope.dealsInShop[$scope.activeIndex].name);
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
