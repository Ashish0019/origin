export class SignInController {
  constructor($scope) {
    'ngInject';
    this.inputType = 'password';
    this.pwdClass = 'showPwd';

    $scope.showPassword = function(){
      {
        if (this.inputType == 'password')
        {
          this.inputType = 'text';
          this.pwdClass = 'hidePwd'
        }

        else{
          this.inputType = 'password';
          this.pwdClass = 'showPwd';
        }
      };


    }


  }

}
