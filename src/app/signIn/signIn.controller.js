export class SignInController {
  constructor($log, $scope) {
    'ngInject';
    $scope.inputType = 'password';

    this.user = {
      username: '',
      password: ''
    };

    $scope.showPassword = function () {
      if (this.inputType == 'password') {
        this.inputType = 'text';
      } else {
        this.inputType = 'password';
      }
    };

    this.login = ($form) => {
      $form.commit();
    };
  }
}
