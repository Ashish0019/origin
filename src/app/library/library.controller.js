export class LibraryController {
  constructor($scope, $log, $http, $service, $state) {
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
      youtube: {name: 'Youtube', icon: 'assets/images/youtubeVideo_icon.svg'}
    };

    this.inform = (type, info) => {
      $log.warn(info);
      this.showError = true;
    };

    this.populateDetails = (type, infoList) => {
      var temp = [];
      _.each(infoList, (item, index) => {
        if (index < this.MAX_LIMIT / 2) {
          switch (type) {
            case 'magic':
              temp.push({
                title: item.title,
                subject: item.subject || item.subject2 || "English",
                author: item.author,
                meta: {
                  gradeFrom: item.gradeFrom,
                  gradeTo: item.gradeTo
                },
                coverImage: item.coverImage,
                category: this.categoryMapping[item.productType],
                description: 'Updated Invitation: Platform + Assessments + Analytics + Origin - ' +
                  'Daily Scrum @ Weekly from' +
                  '10:45am to  11:05am on weekdays from Wed Jan 13 to Wed Jan 27Updated Invitation: ' +
                  'Platform + Assessments' + 'Analytics + Origin - Daily Scrum @ Weekly from 10:45am to 11:05am ' +
                  'on weekdays from Wed Jan 13 to' +
                  'Wed Jan 27',
                analytics: {
                  shares: 43,
                  views: 78
                }
              });
              break;
            case 'google':
              temp.push({
                title: item.snippet.title,
                author: "Youtube",
                coverImage: item.snippet.thumbnails.medium.url,
                category: this.categoryMapping.youtube,
                meta: {
                  description: item.snippet.description
                },
                id:item.id.videoId,
                analytics: {
                  shares: 4,
                  views: 7
                }
              });
              break;
          }
        }
      });

      let domain = type;
      let cat = (type === 'magic') ? 'productListing' : 'youtube';
      $service.$append('library', domain, cat, temp);
      this.details = $service.$query('', 'full');
      this.details = _.shuffle(this.details);
    };

    this.openProduct = (id) => {
      $state.go('product', {
        id: id
      });
    };

    this.fetchData = () => {
      this.showError = false;

      let youtube = $service.$fetch('library', 'google', 'youtube');

      youtube.success((response) => {
        this.populateDetails('google', response.items);
      });

      youtube.failure((error) => {
        this.inform('err', error);
      });

      let magic = $service.$fetch('library', 'magic', 'productListing');

      magic.success((response) => {
        this.populateDetails('magic', response.productdetail);
      });

      magic.failure((error) => {
        this.inform('err', error);
      });
    };

    this.fetchData();
  }
}
