export class LibraryController {
  constructor($scope, $mdDialog, $mdMedia) {
    'ngInject';
    this.searchBox = [];
    /*this.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    this.showLogin = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/library/loginTemplates/tab1_joinFree/joinfree.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      });

      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });

    };


    this.createAccount = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/library/loginTemplates/tab2_createAccount/createAccount.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      });

      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });

    };
*/
  }
}
/*
function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}*/
