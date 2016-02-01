export class ProductController {
  constructor($scope, $log, $http, $service, $stateParams) {
    'ngInject';
    this.showDetails = false;
    this.info = {};

    var detail = $service.$query($stateParams.id, 'unique');

    if (!_.isEmpty(detail)) {
      this.showDetails = true;
      this.info.Content = "in" +" "  + "<b><u>" + detail.subject + "</u></b>"  +" "+"by" + " "
        +"<b><u>" + detail.author + "</u></b>"  ;
      this.info.Grades = " : " + detail.meta.gradeFrom +" - " + detail.meta.gradeTo;
      this.info.Publisher = " : " + "Magic publisher";
      this.info.Type = " : " + detail.productType;
      this.description = detail.meta.description;
      this.info.Image = detail.coverImage;
    }
  }
}
