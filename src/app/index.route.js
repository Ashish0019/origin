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
      controllerAs: 'home'
    })
    .state('browseMore', {
      url: '/browseMore',
      templateUrl: 'app/browseMore/browseMore.html',
      controller: 'BrowseController',
      controllerAs: 'browseMore'
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: 'app/signIn/signIn.html',
      controller: 'SignInController',
      controllerAs: 'signIn'
    });

  $urlRouterProvider.otherwise('/home');
}
