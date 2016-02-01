export class LibraryController {
  constructor($scope, $log, $http) {
    'ngInject';
    this.search = '';
    this.details = [];
    this.showFilter = false;
    this.showError = false;
    this.MAX_LIMIT = 50;

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
      simulation: {name: 'Simulation', icon: 'assets/images/desktop-mac.svg'},
      audio: {name: 'Audio', icon: 'assets/images/audio_icon.svg'},
      youtube: {name:'Youtube',icon:'assets/images/youtubeVideo_icon.svg'}
    };

    this.inform = (type, info) => {
      $log.warn(info);
      this.showError = true;
    };

    this.populateDetails = (type, infoList) => {
      _.each(infoList, (item, index) => {
        if (index < this.MAX_LIMIT / 2) {
          switch (type) {
            case 'magic':
              this.details.push({
                title: item.title,
                author: item.subject || item.subject2 || "English",
                coverImage: item.coverImage,
                category: this.categoryMapping[item.productType],
                analytics: {
                  shares: 43,
                  views: 78
                }
              });
              break;
            case 'youtube':
              this.details.push({
                title: item.snippet.title,
                author: "Youtube",
                coverImage: item.snippet.thumbnails.medium.url,
                category: this.categoryMapping.youtube,
                analytics: {
                  shares: 4,
                  views: 7
                }
              });
              break;
          }
        }
      });
      this.details = _.shuffle(this.details);
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
        this.populateDetails('magic', response.data.productdetail);
      }, (error) => {this.inform('err', error);});

      $http({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDf7G7HNHRaSXZOdIszJaU9aiRl9TZYorY&part=snippet&q=common+core+english+grades+k12&maxResults=50'
      }).then((response) => {
        this.populateDetails('youtube', response.data.items);
      }, (error) => {this.inform('err', error);});
    };

    this.fetchData();
  }
}
