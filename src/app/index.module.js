/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { LoginController } from '../app/login/login.controller';
import { LibraryController } from '../app/library/library.controller';
import { BrowseController } from '../app/browseMore/browseMore.controller';
import { SignInController } from '../app/signIn/signIn.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
//import { ScrollDirective } from '../app/components/scroll/scroll.directive';

angular.module('originWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria',
  'ngResource', 'ui.router', 'ngMaterial', 'toastr'])

  .constant('malarkey', malarkey)
  .constant('moment', moment)

  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .controller('LibraryController', LibraryController)
  .controller('LoginController', LoginController)
  .controller('BrowseController', BrowseController)
  .controller('SignInController', SignInController)
//  .directive('scroll', ScrollDirective)
  .directive('navMenu', NavbarDirective);
