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
            appended: false
          }
        },
        google: {
          youtube: {
            method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDf7G7HNHRaSXZOdIszJaU9aiRl9TZYorY' +
            '&part=snippet&q=common+core+english+grades+k12&maxResults=50',
            retrieved: false,
            appended: false
          }
        }
      }
    };
    this.library = [];
  }

  $get($log, $q, $http) {
    'ngInject';

    return {
      $fetch: (domain, type) => {
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
        }

        return promise;
      },
      $append: (loc, domain, type, list) => {
        if (!this.$config.API[domain][type].appended) {
          _.each(list, (item) => {
            item.ref = _.random(1, 10000);
            this[loc].push(item);
          });
          this[loc] = _.shuffle(this[loc]);
          this.$config.API[domain][type].appended = true;
        }
      },
      $query: (id, type, limit) => {
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
      }
    };
  }
}

export default $ServiceProvider;
