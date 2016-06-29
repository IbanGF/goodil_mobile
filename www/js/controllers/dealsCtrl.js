function dealsCtrl($scope, $state, $window, dealsFactory, dealsService) {

  $scope.loading = false;

  $window.localStorage.favories = $window.localStorage.favories || "[]";
  dealsFactory.favorites = JSON.parse($window.localStorage.favories);


  $window.localStorage.parameters = $window.localStorage.parameters || "{}";
  dealsFactory.parameters = JSON.parse($window.localStorage.parameters);
  $scope.selectedBassinDeVie = dealsFactory.parameters.selectedBassinDeVie.name;


  $scope.onRefresh = function() {
    dealsService.getDeals()
      .then(function(res) {
        $scope.deals = res.data;
        dealsFactory.deals = $scope.deals;
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

  // Get All Deals

  if (dealsFactory.deals) {
    $scope.deals = dealsFactory.deals;
  } else {
    $scope.loading = true;
    dealsService.getDealsInBV(dealsFactory.parameters.selectedBassinDeVie._id).then(function(res) {
      console.log('deals');
      console.log(res.data);
      $scope.deals = res.data;
      dealsFactory.deals = $scope.deals;
      $scope.loading = false;
    });
  }

  // Favorites

  $scope.isFavorite = function(deal) {
    if (dealsFactory.favorites.indexOf(deal) > -1)
      return true;
  };

  $scope.toggleFavorite = function(deal) {
    if ($scope.isFavorite(deal)) {
      dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
      $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
    } else {
      if (dealsFactory.favorites.indexOf(deal._id) < 0) {
        dealsFactory.favorites.push(deal);
        $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
      }
    }
  };

  $scope.removeFavorite = function(deal) {
    dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
    $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
  };

  // Go to selected deal view

  $scope.goToDeal = function(deal) {
    console.log(deal);
    $state.go('tab.deal', {
      dealID: deal._id,
      shopID: deal.shop._id
    });
  };
}
