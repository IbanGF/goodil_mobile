function favoritesCtrl($scope, $state, $window, dealsFactory, dealsService) {

  // Favorites

  $scope.favorites = dealsFactory.favorites;

  $scope.isFavorite = function(deal) {
    if (dealsFactory.favorites.indexOf(deal) > -1)
      return true;
  };

  // $scope.toggleFavorite = function(deal) {
  //   if ($scope.isFavorite(deal)) {
  //     dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
  //     $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
  //   } else {
  //     if (dealsFactory.favorites.indexOf(deal._id) < 0) {
  //       dealsFactory.favorites.push(deal);
  //       $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
  //     }
  //   }
  // };

  $scope.removeFavorite = function(deal) {
    dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
    $window.localStorage.setItem("favories", JSON.stringify(dealsFactory.favorites));
  };

  // Go to selected deal view

  $scope.goToDeal = function(deal) {
    console.log(deal);
    $state.go('tab.favorite', {
      dealID: deal._id,
      shopID: deal.shop._id
    });
  };
}
