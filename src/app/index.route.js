export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('signUp', {
      url: '/signUp',
      templateUrl: 'app/signUp/signUp.html',
      controller: 'SignUpController',
      controllerAs: 'signUp',
      resolve: {
        $URLS: ($http, $service) => {
          return $http.get("http://" + $service.config('HOSTS', 1) + "/services/common/getgooglefacebookurl.json");
        }
      }
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
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
      controllerAs: 'signIn',
      resolve: {
        $URLS: ($http, $service) => {
          return $http.get("http://" + $service.config('HOSTS', 1) + "/services/common/getgooglefacebookurl.json");
        }
      }
    })
    .state('product', {
      url: '/product?id',
      templateUrl: 'app/product/product.html',
      controller: 'ProductController',
      controllerAs: 'product'
    });

  $urlRouterProvider.otherwise('/home');
}
