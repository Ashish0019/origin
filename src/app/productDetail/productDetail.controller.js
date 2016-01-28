export class ProductController {
  constructor($scope, $log, $http ) {
    'ngInject';
    $http({
      method: 'POST',
      url: 'http://amz.s-1.mdistribute.magicsw.com/services/catalog/allproductdetail.json',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{'searchobject':{}}
    }).then(function successCallback(response) {
      $scope.sampleData = response.data.productdetail[5];

      $scope.sampleContent = "in" +" "  + "<b><u>" + $scope.sampleData.subject+ "</u></b>"  +" "+"by" + " "
        +"<b><u>" + $scope.sampleData.author + "</u></b>"  ;
      $scope.sampleGrades = " : " + $scope.sampleData.gradeFrom +" - " + $scope.sampleData.gradeTo;
      $scope.samplePublisher = " : " + "Magic publisher";
      $scope.sampleType = " : " + $scope.sampleData.productType;
      $scope.sampleImage = $scope.sampleData.coverImage;
      $log.debug($scope.sampleData, $scope.sampleGrades,$scope.sampleData.coverImage);
    }, function errorCallback(err) {
      $log.debug(err);
      alert("book listing service unavailable");
    });
  }
}
