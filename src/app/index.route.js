export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('signUp', {
      url: '/signUp',
      templateUrl: 'app/signUp/signUp.html',
      controller: 'SignUpController',
      controllerAs: 'signUp'
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

  $urlRouterProvider.otherwise('/browseMore');
}
