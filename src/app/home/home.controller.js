export class HomeController {
  constructor($log, $document, $scope) {  // put $scope, $mdDialog, $mdMedia as args
    'ngInject';

    this.search = {
      $popular: ['k12', 'english'],
      $current: []
    };
    this.showNavBar = false;

    this.downClick = () => {
      this.showNavBar = true;
    };

    this.searchClicked = () => {
      if (!_.isEmpty(this.search.$current)) {
        this.showNavBar = true;
      }
    };

    $document[0].addEventListener('scroll', () => {

    });
  }
}
