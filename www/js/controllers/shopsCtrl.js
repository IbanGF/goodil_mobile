function shopsCtrl($scope, $state, dealsService, dealsFactory) {

  $scope.loading = false;
  $scope.selectedBassinDeVie = dealsFactory.parameters.selectedBassinDeVie.name;

  // Get Shops

  if (dealsFactory.shops) {
    $scope.shops = dealsFactory.shops;
  } else {
    $scope.loading = true;
    dealsService.getShopsInBV(dealsFactory.parameters.selectedBassinDeVie._id).then(function(res) {
      $scope.shops = res.data;
      dealsFactory.shops = $scope.shops;
      $scope.loading = false;
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
