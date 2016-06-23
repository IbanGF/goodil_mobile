function categoryCtrl($scope, $state, $stateParams, $ionicSlideBoxDelegate, $cordovaSocialSharing, dealsFactory) {


  // Favorites

  $scope.isFavorite = function(deal) {
    if (dealsFactory.favorites.indexOf(deal) > -1)
      return true;
  };

  $scope.toggleFavorite = function(deal) {
    if ($scope.isFavorite(deal)) {
      dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
    } else {
      if (dealsFactory.favorites.indexOf(deal._id) < 0) {
        dealsFactory.favorites.push(deal);
      }
    }
  };

  $scope.removeFavorite = function(deal) {
    dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
  };

  // Favorites in deal

  $scope.favory = false;

  $scope.toggleFavoriteInDeal = function() {
    if ($scope.favory) {
      dealsFactory.favorites.splice(dealsFactory.favorites.indexOf($scope.dealsInCategory[$scope.activeIndex]), 1);
      $scope.favory = false;
    } else {
      if (dealsFactory.favorites.indexOf($scope.dealsInCategory[$scope.activeIndex]._id) < 0) {
        dealsFactory.favorites.push($scope.dealsInCategory[$scope.activeIndex]);
        $scope.favory = true;
      }
    }
  };

  $scope.isFavoriteInDeal = function() {
    if (dealsFactory.favorites.indexOf($scope.dealsInCategory[$scope.activeIndex]) > -1) {
      $scope.favory = true;
    }
  };

  // Share functions

  $scope.shareAnywhere = function() {
    $cordovaSocialSharing.share("Description de l'offre " + $scope.shop.deals[0].name + ":" + $scope.shop.deals[0].description, "Partage de l'offre: " + $scope.shop.deals[0].name, 'http://goodil.ibangf.ovh/' + $scope.shop.deals[0].image, "Offre partagée via l'application GOODIL.Téléchargez l'application sur: http://www.goodil.fr");
  };

  // Slider

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
    $scope.activeIndex = data.activeIndex;
    $scope.isFavoriteInDeal();
  });

  // Get selected category name

  if ($stateParams.categoryName) {
    $scope.categoryName = $stateParams.categoryName;
  }

  // Get deals in Category

  if ($stateParams.categoryID) {
    $scope.dealsInCategory = [];
    for (var i = 0; i < dealsFactory.deals.length; i++) {
      if (dealsFactory.deals[i].subCategory.category._id && dealsFactory.deals[i].subCategory.category._id == $stateParams.categoryID) {
        $scope.dealsInCategory.push(dealsFactory.deals[i]);
      }
    }
  }

  // Display selected view

  if ($stateParams.dealID) {
    for (var j = 0; j < $scope.dealsInCategory.length; j++) {
      if ($scope.dealsInCategory[j]._id == $stateParams.dealID) {
        $scope.activeIndex = j;
        $scope.isFavoriteInDeal();
        break;
      }
    }
    setTimeout(function() {
      $ionicSlideBoxDelegate.slide(j);
      $ionicSlideBoxDelegate.update();
      $scope.$apply();
    });
  }

  // Go to view Deal

  $scope.goToDeal = function(deal) {
    $state.go('tab.categoryDeal', {
      categoryID: $stateParams.categoryID,
      dealID: deal._id,
      categoryName: $stateParams.categoryName
    });
  };

  // Go to map view

  $scope.goToMap = function(deal) {
    console.log(deal);
    $state.go('tab.mapCategories', {
      lat: deal.shop.point.coordinates[0],
      lng: deal.shop.point.coordinates[1]
    }, {
      reload: true
    });
  };
}
