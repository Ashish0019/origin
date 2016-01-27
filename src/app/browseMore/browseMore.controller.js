export class BrowseController {
  constructor($scope, $log,$http , $mdSidenav) {
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
      $log.debug(1,response.data)

    }, function errorCallback(err) {
       $log.debug(err);
      alert("book listing service unavailable");
    });
    $scope.toggleleft = buildToggler('left');
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close left is done");
        });
    };






  }
}
