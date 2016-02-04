export class SignInController {
  constructor($log, $scope) {
    'ngInject';
    this.inputType = 'password';

    this.user = {
      username: '',
      password: ''
    };

    this.showPassword = function () {
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
