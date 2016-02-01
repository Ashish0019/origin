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
    }).then((response) => {
      this.sampleData = response.data.productdetail[5];
      this.sampleContent = "in" +" "  + "<b><u>" + this.sampleData.subject+ "</u></b>"  +" "+"by" + " "
        +"<b><u>" + this.sampleData.author + "</u></b>"  ;
      this.sampleGrades = " : " + this.sampleData.gradeFrom +" - " + this.sampleData.gradeTo;
      this.samplePublisher = " : " + "Magic publisher";
      this.sampleType = " : " + this.sampleData.productType;
      this.sampleImage = this.sampleData.coverImage;
      $log.debug(this.sampleData, this.sampleGrades,this.sampleData.coverImage);
    }, (err) => {
      $log.debug(err);
      alert("book listing service unavailable");
    });
  }
}
