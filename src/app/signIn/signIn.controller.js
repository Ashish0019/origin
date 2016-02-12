export class SignInController {
  constructor($log, $window, $service, $sce, $URLS) {
    'ngInject';
    this.inputType = 'password';
    this.forgot = false;
    this.urls = $URLS.data.data;
    this.postUrl = $sce.trustAsResourceUrl('http://' + $service.config('HOSTS', 1) + '/j_spring_security_check');
    this.pwdErrtext = 'none';

    this.keyMap = {
      teacher: {
        google: 'googleIndTeacherUrl',
        facebook: 'facebookIndTeacherUrl',
        userType: 'IND_TEACHER'
      },
      student: {
        google: 'googleIndUserUrl',
        facebook: 'facebookIndUserUrl',
        userType: 'IND_USER'
      }
    };

    this.imageProps = {
      current: ''
    };

    this.connect = (type) => {
      var key = this.keyMap[this.imageProps.current][type];
      $window.location.href = this.urls[key];
    };

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
          this.ForgotPwdText = response.userAccSrvRes.diagMessage ;
          this.frgtPwdSuccess=response.userAccSrvRes.code;
          if (this.frgtPwdSuccess == 200) {
            this.ForgotPwdTextSuccess = "Email Sent Successfully";
            this.pwdErrtext = 'UserExist';
          }
          else if(this.frgtPwdSuccess == 2020 || this.frgtPwdSuccess == 705) {
            this.ForgotPwdText = "User does not exists";
            this.pwdErrtext = 'UserNotExist';
          }
          else {
            this.ForgotPwdText = "User does not exists";
            this.pwdErrtext = 'UserNotExist';
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
