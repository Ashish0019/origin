export class LoginController {
  constructor() {
    'ngInject';

    this.user = {email: ''};

    this.imageProps = {
      current: 'student'
    };

    /*$scope.$watch(() => this.user.email, function(newValue)  {
      var regex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
      $scope.check = Boolean(newValue.match(regex));
      if($scope.check == true){
        $log.debug("true",newValue[1],newValue);
      }
      else
      {
        $log.debug("false",newValue[1],newValue);
      }

    });*/


  }
}

