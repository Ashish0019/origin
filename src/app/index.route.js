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
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home',
      resolve: {
        $URLS: ($http) => {
          return $http.get("http://origin.stg1.getmagicbox.com/services/user/account/sessionstatus.json");
        }
      }
    })
    .state('library', {
      url: '/library',
      templateUrl: 'app/library/library.html',
      controller: 'LibraryController',
      controllerAs: 'library'
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: 'app/signIn/signIn.html',
      controller: 'SignInController',
      controllerAs: 'signIn'
    })
    .state('product', {
      url: '/product?id',
      templateUrl: 'app/product/product.html',
      controller: 'ProductController',
      controllerAs: 'product'
    });

  $urlRouterProvider.otherwise('/home');
}
