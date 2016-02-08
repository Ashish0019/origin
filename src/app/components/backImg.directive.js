/**
 * @author: Akshay Kr Singh.
 * @date:   27/10/15.
 * @github: https://github.com/akshayKrSingh
 */
export function BackImage() {
  'ngInject';

  let directive = {
    restrict: 'A',
    link: (scope, elem, attrs) => {
      elem.css({
        'background': 'url('+ attrs.backImg +') no-repeat',
        'background-size': 'cover'
      });
    }
  };

  return directive
}
