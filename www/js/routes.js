function routes($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.deals', {
      url: '/deals',
      views: {
        'tab-deals': {
          templateUrl: 'templates/tab-deals.html',
          controller: 'dealsCtrl'
        }
      }
    })
    .state('tab.deal', {
      url: '/deals/:dealID/:shopID',
      views: {
        'tab-deals': {
          templateUrl: 'templates/tab-deal.html',
          controller: 'dealCtrl'
        }
      }
    })
    .state('tab.mapDeals', {
      url: '/deals/:lng/:lat',
      views: {
        'tab-deals': {
          cache: false,
          templateUrl: 'templates/tab-deal-map.html',
          controller: 'mapCtrl'
        }
      }
    })
    .state('tab.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-categories.html',
          controller: 'categoriesCtrl'
        }
      }
    })
    .state('tab.category', {
      url: '/categories/:categoryID/:categoryName',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-category-deals.html',
          controller: 'categoryCtrl'
        }
      }
    })
    .state('tab.categoryDeal', {
      url: '/categories/:categoryID/:dealID/:categoryName',
      views: {
        'tab-categories': {
          templateUrl: 'templates/tab-category-deal.html',
          controller: 'categoryCtrl'
        }
      }
    })
    .state('tab.mapCategories', {
      url: '/categories/:lng/:lat',
      views: {
        'tab-categories': {
          cache: false,
          templateUrl: 'templates/tab-deal-map.html',
          controller: 'mapCtrl'
        }
      }
    })
    .state('tab.shops', {
      url: '/shops',
      views: {
        'tab-shops': {
          templateUrl: 'templates/tab-shops.html',
          controller: 'shopsCtrl'
        }
      }
    })
    .state('tab.shop', {
      url: '/shops/:shopID/:shopName',
      views: {
        'tab-shops': {
          templateUrl: 'templates/tab-shop-deals.html',
          controller: 'shopCtrl'
        }
      }
    })
    .state('tab.shopDeal', {
      url: '/shops/:shopID/:dealID/:shopName',
      views: {
        'tab-shops': {
          templateUrl: 'templates/tab-shop-deal.html',
          controller: 'shopCtrl'
        }
      }
    })
    .state('tab.mapShops', {
      url: '/shops/:lng/:lat',
      views: {
        'tab-shops': {
          cache: false,
          templateUrl: 'templates/tab-deal-map.html',
          controller: 'mapCtrl'
        }
      }
    })
    .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'favoritesCtrl'
        }
      }
    })
    .state('tab.favorite', {
      url: '/favorites/:dealID',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorite.html',
          controller: 'favoriteCtrl'
        }
      }
    })
    .state('tab.mapFavorites', {
      url: '/favorites/:lng/:lat',
      views: {
        'tab-favorites': {
          cache: false,
          templateUrl: 'templates/tab-deal-map.html',
          controller: 'mapCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/deals');
}
