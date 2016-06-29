function categoriesCtrl($scope, $state, dealsService, dealsFactory) {

  // Get categories
  $scope.selectedBassinDeVie = dealsFactory.parameters.selectedBassinDeVie.name;

  if (dealsFactory.categories) {
    $scope.categoriesInBV = dealsFactory.categories;
  } else {
    $scope.categoriesInBV = [];
    for (var i = 0; i < dealsFactory.deals.length; i++) {
      if ($scope.categoriesInBV.map(function(e) {
          return e._id;
        }).indexOf(dealsFactory.deals[i].subCategory.category._id) < 0) {
        $scope.categoriesInBV.push(dealsFactory.deals[i].subCategory.category);
      }
    }
    dealsFactory.categories = $scope.categoriesInBV;
  }

  // Go to selected category

  $scope.goToTabCategory = function(category) {
    $state.go('tab.category', {
      categoryID: category._id,
      categoryName: category.name
    });
  };

}
