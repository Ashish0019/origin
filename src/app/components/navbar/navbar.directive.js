export function NavbarDirective($log) {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      searchText: '@'
    },
    link: ($scope, $el, $attrs) => {
      $scope.navbarText = $attrs.navText;
      $scope.search = {
        $current: ''
      };
      _.each($attrs.searchText, (item) => {
        $scope.search.$current += item + ', '
      });

    }
  };

  return directive;
}
