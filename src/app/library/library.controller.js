export class LibraryController {
  constructor($scope, $log, $http, $service, $state) {
    'ngInject';
    this.details = [];
    this.showFilter = false;
    this.showError = false;
    this.MAX_LIMIT = 50;
    this.subjectList = [];
    this.contentList = [];
    this.searchInfo = {$current: ''};

    this.search = (info) => {
      if (!info.$bypass) {
        if (!_.isEmpty(info.$current)) {
          this.refreshListing({
            requestParams: {
              pageNumber: 1,
              maxRecordCount: 50,
              searchText: [info.$current]
            },
            youtube: {query: info.$current}
            /*,
             filter: {0: ['section', 'magic']}*/
          });
        }
      } else {
        this.refreshListing({
          requestParams: {
            pageNumber: 1,
            maxRecordCount: 50,
            searchText: info.search.arr
          },
          youtube: {query: info.search.youtube}
        });
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
      youtube: {name: 'YouTube', icon: 'assets/images/youtubeVideo_icon.svg'}
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
              };

              if (item.productTypeTitle) {
                pushDetails.category = this.categoryMapping[item.productTypeTitle.toLowerCase()];
              }

              temp.push(pushDetails);
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
                id: item.id.videoId,
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
      this.details = $service.$query('library', '', 'full');
      this.details = _.shuffle(this.details);
    };

    this.openProduct = (id) => {
      $state.go('product', {
        id: id
      });
    };

    this.refreshListing = (params) => {
      var payload = params || {
          pageNumber: 1,
          maxRecordCount: 50
        };
      this.details = [];
      this.fetchData({
        action: 'refresh',
        requestParams: payload.requestParams,
        youtube: params.youtube,
        filter: payload.filter
      });
    };

    /*var filters = $service.$connect('filters', 'magic', 'filterDetails', {
      urlParams: {token: $service.token('get')}
    });

    filters.success((response) => {
      var tempArr, sub, tempArr1, content = [];

      _.each(response.contentFilter[1].filterList, function (info) {
        tempArr = info.name;
        sub.push(tempArr)
      });

      _.each(response.contentFilter[6].filterList, function (item) {
        tempArr1 = item.name;
        content.push(tempArr1)
      });

      this.subjectList = sub;
      this.contentList = content;
      $log.debug(this.subjectList,this.contentList);
    });*/

    this.fetchData = (params) => {
      this.showError = false;
      var payload = {
        pageNumber: 1,
        maxRecordCount: 50
      };

      var youtubeQuery = 'common+core+english+grades+k12';

      this.disabled = {youtube: false, magic: false};

      if (params) {
        if (params.requestParams) {
          payload = params.requestParams;
        }

        this.disabled.youtube = params.disableYoutube;
        this.disabled.magic = params.disableMagic;
        if (params.youtube) {
          youtubeQuery = params.youtube.query;
          delete params.youtube;
        }
      }

      if (!this.disabled.youtube) {
        var youtubeOptions = _.clone(params);
        if (youtubeOptions) {
          delete youtubeOptions.requestParams;
        }

        let youtube = $service.$connect('library', 'google', 'youtube', {
          urlParams: {
            key: 'AIzaSyDf7G7HNHRaSXZOdIszJaU9aiRl9TZYorY',
            part: 'snippet',
            q: youtubeQuery,
            maxResults: 50
          },
          options: youtubeOptions
        });

        youtube.success((response) => {
          this.populateDetails('google', response.items);
        });

        youtube.failure((error) => {
          this.inform('err', error);
        });
      }

      if (!this.disabled.magic) {
        let magic = $service.$connect('library', 'magic', 'productListing', {
          urlParams: {token: $service.token('get')},
          requestParams: payload,
          options: params
        });

        magic.success((response) => {
          this.populateDetails('magic', response.productSoList);
        });

        magic.failure((error) => {
          this.inform('err', error);
        });
      }
    };

    if (!_.isEmpty($service.search('get'))) {
      var youtubeSearch = '';
      var arr = $service.search('get');
      this.searchInfo.$current = [];
      _.each(arr, (item) => {
        youtubeSearch += item + '+';
        this.searchInfo.$current.push(item);
      });

      youtubeSearch = youtubeSearch.replace(/\++$/, '');
      this.search({$bypass: true, search: {arr: $service.search('get'), youtube: youtubeSearch}});

    } else {
      this.fetchData();
    }
  }
}
