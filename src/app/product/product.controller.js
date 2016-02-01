export class ProductController {
  constructor($scope, $log, $http, $service) {
    'ngInject';
    this.productData = [];
    this.showDetails = false;

    var $details = $service.$query((data) => {
      this.productData = data.productdetail[5];
      this.showDetails = true;
      this.productContent = "in" +" "  + "<b><u>" + this.productData.subject+ "</u></b>"  +" "+"by" + " "
        +"<b><u>" + this.productData.author + "</u></b>"  ;
      this.productGrades = " : " + this.productData.gradeFrom +" - " + this.productData.gradeTo;
      this.productPublisher = " : " + "Magic publisher";
      this.productType = " : " + this.productData.productType;
      this.productImage = this.productData.coverImage;
      $log.debug(this.productData, this.productGrades,this.productData.coverImage);
    });
  }
}
