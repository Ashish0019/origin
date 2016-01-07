export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
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
      controllerAs: 'browseMore'
    })
.state('signIn', {
    url: '/signin',
    templateUrl: 'app/signIn/signIn.html',
    controller: 'SignInController',
    controllerAs: 'signIn'
  });

  $urlRouterProvider.otherwise('/signin');
}
