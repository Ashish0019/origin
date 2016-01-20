export class SignInController {
  constructor($log, $scope) {
    'ngInject';
    $scope.inputType = 'password';

    $scope.showPassword = function () {
      if (this.inputType == 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    }
  }
}
