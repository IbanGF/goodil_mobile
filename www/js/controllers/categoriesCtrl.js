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

  // Go to selected category

  $scope.goToTabCategory = function(category) {
    $state.go('tab.category', {
      categoryID: category._id,
      categoryName: category.name
    });
  };

}
