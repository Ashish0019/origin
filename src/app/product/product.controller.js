export class ProductController {
  constructor($scope, $log, $state, $service, $stateParams, $sce) {
    'ngInject';
    this.showDetails = false;
    this.showEnlargedImage = false;
    this.info = {};
    this.user = {};
    this.likes = [];
    this.userLogin = false;
    this.book = {
      hideAdd: false,
      added: false

    };

    this.categoryMapping = {
      epub: {name: 'Epub', icon: 'assets/images/clipboard-text.svg'},
      game: {name: 'Game', icon: 'assets/images/gamepad-variant.svg'},
      video: {name: 'Video', icon: 'assets/images/video.svg'},
      ebook: {name: 'E - Book', icon: 'assets/images/clipboard-text.svg'},
      pdf: {name: 'PDF', icon: 'assets/images/file-pdf-box.svg'},
      simulation: {name: 'Simulation', icon: 'assets/images/desktop-mac.svg'},
      audio: {name: 'Audio', icon: 'assets/images/audio_icon.svg'},
      youtube: {name: 'YouTube', icon: 'assets/images/youtubeVideo_icon.svg'}
    };

    var detail = $service.$query('library', $stateParams.id, 'unique');

    if (!_.isEmpty(detail)) {
      this.author = detail.author;
      this.showDetails = true;
      this.type = detail.category.name;
      this.showAddToLibrary = detail.section === 'magic';

      var sessionStatus = $service.$connect('none', 'magic', 'sessionStatus');

      sessionStatus.success((response) => {
        var userInfo = response.userAccSrvRes.userSessionData;

        if (!_.isEmpty(userInfo)) {
          this.user = userInfo;
        }


        var relatedProducts = $service.$connect('', 'magic', 'getProductDetails', {
          urlParams: {
            id: $stateParams.id,
            username: this.user.userName,
            token: $service.token('get')
          }
        });

        relatedProducts.success((response) => {
          var data = response.response;
          if (data.responseCode === 200) {
            _.each(response.relatedProducts, (item) => {
              var pushDetails = {
                title: item.title,
                subject: item.subject || item.subject2 || "English",
                author: item.author || "Magic",
                id: item.productId,
                meta: {
                  gradeFrom: item.gradeFrom,
                  gradeTo: item.gradeTo
                },
                coverImage: item.thumbnail,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" +
                "took a galley of type and scrambled it to make a type specimen book. " +
                "It has survived not only five centuries, but also the leap into electronic " +
                "typesetting, remaining essentially unchanged",
                analytics: {
                  shares: 43,
                  views: 78
                }
              };

              if (item.productTypeTitle) {
                pushDetails.category = this.categoryMapping[item.productTypeTitle.toLowerCase()];
              }

              $service.$insert('library', $stateParams.id, {
                $val: {
                  key: 'related',
                  data: pushDetails
                },
                $type: 'array'
              });

              this.likes.push(pushDetails);
            });
          }
        });

        var ownedBooks = $service.$connect('freeBooks', 'magic', 'freeBookListing', {
          urlParams: {
            username: this.user.userName,
            token: $service.token('get')
          }
        });

        ownedBooks.success((response) => {
          $log.debug(response);
          if (response.response.responseCode === 200) {
            var query = _.find(response.userFreeBooks, (item) => {
              return item === parseInt($stateParams.id, 10);
            });

            this.book.hideAdd = !!query;
            if (query) {
              this.book.added = true;
            }
          }
        });
      });

      if (this.type == "YouTube") {
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
    } else {
      $state.go('library');
    }

    this.openProduct = (id) => {
      $state.go('product', {
        id: id
      });
    };

    this.addProduct = () => {
      var sessionStat = $service.$connect('none', 'magic', 'sessionStatus');
      sessionStat.success((response) => {
        var userInfo = response.userAccSrvRes.userSessionData;
        if (!_.isEmpty(userInfo)) {
          this.userLogin = false;
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

            });
            return 1;
          }
        }
        else {
          this.userLogin = true;
        }

      });


    }
  }
}
