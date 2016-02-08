/**
 * @author: Akshay Kr Singh.
 * @date:   27/10/15.
 * @github: https://github.com/akshayKrSingh
 */
export function RjResizeDirective($window) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: (scope, elem, attrs) => {
      let height = parseInt(attrs.rzHeight) | '';
      let width = parseInt(attrs.rzWidth) | '';

      scope.$watch(() => {return {height: $window.innerHeight, width: $window.innerWidth}}, (newVal) => {
        elem.css('height', (newVal.height - height) + 'px');
        elem.css('width', (newVal.width - width) + 'px');
      }, true);

      $window.addEventListener('resize', () => scope.$apply());
    }
  };

  return directive
}
