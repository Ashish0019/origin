export class HomeController {
  constructor($log, $document, $http, $service) {  // put $scope, $mdDialog, $mdMedia as args
    'ngInject';

    this.search = {
      $popular: ['K12 books', 'ELA' , 'english language arts','K12 courses','K12 videos'],
      $current: []
    };
    this.MAX_SHOW_LIMIT = 15;

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

    let $details = $service.$connect('library', 'magic', 'productListing', {
      urlParams: {token: $service.token('get')},
      requestParams: {
        pageNumber: 1,
        maxRecordCount: 50
      }
    });

    $details.success((response) => {
      var temp = [];
      _.each(response.productSoList, (item) => {
        temp.push({
          title: item.title,
          subject: item.subject,
          author: item.author,
          id: item.productId,
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
          coverImage: item.thumbnail,
          category: this.categoryMapping[item.productTypeTitle.toLowerCase()],
          analytics: {
            shares: 43,
            views: 78
          }
        });
      });

      $service.$append('library', 'magic', 'productListing', temp);
      this.details = $service.$query('library', '', 'full', this.MAX_SHOW_LIMIT);
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
