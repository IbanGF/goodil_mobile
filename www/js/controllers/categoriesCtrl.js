function categoriesCtrl($scope, $state, dealsService, dealsFactory) {

  // Get categories

  if (dealsFactory.categories) {
    $scope.categories = dealsFactory.categories;
  } else {
    dealsService.getCategories().then(function(res) {
      $scope.categories = res.data;
      dealsFactory.categories = $scope.categories;
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
    } else {
      if (dealsFactory.favorites.indexOf(deal._id) < 0) {
        dealsFactory.favorites.push(deal);
      }
    }
  };

  $scope.removeFavorite = function(deal) {
    dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
  };

  // Go to selected category

  $scope.goToTabCategory = function(category) {
    $state.go('tab.category', {
      categoryID: category._id,
      categoryName: category.name
    });
  };

}
