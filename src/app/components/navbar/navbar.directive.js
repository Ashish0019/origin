export function NavbarDirective($log, $service, $document) {
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
      $scope.myLibrary = $document.referrer;
      $document.getElementsByAttribute("login-panel").style.display = "none";
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


      var sessionStatus = $service.$connect('none', 'magic', 'sessionStatus');
      sessionStatus.success((response) => {
        var sessionStat = response.userAccSrvRes.userSessionData;
        if (sessionStat) {
          $scope.UserLogin = 'loggedIn';
          document.getElementsByAttribute("login-panel").style.display = "block";
        }else{
          $scope.UserLogin = 'notLoggedIn';
          document.getElementsByAttribute("login-panel").style.display = "block";
        }
      })


    }
  };

  return directive;
}
