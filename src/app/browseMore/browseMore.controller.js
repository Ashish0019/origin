export class BrowseController {
  constructor($scope, $log,$http) {
    'ngInject';
    this.search = '';

    $http({
      method: 'POST',
      url: 'http://amz.s-1.mdistribute.magicsw.com/services/catalog/allproductdetail.json',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{'searchobject':{}}
    }).then(function successCallback(response) {
      $scope.productDetails = response.data.productdetail;
      $log.debug(1,$scope.productDetails)
    }, function errorCallback(err) {
     $log.debug(err)
    });

  }
}
