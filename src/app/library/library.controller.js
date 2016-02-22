export class LibraryController {
  constructor($scope, $log, $window, $service, $state, $timeout) {
    'ngInject';
    this.details = [];
    this.showFilter = false;
    this.showError = false;
    this.MAX_LIMIT = 1000;
    this.recordCount = 1000;
    this.searchInfo = {$current: ''};
    this.requests = {youtube: 'pending', magic: 'pending'};
    this.sortStats = {prop: 'title', reverse: false};
    this.hideNavSearch = false;
    this.filterGrid = {
      show: {
        grade: {
          enabled: true,
          filterKey: 'filteredGradesList'
        },
        subjects: {
          enabled: true,
          filterKey: 'filteredSubjectsList'
        },
        popularcat: {
          enabled: true,
          filterKey: 'filterProductTypeList'
        }
      },
      filterArr: []
    };
    this.search = (info) => {
      if (!info.$bypass) {
        this.showContentNumber = true;
        if (!_.isEmpty(info.$current) || _.isEmpty(info.$current)) {
          this.refreshListing({
            requestParams: {
              pageNumber: 1,
              maxRecordCount: this.recordCount,
              searchText: [info.$current]
            },
            youtube: {query: info.$current}
            /*,
             filter: {0: ['section', 'magic']}*/
          });
        }
      }
      else {
        this.refreshListing({
          requestParams: {
            pageNumber: 1,
            maxRecordCount: this.recordCount,
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
      $log.debug(info);
      this.showError = true;
    };

    this.populateDetails = (type, infoList) => {
      var temp = [];
      _.each(infoList, (item, index) => {

        if (index < this.MAX_LIMIT) {
          switch (type) {
            case 'magic':
              var pushDetails = {
                title: item.title,
                subject: item.subject || "English",
                author: item.author || "Magic",
                id: item.productId,
                free: item.free,
                meta: {
                  gradeFrom: item.gradeFrom,
                  gradeTo: item.gradeTo
                },
                coverImage: item.thumbnail,
                description: item.description,

                analytics: {
                  shares: 43,
                  views: 78
                }
              };

              if (item.productTypeTitle) {
                pushDetails.category = this.categoryMapping[item.productTypeTitle.toLowerCase()];
              }
              else {
                return 1;
              }
              //to hide premium content
              if (pushDetails.free == true) {
                temp.push(pushDetails);
              }
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

    this.gradeSelected = ($index) => {
      this.filterGrid.filterArr[0].filterList[$index].checked = !this.filterGrid
        .filterArr[0].filterList[$index].checked;
      this.filterSelected();
    };

    this.refreshListing = (params) => {
      var payload = params || {
          pageNumber: 1,
          maxRecordCount: this.recordCount
        };
      this.details = [];
      this.fetchData({
        action: 'refresh',
        requestParams: payload.requestParams,
        youtube: params.youtube,
        filter: payload.filter
      });
    };

    var filters = $service.$connect('filters', 'magic', 'filterDetails', {
      urlParams: {token: $service.token('get')},
      options: {action: 'refresh'}
    });

    filters.success((response) => {
      $log.debug(response);
      _.each(response.contentFilter, (item) => {
        _.each(item.filterList, (el) => {
          el.checked = false;
        });
        if (this.filterGrid.show[item.id]) {
          if (this.filterGrid.show[item.id].enabled) {
            this.filterGrid.filterArr.push(item);
          }
        }
      });
    });

    this.sort = (prop, order) => {
      switch (order) {
        case 'asc':
          this.sortStats.prop = prop;
          this.sortStats.reverse = false;
          break;
        case 'desc':
          this.sortStats.prop = prop;
          this.sortStats.reverse = true;
          break;
      }
    };

    this.filterSelected = () => {
      var json = {};
      var buildRequest = {};
      $timeout(() => {
        _.each(this.filterGrid.filterArr, (filterSection) => {
          json[filterSection.id] = filterSection.filterList;
          buildRequest[this.filterGrid.show[filterSection.id].filterKey] = [];
          _.each(filterSection.filterList, (item) => {
            if (item.checked) {
              if (filterSection.id === 'grade') {
                return buildRequest[this.filterGrid.show[filterSection.id].filterKey].push(item.name);
              }
              buildRequest[this.filterGrid.show[filterSection.id].filterKey].push(item.id);
            }
          });
        });

        this.refreshListing({
          requestParams: _.merge({
            pageNumber: 1,
            maxRecordCount: this.recordCount
          }, buildRequest)
        });
      }, 400);
    };

    this.reset = () => {
      $window.location.reload();
    };

    this.fetchData = (params) => {
      this.showError = false;
      this.requests.youtube = 'pending';
      this.requests.magic = 'pending';

      var payload = {
        pageNumber: 1,
        maxRecordCount: this.recordCount
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
          let validQuery = ((params.youtube.query).match(/[a-zA-Z0-9 ]/));
          youtubeQuery += '+' + validQuery;
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
            maxResults: 15
          },
          options: youtubeOptions
        });

        youtube.success((response) => {
          this.requests.youtube = 'complete';
          this.populateDetails('google', response.items);
        });

        youtube.failure((error) => {
          this.requests.youtube = 'complete';
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
          this.requests.magic = 'complete';
          this.populateDetails('magic', response.productSoList);
        });

        magic.failure((error) => {
          this.requests.magic = 'complete';
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
      this.fetchData("");


    }
  }
}
