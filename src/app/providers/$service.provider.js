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
            method: 'POST'
          }
        },
        google: {
          youtube: {
            method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDf7G7HNHRaSXZOdIszJaU9aiRl9TZYorY' +
            '&part=snippet&q=common+core+english+grades+k12&maxResults=50'
          }
        }
      }
    };
    this.library = [];
  }

  $get($q, $http) {
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

        $http(category[type]).then((response) => {
          defer.resolve(response);
        }, (error) => {
          defer.reject(error);
        });

        return promise;
      }
    };
  }
}

export default $ServiceProvider;
