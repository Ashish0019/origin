export class LoginController {
  constructor($scope) {
    'ngInject';

    this.user = {email: ''};

    this.imageProps = {
      current: ''
    };
    $scope.ShowData = function ()
    {
      this.abc=true;
    }


  }
}

