export class SignInController {
  constructor($log, $scope, $service, $sce) {
    'ngInject';
    this.inputType = 'password';
    this.forgot = false;
    this.postUrl = $sce.trustAsResourceUrl('http://' + $service.config('HOSTS', 1) + '/j_spring_security_check');

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
      $form.commit(this.user);
    };

    this.ForgotPassword = () => {
      var userName = this.user.username;
      var forgot = $service.$connect('', 'magic', 'forgetpassword', {
        urlParams: {
          username: userName,
          tenant: "magic"
        }
      });

      forgot.success((response) => {
        this.ForgotPwdText = response.userAccSrvRes.diagMessage;
      });

      forgot.failure((error) => {
        $log.debug(error);
        this.ForgotPwdText = 'Service Unavailable';
      });

      this.forgot = true;
    }
  }
}
