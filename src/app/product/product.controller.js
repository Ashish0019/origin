export class ProductController {
  constructor($scope, $log, $state, $service, $stateParams, $sce) {
    'ngInject';
    this.showDetails = false;
    this.showthings = true;
    this.showEnlargedImage = false;
    this.info = {};
    this.user = {};

    this.book = {
      hideAdd: true
    };

    var detail = $service.$query('library', $stateParams.id, 'unique');
$log.debug("hie",detail);
    if (!_.isEmpty(detail)) {
      this.author = detail.author;
      this.showDetails = true;
      this.showAddToLibrary = detail.section === 'magic';

      var sessionStatus = $service.$connect('none', 'magic', 'sessionStatus');

      sessionStatus.success((response) => {
        var userInfo = response.userAccSrvRes.userSessionData;

        if (!_.isEmpty(userInfo)) {this.user = userInfo;}

        var freeBook = $service.$connect('freeBooks', 'magic', 'freeBookListing', {
          urlParams: {
            username: this.user.userName,
            token: $service.token('get')
          }});

        freeBook.success((response) => {
          if (response.responseCode === 200) {
            var query = _.find(response.userFreeBooks, (item) => {
              return item === parseInt($stateParams.id, 10);
            });

            if (query) {
              this.book.hideAdd = true;
            }

            return 1;
          }

          this.book.hideAdd = false;
        });
      });

      if (detail.author == "Youtube") {
        this.info.title = detail.title;
        this.description = detail.meta.description;
        this.info.Type = " : Youtube Video";
        // here I could have found video ID directly from response from you tube api but I didn't opted for that
        // approach because in some case we get playlists in response which dont have a videoID
        // hence I cropped the video Id from the Image path that I got from response for images
        var regex = /\/vi\/(.*)\//;
        var url = detail.coverImage;
        var id = '';
        if (url.match(regex)) {
          id = url.match(regex)[1];
        }
        var videoPath = "http://www.youtube.com/embed/" + id;
        this.yVideo = $sce.trustAsResourceUrl(videoPath);
      }
      else {
        this.info.title = detail.title;
        this.info.Content = "in" + " " + "<b>" + detail.subject + "</b>" + " " + "by" + " "
          + "<b>" + detail.author + "</b>";
        this.info.Grades = "  " + 5 + " - " + 8;
        this.info.Publisher = "  " + detail.author;
        this.info.Type = "  " + detail.category.name;
        this.description = detail.description;
        this.info.Image = $sce.trustAsResourceUrl(detail.coverImage);
      }
    } else {$state.go('library');}

    this.addProduct = () => {
      if (!_.isEmpty(this.user.userName)) {
        var addPromise = $service.$connect('none', 'magic', 'addUpdateProduct', {
          urlParams: {token: $service.token('get')},
          requestParams: {
            username: this.user.userName,
            productid: $stateParams.id
          }
        });

        addPromise.success(() => {
          this.book.hideAdd = true;
          this.showthings = true;
        });
        return 1;
      }

      $state.go('signUp');
    }
  }
}
