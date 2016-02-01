export class LibraryController {
  constructor($scope, $log, $http) {
    'ngInject';
    this.search = '';
    this.details = [];
    this.showFilter = false;
    this.showError = false;
    this.filter = {
      subject: {
        grammar: false,
        language: false,
        reading: false,
        research: false,
        speakingListening: false,
        writing: false
      }
    };
    this.errorMessage = {
      message: 'Could not connect with Server.'
    };
    this.categoryMapping = {
      epub: {name: 'Epub', icon: 'assets/images/clipboard-text.svg'},
      game: {name: 'Game', icon: 'assets/images/gamepad-variant.svg'},
      video: {name: 'Video', icon: 'assets/images/video.svg'},
      ebook: {name: 'E - Book', icon: 'assets/images/clipboard-text.svg'},
      pdf: {name: 'PDF', icon: 'assets/images/file-pdf-box.svg'},
      simulation: {name: 'Simulation', icon: 'assets/images/desktop-mac.svg'}
    };

    this.fetchData = () => {
      this.showError = false;
      $http({
        method: 'POST',
        url: 'http://amz.s-1.mdistribute.magicsw.com/services/catalog/allproductdetail.json',
        headers: {
          'Content-Type': 'application/json'
        },
        data:{'searchobject':{}}
      }).then((response) => {
        $log.debug(response.data.productdetail);
        _.each(response.data.productdetail, (item, index) => {
          if (index < 50) {
            this.details.push({
              title: item.title,
              author: item.subject,
              coverImage: item.coverImage,
              category: this.categoryMapping[item.productType],
              analytics: {
                shares: 43,
                views: 78
              }
            });
          }
        });
      }, (err) => {
        $log.debug(err);
        this.showError = true;
      });
    };

    this.fetchData();
  }
}
