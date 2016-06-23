function shopsCtrl($scope, $state, dealsService, dealsFactory) {

  // Get Shops

  if (dealsFactory.shops) {
    $scope.shops = dealsFactory.shops;
  } else {
    dealsService.getShops().then(function(res) {
      $scope.shops = res.data;
      dealsFactory.shops = $scope.shops;
    });
  }

  // Favorites

  // $scope.isFavorite = function(deal) {
  //   if (dealsFactory.favorites.indexOf(deal) > -1)
  //     return true;
  // };
  //
  // $scope.toggleFavorite = function(deal) {
  //   if ($scope.isFavorite(deal)) {
  //     dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
  //   } else {
  //     if (dealsFactory.favorites.indexOf(deal._id) < 0) {
  //       dealsFactory.favorites.push(deal);
  //     }
  //   }
  // };
  //
  // $scope.removeFavorite = function(deal) {
  //   dealsFactory.favorites.splice(dealsFactory.favorites.indexOf(deal), 1);
  // };

  // Go to selected deal view

  $scope.goToTabShop = function(shop) {
    $state.go('tab.shop', {
      shopID: shop._id,
      shopName: shop.name
    });
  };

}
