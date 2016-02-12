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
      var forgot = $service.$connect('', 'magic', 'forgetpassword', {
        urlParams: {
          username: this.user.username || this.user.email,
          tenant: "origin"
        }
      });

      forgot.success((response) => {
          $log.debug(response);
          this.ForgotPwdText = response.userAccSrvRes.diagMessage ;
          this.frgtPwdSuccess=response.userAccSrvRes.code;
          if (this.frgtPwdSuccess == 200) {
            this.ForgotPwdTextSuccess = "Email Sent Successfully";
          }
        }
      );

      forgot.failure((error) => {
        $log.debug(error);
        this.ForgotPwdText = 'Service Unavailable';
      });

      this.forgot = true;
    }
  }
}
