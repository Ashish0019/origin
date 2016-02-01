export class ProductController {
  constructor($scope, $log, $http, $service, $stateParams,$sce) {
    'ngInject';
    this.showDetails = false;
    this.info = {};


    var detail = $service.$query($stateParams.id, 'unique');

    $log.debug(detail.author,detail);
    if (!_.isEmpty(detail)) {
      this.author = detail.author;
      this.showDetails = true;

      if(detail.author== "Youtube"){
        this.info.title = detail.title;
        this.info.Content = "in" +" "  + "<b><u>" + detail.subject + "</u></b>"  +" "+"by" + " "
          +"<b><u>" + detail.author + "</u></b>";
        this.description = detail.meta.description;
        this.info.Type = " : Youtube Video";
        this.videoPath="http://www.youtube.com/embed/"+ detail.id;
        this.yVideo = $sce.trustAsResourceUrl(this.videoPath);
        $log.debug(this.yvideo)
      }
      else {
        this.info.title = detail.title;
        this.info.Content = "in" + " " + "<b><u>" + detail.subject + "</u></b>" + " " + "by" + " "
          + "<b><u>" + detail.author + "</u></b>";
        this.info.Grades = " : " + detail.meta.gradeFrom + " - " + detail.meta.gradeTo;
        this.info.Publisher = " : " + "Magic publisher";
        this.info.Type = " : " + detail.productType;
        this.description = detail.meta.description;
        this.info.Image = detail.coverImage;
      }
    }
  }
}
