export class SignUpController {
  constructor($log, $window, $http, $scope, $URLS) {
    'ngInject';

    this.user = {email: '', fullName: '', password: ''};
    this.urls = $URLS.data.data;
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

    this.register = () => {
      let response = $http.post('http://mbx-api-staging.getmagicbox.com/services/user/v1.0/' +
        'registeruser?token=ORIGIN_MAGICBOX_TOKEN', {
        firstname: this.user.fullName,
        userName: this.user.email,
        password: this.user.password,
        userType: this.keyMap[this.imageProps.current].userType
      });
      response.success((res) => {
        $log.info(res);
      });
      response.error((res) => {
        $log.error(res);
      });
    };

    this.connect = (type) => {
      var key = this.keyMap[this.imageProps.current][type];
      $window.location.href = this.urls[key];
    };

    $scope.showData = function() {
      this.abc = true;
    }

  }
}

