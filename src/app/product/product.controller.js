export class ProductController {
  constructor($scope, $log, $http, $service, $stateParams, $sce) {
    'ngInject';
    this.showDetails = false;
    this.info = {};


    var detail = $service.$query($stateParams.id, 'unique');

    if (!_.isEmpty(detail)) {
      this.author = detail.author;
      this.showDetails = true;

      if (detail.author == "Youtube") {
        this.info.title = detail.title;
        this.description = detail.meta.description;
        this.info.Type = " : Youtube Video";
        // here I could have found video ID directly from response from you tube api but I didn't opted for that
        // approach because in some case we get playlists in response which dont have a videoID
        // hence I cropped the video Id from the Image path that I got from response for images
        var regex = /\/vi\/(.*)\//;
        var url = detail.coverImage;
        var id = url.match(regex)[1];
        var videoPath = "http://www.youtube.com/embed/" + id;
        this.yVideo = $sce.trustAsResourceUrl(videoPath);
      }
      else {
        this.info.title = detail.title;
        this.info.Content = "in" + " " + "<b><u>" + detail.subject + "</u></b>" + " " + "by" + " "
          + "<b><u>" + detail.author + "</u></b>";
        this.info.Grades = " : " + detail.meta.gradeFrom + " - " + detail.meta.gradeTo;
        this.info.Publisher = " : " + "Magic publisher";
        this.info.Type = " : " + detail.productType;
        this.description = detail.meta.description;
        var imagePath = $sce.trustAsResourceUrl(detail.coverImage);
        this.info.Image = imagePath;
      }
    }
  }
}
