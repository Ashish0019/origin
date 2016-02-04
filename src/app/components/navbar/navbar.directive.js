export function NavbarDirective($service, $log) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      searchText: '@',
      onSearch: '='
    },
    link: ($scope, $el, $attrs) => {
      $scope.UserLogin = false;
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


      var sessionStatus = $service.$connect('none', 'magic', 'sessionStatus');
      sessionStatus.success((response)=>{
        var sessionStat = response.userAccSrvRes.userSessionData;
        $log.debug(sessionStat);
        if(sessionStat){
          $scope.UserLogin = true;
        }
        else {
          $scope.UserLogin = false;
        }
      })


    }
  };

  return directive;
}
