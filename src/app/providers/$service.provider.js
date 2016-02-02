/**
 * @author: Akshay Kr Singh
 * @date: 1/2/16
 * @email: akshay.x666@gmail.com
 */
class $ServiceProvider {
  constructor() {

    this.$config = {
      API: {
        magic: {
          productListing: {
            url: 'http://amz.s-1.mdistribute.magicsw.com/services/catalog/allproductdetail.json',
            headers: {
              'Content-Type': 'application/json'
            },
            data:{'searchobject':{}},
            method: 'POST',
            retrieved: false,
            appended: false,
            mapping: {}
          }
        },
        google: {
          youtube: {
            method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDf7G7HNHRaSXZOdIszJaU9aiRl9TZYorY' +
            '&part=snippet&q=common+core+english+grades+k12&maxResults=50',
            retrieved: false,
            appended: false,
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
  }

  $get($log, $q, $http) {
    'ngInject';

    var fetch = (loc, domain, type) => {
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

      if (!category[type].retrieved) {
        $http(category[type]).then((response) => {
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
        defer.resolve({data: {productdetail: mapResponse()}});
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

    var query = (id, type, limit) => {
      var list = [];
      var max = limit || -1;
      var query = {};
      switch (type) {
        case 'full':
          _.each(this.library, (item, index) => {
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
          query = _.find(this.library, {ref: parseInt(id, 10)});
          break;
      }

      if (!_.isEmpty(query)) {
        return query;
      }

      return list;
    };

    return {
      $fetch: fetch,
      $append: append,
      $query: query
    };
  }
}

export default $ServiceProvider;
