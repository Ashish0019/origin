export function NavbarDirective($log, $service, $window) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      searchText: '@',
      onSearch: '='
    },
    link: ($scope, $el, $attrs) => {
      $scope.UserLogin = 'none';
      $scope.navbarText = $attrs.navText;



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


      var sessionStatus = $service.$connect('none', 'magic', 'sessionStatus');
      sessionStatus.success((response) => {
        var sessionStat = response.userAccSrvRes.userSessionData;
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
