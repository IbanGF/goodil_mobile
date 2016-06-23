function dealsService($http, dealsFactory) {
  return {
    getDeals: function() {
      return $http.get(dealsFactory.url + '/deals');
    },
    getCategories: function() {
      return $http.get(dealsFactory.url + '/category');
    },
    getShops: function() {
      return $http.get(dealsFactory.url + '/shop');
    }
  };
}
