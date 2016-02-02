export class HomeController {
  constructor($log, $document, $http, $service) {  // put $scope, $mdDialog, $mdMedia as args
    'ngInject';

    this.search = {
      $popular: ['k12', 'english',12333333333333333333,333333333333333,3411234135135143513512341523152351234],
      $current: []
    };

    this.MAX_SHOW_LIMIT = 12;

    this.showNavBar = false;
    //TODO move to services
    this.categoryMapping = {
      epub: {name: 'Epub', icon: 'assets/images/clipboard-text.svg'},
      game: {name: 'Game', icon: 'assets/images/gamepad-variant.svg'},
      video: {name: 'Video', icon: 'assets/images/video.svg'},
      ebook: {name: 'E - Book', icon: 'assets/images/clipboard-text.svg'},
      pdf: {name: 'PDF', icon: 'assets/images/file-pdf-box.svg'},
      simulation: {name: 'Simulation', icon: 'assets/images/desktop-mac.svg'}
    };
    this.details = [];

    let $details = $service.$fetch('magic', 'productListing');

    $details.success((response) => {
      var temp = [];
      _.each(response.productdetail, (item) => {
        temp.push({
          title: item.title,
          subject: item.subject,
          author: item.author,
          description: 'Updated Invitation: Platform + Assessments + Analytics + Origin - ' +
            'Daily Scrum @ Weekly from' +
            '10:45am to  11:05am on weekdays from Wed Jan 13 to Wed Jan 27Updated Invitation: ' +
            'Platform + Assessments' + 'Analytics + Origin - Daily Scrum @ Weekly from 10:45am to 11:05am ' +
            'on weekdays from Wed Jan 13 to' +
            'Wed Jan 27',
          meta: {
            gradeFrom: item.gradeFrom,
            gradeTo: item.gradeTo
          },
          coverImage: item.coverImage,
          category: this.categoryMapping[item.productType],
          analytics: {
            shares: 43,
            views: 78
          }
        });
      });

      $service.$append('library', 'magic', 'productListing', temp);
      this.details = $service.$query('', 'full', this.MAX_SHOW_LIMIT);
    });

    $details.failure((error) => {
      $log.debug(error);
    });

    this.downClick = () => {
      this.showNavBar = true;
    };

    this.searchClicked = () => {
      this.showNavBar = true;
    };

    $document[0].addEventListener('scroll', () => {

    });
  }
}
