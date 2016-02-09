/**
 * @author: Akshay Kr Singh
 * @date: 28/1/16
 * @email: akshay.x666@gmail.com
 */
export function FormCommitDirective() {
  'ngInject';

  let directive = {
    require: "form",
    link: function($scope, $el, $attr, $form) {
      $form.commit = (params) => {
        _.each($el[0], (val) => {
          if (val.name === 'j_username') {
            let $elem = angular.element(val);
            $elem.val(params.username);
          }

          if (val.name === 'j_password') {
            let $elem = angular.element(val);
            $elem.val(params.password);
          }
        });
        $el[0].submit();
      };
    }
  };

  return directive;
}
