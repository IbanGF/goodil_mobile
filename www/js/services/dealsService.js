function dealsService($http, dealsFactory) {
  return {
    getDeals: function() {
      return $http.get(dealsFactory.url + '/deals');
    },
    getDealsInBV: function(BVCode) {
      return $http.get(dealsFactory.url + '/deals/' + BVCode);
    },
    getCategories: function() {
      return $http.get(dealsFactory.url + '/category');
    },
    getShops: function() {
      return $http.get(dealsFactory.url + '/shop');
    },
    getShopsInBV: function(BVCode) {
      return $http.get(dealsFactory.url + '/shop/' + BVCode);
    },
    findAllBVsName: function() {
      return $http.get(dealsFactory.url + '/findAllBVsName');
    },
    findOneBV: function(codePostal) {
      return $http.get(dealsFactory.url + '/findOneBV/' + codePostal);
    }
  };
}
