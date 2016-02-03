/**
 * @author: Akshay Kr Singh
 * @date: 1/2/16
 * @email: akshay.x666@gmail.com
 */
class $ServiceProvider {
  constructor() {

    this.$config = {
      token: '',
      API: {
        magic: {
          productListing: {
            HOST: 'mbx-api-staging.getmagicbox.com',
            url: '/services/product/v1.0/getProductList',
            preProcess: true,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            retrieved: false,
            appended: false,
            $stored: true,
            mapping: {}
          },
          addUpdateProduct: {
            HOST: 'mbx-api-staging.getmagicbox.com',
            url: '/services//product/v1.0/addUpdateFreeBookUserAccess',
            preProcess: true,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            retrieved: false,
            appended: false,
            $stored: false,
            mapping: {}
          },
          sessionStatus: {
            HOST: 'origin.stg1.getmagicbox.com',
            url: '/services/user/account/sessionstatus.json',
            method: 'GET',
            preProcess: true,
            retrieved: false,
            appended: false,
            $stored: false,
            mapping: {}
          },
          freeBookListing: {
            HOST: 'mbx-api-staging.getmagicbox.com',
            url: '/services/product/v1.0/getUserFreeBookList',
            preProcess: true,
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'GET',
            retrieved: false,
            appended: false,
            $stored: true,
            mapping: {}
          }
        },
        google: {
          youtube: {
            method: 'GET',
            preProcess: false,
            url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDf7G7HNHRaSXZOdIszJaU9aiRl9TZYorY' +
            '&part=snippet&q=common+core+english+grades+k12&maxResults=50',
            retrieved: false,
            appended: false,
            $stored: true,
            mapping: {
              title: {struct: 'snippet.title', type: 'JSON'},
              author: {struct: 'Youtube', type: 'TEXT'},
              coverImage: {struct: 'snippet.thumbnails.medium.url', type: 'JSON'},
              category: {struct: 'categoryMapping.youtube', type: 'JSON'},
              meta: {description: {struct: 'snippet.description', type: 'JSON'}},
              id: {struct: 'id.videoId', type: 'JSON'}
            }
          }
        }
      }
    };

    this.library = [];
    this.freeBooks = [];

  }

  setToken(val) {
    this.$config.token = val;
  }

  $get($log, $q, $http, $location) {
    'ngInject';

    var connect = (loc, domain, type, info) => {
      let category = this.$config.API[domain] || {};

      var defer = $q.defer();
      var promise = defer.promise;

      promise.success = (fn) => {
        promise.then((res) => {
          fn(res.data, res.status, res.headers);
        });

        return promise;
      };

      promise.failure = (fn) => {
        promise.then(null, (res) => {
          fn(res.data, res.status, res.headers);
        });

        return promise;
      };

      if (!category[type].retrieved || !category[type].$stored) {
        var payload = category[type];
        var connectUrl = $location.protocol() + '://' + payload.HOST;
        var $httpPromise = {};

        if (payload.preProcess) {
          payload.url = connectUrl + payload.url;
        }

        if (info) {
          if (!_.isEmpty(info.urlParams)) {
            payload.url = payload.url + '?';
            _.each(info.urlParams, (value, key) => {
              payload.url += key + "=" + value + "&";
            });

            payload.url = payload.url.replace(/\&+$/, '');
          }

          if (!_.isEmpty(info.requestParams)) {
            payload.data = info.requestParams;
            $httpPromise = $http(payload);
          } else {
            $httpPromise = $http(payload);
          }

        } else {
          $httpPromise = $http(payload);
        }

        $httpPromise.then((response) => {
          defer.resolve(response);
          this.$config.API[domain][type].retrieved = true;
        }, (error) => {
          defer.reject(error);
        });

        return promise;
      }

      var mapResponse = () => {
        var resJson = {}, response = [];
        function setByPath(o, path, value) {
          var parts = path.split('.');
          if (parts.length > 1) {
            for (var i = 0; i < parts.length - 1; i++) {
              if (!o[parts[i]])
                o[parts[i]] = {};
              o = o[parts[i]];
            }
          }

          o[parts[parts.length - 1]] = value;
          return o;
        }

        _.each(this[loc], (item) => {
          if (item.section === domain) {
            _.each(item, (value, key) => {
              var cat = this.$config.API[domain];
              if (cat[type].mapping[key]) {
                var format = cat[type].mapping[key];
                if (format.type === 'JSON') {
                  _.extend(resJson, setByPath(resJson, format.struct, value));
                }
              }
            });

            response.push(resJson);
          }
        });
        return response;
      };

      if (domain === 'magic') {
        defer.resolve({data: {productSoList: mapResponse()}});
      } else if (domain === 'google') {
        defer.resolve({data: {items: mapResponse()}});
      }
      return promise;
    };

    var append = (loc, domain, type, list) => {
      if (!this.$config.API[domain][type].appended) {
        _.each(list, (item) => {
          item.ref = _.random(1, 10000);
          item.section = domain;
          this[loc].push(item);
        });
        this[loc] = _.shuffle(this[loc]);
        this.$config.API[domain][type].appended = true;
      }
    };

    var query = (loc, id, type, limit) => {
      var list = [];
      var max = limit || -1;
      var query = {};
      switch (type) {
        case 'full':
          _.each(this[loc], (item, index) => {
            if (max !== -1) {
              if (index < max) {
                list.push(item);
              }
              return 1;
            }

            list.push(item);
          });
          break;
        case 'unique':
          query = _.find(this[loc], (item) => {
            if ((/[a-zA-Z]/.test(item.id))) {
              return item.id === id;
            }

            return item.id === parseInt(id, 10);
          });
          break;
      }

      if (!_.isEmpty(query)) {
        return query;
      }

      return list;
    };

    var token = (mode, val) => {
      switch (mode) {
        case 'set':
          this.$config.token = val;
          break;
        case 'get':
          return this.$config.token;
      }
    };

    return {
      $connect: connect,
      $append: append,
      $query: query,
      token: token
    };
  }
}

export default $ServiceProvider;
