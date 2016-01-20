export class SignInController {
  constructor($log, $scope, $document) {
    'ngInject';
    $scope.inputType = 'password';

    $scope.showPassword = function () {
      if (this.inputType == 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    };

    $log.debug($document.referrer)
  }
}
