export class SignInController {
  constructor($log, $service,$scope ) {
    'ngInject';
    this.inputType = 'password';
    this.forgot = false;

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
    $scope.$watch('this.user.username', ()=>{
      $log.debug(1,this.user.username)


    });



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
