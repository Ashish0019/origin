export class HomeController {
  constructor($log, $document, $state, $service) {  // put $scope, $mdDialog, $mdMedia as args
    'ngInject';
    this.UserLogin = 'none';
    this.search = {
      $popular: ['K12 books', 'ELA', 'english language arts', 'K12 courses', 'K12 videos'],
      $current: []
    };
    this.MAX_SHOW_LIMIT = 15;
    this.hideNavSearch = false;
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
        var pushJson = {
          title: item.title,
          subject: item.subject,
          author: item.author,
          id: item.productId,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" +
          "took a galley of type and scrambled it to make a type specimen book. " +
          "It has survived not only five centuries, but also the leap into electronic " +
          "typesetting, remaining essentially unchanged",
          meta: {
            gradeFrom: item.gradeFrom,
            gradeTo: item.gradeTo
          },
          coverImage: item.thumbnail,
          analytics: {
            shares: 43,
            views: 78
          }
        };
        pushJson.category = (item.productTypeTitle) ? this.categoryMapping[item.productTypeTitle.toLowerCase()] : '';
        temp.push(pushJson);
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

    this.openProduct = (id) => {
      $state.go('product', {
        id: id
      });
    };

    this.searchClicked = () => {
      $service.search('set', this.search.$current);
      $state.go('library');
    };
    var sessionStatus = $service.$connect('none', 'magic', 'sessionStatus');
    sessionStatus.success((response) => {
      var sessionStat = response.userAccSrvRes.userSessionData;
      if (sessionStat) {
        this.UserLogin = 'loggedIn';
      } else {
        this.UserLogin = 'notLogged';
      }
    });
    $document[0].addEventListener('scroll', () => {

    });
  }
}
