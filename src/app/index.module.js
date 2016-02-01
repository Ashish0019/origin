/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { SignUpController } from '../app/signUp/signUp.controller';
import { HomeController } from '../app/home/home.controller';
import { LibraryController } from '../app/library/library.controller';
import { SignInController } from '../app/signIn/signIn.controller';
import { ProductController } from '../app/product/product.controller';

import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { RjResizeDirective } from '../app/components/rjResize.directive';
import { BackImage } from '../app/components/backImg.directive';
import { FormCommitDirective } from '../app/components/formCommit/formCommit.directive';

import $ServiceProvider from '../app/providers/$service.provider';

angular.module('originWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'truncate', 'ngMessages', 'ngAria',
  'ngResource', 'ui.router', 'ngMaterial', 'reCAPTCHA'])

  .constant('moment', moment)

  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .controller('HomeController', HomeController)
  .controller('SignUpController', SignUpController)
  .controller('LibraryController', LibraryController)
  .controller('SignInController', SignInController)
  .controller('ProductController', ProductController)

  .provider('$service', $ServiceProvider)

  .directive('navMenu', NavbarDirective)
  .directive('rjResize', RjResizeDirective)
  .directive('backImg', BackImage)
  .directive('formCommit', FormCommitDirective);
