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

  // Go to selected deal view

  $scope.goToTabShop = function(shop) {
    $state.go('tab.shop', {
      shopID: shop._id,
      shopName: shop.name
    });
  };

}
