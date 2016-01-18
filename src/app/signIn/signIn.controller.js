export class SignInController {
  constructor($scope, $log) {
    'ngInject';
    $scope.inputType = 'password';


    $scope.showPassword = function(){
      {

        $log.debug("this.classList",this.classList);
        if (this.inputType == 'password')
        {
          this.inputType = 'text';

        }

        else{
          this.inputType = 'password';

        }
      }


    }


  }

}
