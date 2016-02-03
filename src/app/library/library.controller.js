export class LibraryController {
  constructor($scope, $log, $http, $service, $state) {
    'ngInject';
    this.search = '';
    this.details = [];
    this.showFilter = false;
    this.showError = false;
    this.MAX_LIMIT = 50;

    this.filter = {
      subject: {
        grammar: false,
        language: false,
        reading: false,
        research: false,
        speakingListening: false,
        writing: false
      }
    };
    this.errorMessage = {
      message: 'Could not connect with Server.'
    };
    this.categoryMapping = {
      epub: {name: 'Epub', icon: 'assets/images/clipboard-text.svg'},
      game: {name: 'Game', icon: 'assets/images/gamepad-variant.svg'},
      video: {name: 'Video', icon: 'assets/images/video.svg'},
      ebook: {name: 'E - Book', icon: 'assets/images/clipboard-text.svg'},
      pdf: {name: 'PDF', icon: 'assets/images/file-pdf-box.svg'},
      simulation: {name: 'Simulation', icon: 'assets/images/desktop-mac.svg'},
      audio: {name: 'Audio', icon: 'assets/images/audio_icon.svg'},
      youtube: {name: 'YouTube', icon: 'assets/images/youtubeVideo_icon.svg'}
    };

    this.inform = (type, info) => {
      $log.warn(info);
      this.showError = true;
    };

    this.populateDetails = (type, infoList) => {
      var temp = [];
      _.each(infoList, (item, index) => {
        if (index < this.MAX_LIMIT / 2) {
          switch (type) {
            case 'magic':
              temp.push({
                title: item.title,
                subject: item.subject || item.subject2 || "English",
                author: item.author || "Magic",
                meta: {
                  gradeFrom: item.gradeFrom,
                  gradeTo: item.gradeTo
                },
                coverImage: item.coverImage,
                category: this.categoryMapping[item.productType] ,
                description: 'Updated Invitation: Platform + Assessments + Analytics + Origin - ' +
                  'Daily Scrum @ Weekly from' +
                  '10:45am to  11:05am on weekdays from Wed Jan 13 to Wed Jan 27Updated Invitation: ' +
                  'Platform + Assessments' + 'Analytics + Origin - Daily Scrum @ Weekly from 10:45am to 11:05am ' +
                  'on weekdays from Wed Jan 13 to' +
                  'Wed Jan 27',
                analytics: {
                  shares: 43,
                  views: 78
                }
              });
              break;
            case 'google':
              temp.push({
                title: item.snippet.title,
                author: "Youtube",
                coverImage: item.snippet.thumbnails.medium.url,
                category: this.categoryMapping.youtube,
                meta: {
                  description: item.snippet.description
                },
                id:item.id.videoId,
                analytics: {
                  shares: 4,
                  views: 7
                }
              });
              break;
          }
        }
      });

      let domain = type;
      let cat = (type === 'magic') ? 'productListing' : 'youtube';
      $service.$append('library', domain, cat, temp);
      this.details = $service.$query('', 'full');
      this.details = _.shuffle(this.details);
    };

    this.openProduct = (id) => {
      $state.go('product', {
        id: id
      });
    };

    this.fetchData = () => {
      this.showError = false;

      let youtube = $service.$fetch('library', 'google', 'youtube');

      youtube.success((response) => {
        this.populateDetails('google', response.items);
      });

      youtube.failure((error) => {
        this.inform('err', error);
      });

      let magic = $service.$fetch('library', 'magic', 'productListing');

      magic.success((response) => {
        this.populateDetails('magic', response.productdetail);
      });

      magic.failure((error) => {
        this.inform('err', error);
      });
    };

    this.fetchData();
    var filterList = {
      "contentFilter": [
        {
          "filterList": [
            {
              "id": 1,
              "name": "Mathematics",
              "from": null,
              "to": null,
              "range": "1",
              "displayOrder": 0
            },
            {
              "id": 2,
              "name": "Social Studies",
              "from": null,
              "to": null,
              "range": "2",
              "displayOrder": 0
            },
            {
              "id": 3,
              "name": "Science",
              "from": null,
              "to": null,
              "range": "3",
              "displayOrder": 0
            },
            {
              "id": 4,
              "name": "Language Arts",
              "from": null,
              "to": null,
              "range": "4",
              "displayOrder": 0
            },
            {
              "id": 5,
              "name": "General Knowledge",
              "from": null,
              "to": null,
              "range": "5",
              "displayOrder": 0
            },
            {
              "id": 6,
              "name": "Health & Sports",
              "from": null,
              "to": null,
              "range": "6",
              "displayOrder": 0
            },
            {
              "id": 79,
              "name": "English",
              "from": null,
              "to": null,
              "range": "79",
              "displayOrder": 0
            }
          ],
          "title": "Subjects",
          "id": "subjects"
        },
        {
          "filterList": [
            {
              "id": 1,
              "name": "Pre K - K",
              "from": "1",
              "to": "2",
              "range": "1,2",
              "displayOrder": 0
            },
            {
              "id": 2,
              "name": "1 - 2",
              "from": "3",
              "to": "4",
              "range": "3,4",
              "displayOrder": 0
            },
            {
              "id": 3,
              "name": "3 - 5",
              "from": "5",
              "to": "7",
              "range": "5,6,7",
              "displayOrder": 0
            },
            {
              "id": 4,
              "name": "6 - 12",
              "from": "8",
              "to": "14",
              "range": "8,9,10,11,12,13,14",
              "displayOrder": 0
            }
          ],
          "title": "Grades",
          "id": "grade"
        },
        {
          "filterList": [
            {
              "id": 1,
              "name": "Blue",
              "from": null,
              "to": null,
              "range": "1",
              "displayOrder": 0
            },
            {
              "id": 2,
              "name": "Gold",
              "from": null,
              "to": null,
              "range": "2",
              "displayOrder": 0
            },
            {
              "id": 3,
              "name": "Green",
              "from": null,
              "to": null,
              "range": "3",
              "displayOrder": 0
            },
            {
              "id": 4,
              "name": "Magenta",
              "from": null,
              "to": null,
              "range": "4",
              "displayOrder": 0
            },
            {
              "id": 5,
              "name": "Orange",
              "from": null,
              "to": null,
              "range": "5",
              "displayOrder": 0
            },
            {
              "id": 6,
              "name": "Purple",
              "from": null,
              "to": null,
              "range": "6",
              "displayOrder": 0
            },
            {
              "id": 7,
              "name": "Red",
              "from": null,
              "to": null,
              "range": "7",
              "displayOrder": 0
            },
            {
              "id": 8,
              "name": "Turquoise",
              "from": null,
              "to": null,
              "range": "8",
              "displayOrder": 0
            },
            {
              "id": 9,
              "name": "Yellow",
              "from": null,
              "to": null,
              "range": "9",
              "displayOrder": 0
            }
          ],
          "title": "Level",
          "id": "theme"
        },
        {
          "filterList": [
            {
              "id": 1,
              "name": "Pre-A",
              "from": null,
              "to": null,
              "range": "1",
              "displayOrder": 0
            },
            {
              "id": 2,
              "name": "A",
              "from": null,
              "to": null,
              "range": "2",
              "displayOrder": 0
            },
            {
              "id": 3,
              "name": "1",
              "from": null,
              "to": null,
              "range": "3",
              "displayOrder": 0
            },
            {
              "id": 4,
              "name": "2",
              "from": null,
              "to": null,
              "range": "4",
              "displayOrder": 0
            },
            {
              "id": 5,
              "name": "3",
              "from": null,
              "to": null,
              "range": "5",
              "displayOrder": 0
            },
            {
              "id": 6,
              "name": "3-4",
              "from": null,
              "to": null,
              "range": "6",
              "displayOrder": 0
            },
            {
              "id": 7,
              "name": "4",
              "from": null,
              "to": null,
              "range": "7",
              "displayOrder": 0
            },
            {
              "id": 8,
              "name": "5-6",
              "from": null,
              "to": null,
              "range": "8",
              "displayOrder": 0
            },
            {
              "id": 9,
              "name": "6",
              "from": null,
              "to": null,
              "range": "9",
              "displayOrder": 0
            },
            {
              "id": 10,
              "name": "6-8",
              "from": null,
              "to": null,
              "range": "10",
              "displayOrder": 0
            },
            {
              "id": 11,
              "name": "8",
              "from": null,
              "to": null,
              "range": "11",
              "displayOrder": 0
            },
            {
              "id": 12,
              "name": "10",
              "from": null,
              "to": null,
              "range": "12",
              "displayOrder": 0
            },
            {
              "id": 13,
              "name": "12",
              "from": null,
              "to": null,
              "range": "13",
              "displayOrder": 0
            }
          ],
          "title": "DRA Level",
          "id": "dralevel"
        },
        {
          "filterList": [
            {
              "id": 98,
              "name": "NP",
              "from": "-1",
              "to": "-1",
              "range": "NP",
              "displayOrder": 0
            },
            {
              "id": 1,
              "name": "BR-450L (K-1)",
              "from": "0",
              "to": "450",
              "range": "0L,1L,2L,3L,4L,5L,6L,7L,8L,9L,10L,11L,12L,13L,14L,15L,16L,17L,18L,19L,20L,21L,22L,23L,24L,25L,26L,27L,28L,29L,30L,31L,32L,33L,34L,35L,36L,37L,38L,39L,40L,41L,42L,43L,44L,45L,46L,47L,48L,49L,50L,51L,52L,53L,54L,55L,56L,57L,58L,59L,60L,61L,62L,63L,64L,65L,66L,67L,68L,69L,70L,71L,72L,73L,74L,75L,76L,77L,78L,79L,80L,81L,82L,83L,84L,85L,86L,87L,88L,89L,90L,91L,92L,93L,94L,95L,96L,97L,98L,99L,100L,101L,102L,103L,104L,105L,106L,107L,108L,109L,110L,111L,112L,113L,114L,115L,116L,117L,118L,119L,120L,121L,122L,123L,124L,125L,126L,127L,128L,129L,130L,131L,132L,133L,134L,135L,136L,137L,138L,139L,140L,141L,142L,143L,144L,145L,146L,147L,148L,149L,150L,151L,152L,153L,154L,155L,156L,157L,158L,159L,160L,161L,162L,163L,164L,165L,166L,167L,168L,169L,170L,171L,172L,173L,174L,175L,176L,177L,178L,179L,180L,181L,182L,183L,184L,185L,186L,187L,188L,189L,190L,191L,192L,193L,194L,195L,196L,197L,198L,199L,200L,201L,202L,203L,204L,205L,206L,207L,208L,209L,210L,211L,212L,213L,214L,215L,216L,217L,218L,219L,220L,221L,222L,223L,224L,225L,226L,227L,228L,229L,230L,231L,232L,233L,234L,235L,236L,237L,238L,239L,240L,241L,242L,243L,244L,245L,246L,247L,248L,249L,250L,251L,252L,253L,254L,255L,256L,257L,258L,259L,260L,261L,262L,263L,264L,265L,266L,267L,268L,269L,270L,271L,272L,273L,274L,275L,276L,277L,278L,279L,280L,281L,282L,283L,284L,285L,286L,287L,288L,289L,290L,291L,292L,293L,294L,295L,296L,297L,298L,299L,300L,301L,302L,303L,304L,305L,306L,307L,308L,309L,310L,311L,312L,313L,314L,315L,316L,317L,318L,319L,320L,321L,322L,323L,324L,325L,326L,327L,328L,329L,330L,331L,332L,333L,334L,335L,336L,337L,338L,339L,340L,341L,342L,343L,344L,345L,346L,347L,348L,349L,350L,351L,352L,353L,354L,355L,356L,357L,358L,359L,360L,361L,362L,363L,364L,365L,366L,367L,368L,369L,370L,371L,372L,373L,374L,375L,376L,377L,378L,379L,380L,381L,382L,383L,384L,385L,386L,387L,388L,389L,390L,391L,392L,393L,394L,395L,396L,397L,398L,399L,400L,401L,402L,403L,404L,405L,406L,407L,408L,409L,410L,411L,412L,413L,414L,415L,416L,417L,418L,419L,420L,421L,422L,423L,424L,425L,426L,427L,428L,429L,430L,431L,432L,433L,434L,435L,436L,437L,438L,439L,440L,441L,442L,443L,444L,445L,446L,447L,448L,449L,450L",
              "displayOrder": 1
            },
            {
              "id": 2,
              "name": "450L-790L (2-3)",
              "from": "450",
              "to": "790",
              "range": "450L,451L,452L,453L,454L,455L,456L,457L,458L,459L,460L,461L,462L,463L,464L,465L,466L,467L,468L,469L,470L,471L,472L,473L,474L,475L,476L,477L,478L,479L,480L,481L,482L,483L,484L,485L,486L,487L,488L,489L,490L,491L,492L,493L,494L,495L,496L,497L,498L,499L,500L,501L,502L,503L,504L,505L,506L,507L,508L,509L,510L,511L,512L,513L,514L,515L,516L,517L,518L,519L,520L,521L,522L,523L,524L,525L,526L,527L,528L,529L,530L,531L,532L,533L,534L,535L,536L,537L,538L,539L,540L,541L,542L,543L,544L,545L,546L,547L,548L,549L,550L,551L,552L,553L,554L,555L,556L,557L,558L,559L,560L,561L,562L,563L,564L,565L,566L,567L,568L,569L,570L,571L,572L,573L,574L,575L,576L,577L,578L,579L,580L,581L,582L,583L,584L,585L,586L,587L,588L,589L,590L,591L,592L,593L,594L,595L,596L,597L,598L,599L,600L,601L,602L,603L,604L,605L,606L,607L,608L,609L,610L,611L,612L,613L,614L,615L,616L,617L,618L,619L,620L,621L,622L,623L,624L,625L,626L,627L,628L,629L,630L,631L,632L,633L,634L,635L,636L,637L,638L,639L,640L,641L,642L,643L,644L,645L,646L,647L,648L,649L,650L,651L,652L,653L,654L,655L,656L,657L,658L,659L,660L,661L,662L,663L,664L,665L,666L,667L,668L,669L,670L,671L,672L,673L,674L,675L,676L,677L,678L,679L,680L,681L,682L,683L,684L,685L,686L,687L,688L,689L,690L,691L,692L,693L,694L,695L,696L,697L,698L,699L,700L,701L,702L,703L,704L,705L,706L,707L,708L,709L,710L,711L,712L,713L,714L,715L,716L,717L,718L,719L,720L,721L,722L,723L,724L,725L,726L,727L,728L,729L,730L,731L,732L,733L,734L,735L,736L,737L,738L,739L,740L,741L,742L,743L,744L,745L,746L,747L,748L,749L,750L,751L,752L,753L,754L,755L,756L,757L,758L,759L,760L,761L,762L,763L,764L,765L,766L,767L,768L,769L,770L,771L,772L,773L,774L,775L,776L,777L,778L,779L,780L,781L,782L,783L,784L,785L,786L,787L,788L,789L,790L",
              "displayOrder": 2
            },
            {
              "id": 3,
              "name": "770L-980L (4-5)",
              "from": "770",
              "to": "980",
              "range": "770L,771L,772L,773L,774L,775L,776L,777L,778L,779L,780L,781L,782L,783L,784L,785L,786L,787L,788L,789L,790L,791L,792L,793L,794L,795L,796L,797L,798L,799L,800L,801L,802L,803L,804L,805L,806L,807L,808L,809L,810L,811L,812L,813L,814L,815L,816L,817L,818L,819L,820L,821L,822L,823L,824L,825L,826L,827L,828L,829L,830L,831L,832L,833L,834L,835L,836L,837L,838L,839L,840L,841L,842L,843L,844L,845L,846L,847L,848L,849L,850L,851L,852L,853L,854L,855L,856L,857L,858L,859L,860L,861L,862L,863L,864L,865L,866L,867L,868L,869L,870L,871L,872L,873L,874L,875L,876L,877L,878L,879L,880L,881L,882L,883L,884L,885L,886L,887L,888L,889L,890L,891L,892L,893L,894L,895L,896L,897L,898L,899L,900L,901L,902L,903L,904L,905L,906L,907L,908L,909L,910L,911L,912L,913L,914L,915L,916L,917L,918L,919L,920L,921L,922L,923L,924L,925L,926L,927L,928L,929L,930L,931L,932L,933L,934L,935L,936L,937L,938L,939L,940L,941L,942L,943L,944L,945L,946L,947L,948L,949L,950L,951L,952L,953L,954L,955L,956L,957L,958L,959L,960L,961L,962L,963L,964L,965L,966L,967L,968L,969L,970L,971L,972L,973L,974L,975L,976L,977L,978L,979L,980L",
              "displayOrder": 3
            },
            {
              "id": 4,
              "name": "955L-1155L (6-8)",
              "from": "955",
              "to": "1155",
              "range": "955L,956L,957L,958L,959L,960L,961L,962L,963L,964L,965L,966L,967L,968L,969L,970L,971L,972L,973L,974L,975L,976L,977L,978L,979L,980L,981L,982L,983L,984L,985L,986L,987L,988L,989L,990L,991L,992L,993L,994L,995L,996L,997L,998L,999L,1000L,1001L,1002L,1003L,1004L,1005L,1006L,1007L,1008L,1009L,1010L,1011L,1012L,1013L,1014L,1015L,1016L,1017L,1018L,1019L,1020L,1021L,1022L,1023L,1024L,1025L,1026L,1027L,1028L,1029L,1030L,1031L,1032L,1033L,1034L,1035L,1036L,1037L,1038L,1039L,1040L,1041L,1042L,1043L,1044L,1045L,1046L,1047L,1048L,1049L,1050L,1051L,1052L,1053L,1054L,1055L,1056L,1057L,1058L,1059L,1060L,1061L,1062L,1063L,1064L,1065L,1066L,1067L,1068L,1069L,1070L,1071L,1072L,1073L,1074L,1075L,1076L,1077L,1078L,1079L,1080L,1081L,1082L,1083L,1084L,1085L,1086L,1087L,1088L,1089L,1090L,1091L,1092L,1093L,1094L,1095L,1096L,1097L,1098L,1099L,1100L,1101L,1102L,1103L,1104L,1105L,1106L,1107L,1108L,1109L,1110L,1111L,1112L,1113L,1114L,1115L,1116L,1117L,1118L,1119L,1120L,1121L,1122L,1123L,1124L,1125L,1126L,1127L,1128L,1129L,1130L,1131L,1132L,1133L,1134L,1135L,1136L,1137L,1138L,1139L,1140L,1141L,1142L,1143L,1144L,1145L,1146L,1147L,1148L,1149L,1150L,1151L,1152L,1153L,1154L,1155L",
              "displayOrder": 4
            }
          ]
        }
      ]
    }
    $log.debug(filterList);

  }
}
