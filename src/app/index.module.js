/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { SignUpController } from '../app/signUp/signUp.controller';
import { HomeController } from '../app/home/home.controller';
import { BrowseController } from '../app/browseMore/browseMore.controller';
import { SignInController } from '../app/signIn/signIn.controller';
import { ProductController } from '../app/productDetail/productDetail.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { RjResizeDirective } from '../app/components/rjResize.directive';
import { FormCommitDirective } from '../app/components/formCommit/formCommit.directive';

angular.module('originWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria',
  'ngResource', 'ui.router', 'ngMaterial', 'toastr' , 'reCAPTCHA'])

  .constant('malarkey', malarkey)
  .constant('moment', moment)

  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .controller('HomeController', HomeController)
  .controller('SignUpController', SignUpController)
  .controller('BrowseController', BrowseController)
  .controller('SignInController', SignInController)
  .controller('ProductController', ProductController)

  .directive('navMenu', NavbarDirective)
  .directive('rjResize', RjResizeDirective)
  .directive('formCommit', FormCommitDirective);
