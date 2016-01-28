/**
 * @author: Akshay Kr Singh
 * @date: 28/1/16
 * @email: akshay.x666@gmail.com
 */
export function FormCommitDirective($log) {
  'ngInject';

  let directive = {
    require:"form",
    link: function($scope, $el, $attr, $form) {
      $form.commit = function() {
        $el[0].submit();
      };
    }
  };

  return directive;
}
