export class SignUpController {
  constructor($log, $window, $http, $scope, $URLS, $service, reCAPTCHA, $sce) {
    'ngInject';
    this.user = {email: '', fullName: '', password: ''};
    this.urls = $URLS.data.data;
    this.postUrl = $sce.trustAsResourceUrl('http://' + $service.config('HOSTS', 1) + '/j_spring_security_check');

    $scope.showError = false;
    $scope.responseMessage = '';

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

    this.register = ($form) => {
      $scope.showError = false;
      $scope.responseMessage = '';

      let response = $http.post('http://www.k12origin.com/services/user/v1.0/' +
        'registeruser?token=ORIGIN_MAGICBOX_TOKEN', {
        firstname: this.user.fullName,
        userName: this.user.email,
        password: this.user.password,
        userType: this.keyMap[this.imageProps.current].userType
      });

      response.success((res) => {
        if (res.response.responseCode !== 200) {
          $scope.showError = true;
          $scope.responseMessage = res.response.message;
        } else {
          $form.commit(this.user);
        }
      });

      response.error((res) => {
        $log.debug(res);
      })
    };

    this.connect = (type) => {
      var key = this.keyMap[this.imageProps.current][type];
      $window.location.href = this.urls[key];
    };

    $scope.showData = function() {
      this.abc = true;
    };

    reCAPTCHA.setPublicKey('6LdUu_cSAAAAAJT-SnxZm_EL_NwazPuCwgfb70Wo');

  }
}

