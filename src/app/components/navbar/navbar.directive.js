export function NavbarDirective($log, $service, $window, $state) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      searchText: '@',
      onSearch: '=',
      option: '='

    },
    link: ($scope, $el, $attrs) => {
      $scope.UserLogin = 'none';
      $scope.navbarText = $attrs.navText;
      $scope.userInfo = {};

      $scope.search = {
        $current: ''
      };
      _.each($scope.$eval($attrs.searchText), (item) => {
        $scope.search.$current += item + ' '
      });

      $scope.clickSearch = () => {
        if (_.isFunction($scope.onSearch)) {
          $scope.onSearch($scope.search);
        }
      };
      $scope.goToLibrary = () => {
        $window.location.href = '/mylibrary.htm';
        $log.debug("click goToLibrary");
      };
      $scope.goToProfile = () => {
        $window.location.href = '/admin/profile.htm';
        $log.debug("click goToProfile");
      };

      $scope.logoutSession = () => {
        var logout = $service.$connect('', 'magic', 'logout');
        logout.success((response) => {
          $log.debug(response);
          $state.go('signIn');
        });
        return 1;

      };

      var sessionStatus = $service.$connect('', 'magic', 'sessionStatus');
      sessionStatus.success((response) => {
        var sessionStat = response.userAccSrvRes.userSessionData;
        $scope.userInfo = sessionStat;
        if (sessionStat) {
          $scope.UserLogin = 'loggedIn';
        } else {
          $scope.UserLogin = 'notLoggedIn';

        }
      })


    }
  };

  return directive;
}
