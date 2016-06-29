function favoritesCtrl($scope, $state, $window, dealsFactory, dealsService) {

  // Favorites

  $scope.favorites = dealsFactory.favorites;

  $scope.isFavorite = function(deal) {
    if (dealsFactory.favorites.indexOf(deal) > -1)
      return true;
  };

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
