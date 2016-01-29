export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('signUp', {
      url: '/signUp',
      templateUrl: 'app/signUp/signUp.html',
      controller: 'SignUpController',
      controllerAs: 'signUp',
      resolve: {
        $URLS: ($http) => {
          return $http.get("http://origin.stg1.getmagicbox.com/services/common/getgooglefacebookurl.json");
        }
      }
    })
    .state('library', {
      url: '/library',
      templateUrl: 'app/library/library.html',
      controller: 'LibraryController',
      controllerAs: 'library'
    })
    .state('browseMore', {
      url: '/browseMore',
      templateUrl: 'app/browseMore/browseMore.html',
      controller: 'BrowseController',
      controllerAs: 'browseMore',
     /* resolve: {
        $URLS: ($http) => {
          return $http.post("http://amz.s-1.mdistribute.magicsw.com/services/catalog/allproductdetail.json");
        }
      }*/
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: 'app/signIn/signIn.html',
      controller: 'SignInController',
      controllerAs: 'signIn'
    })
    .state('productDetail', {
      url: '/productDetail',
      templateUrl: 'app/productDetail/productDetail.html',
      controller: 'ProductController',
      controllerAs: 'productDetail',
    /*  resolve: {
        $URLS: ($http) => {
          return $http.post("http://amz.s-1.mdistribute.magicsw.com/services/catalog/allproductdetail.json");
        }
      }*/
    });

  $urlRouterProvider.otherwise('/library');
}
