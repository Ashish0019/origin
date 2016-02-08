export function EnlargeDirective() {
  'ngInject';

  let enlarger = {
    restrict: 'AE',
    templateUrl: 'app/components/imageEnlarger/imageEnlarger.html',
    link: (scope, $el, $attrs) => {
      scope.src = $attrs.ngSrc;
    }
  };

  return enlarger;
}
