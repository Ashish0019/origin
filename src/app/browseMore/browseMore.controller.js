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
      $log.debug(1,response.data)

    }, function errorCallback(err) {
     $log.debug(err);
      alert("sorry service unavailable");
    });


   /* var contentSelfIcons = {
      video : "../assets/images/video_icon.svg",
      audio : "../assets/images/audio_icon.svg",
      epub  : "../assets/images/epub_icon.svg",
      ebook : "../assets/images/ebook_icon.svg",
      simulation :"../assets/images/simulator_icon.svg",
      game : "../assets/images/game_icon.svg",
      assessment:"../assets/images/exam_icon.svg",
      pdf:"../assets/images/pdf_icon.svg",
      EXT_RESOURCE:"../assets/images/ext_resource-icon.svg"
    }
    */





  }
}
