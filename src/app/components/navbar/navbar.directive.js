export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      searchText: '@',
      onSearch: '='
    },
    link: ($scope, $el, $attrs) => {
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
      }

    }
  };

  return directive;
}
