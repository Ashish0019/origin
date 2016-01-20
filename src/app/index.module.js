/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { SignUpController } from '../app/signUp/signUp.controller';
import { LibraryController } from '../app/library/library.controller';
import { BrowseController } from '../app/browseMore/browseMore.controller';
import { SignInController } from '../app/signIn/signIn.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';

angular.module('originWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria',
  'ngResource', 'ui.router', 'ngMaterial', 'toastr'])

  .constant('malarkey', malarkey)
  .constant('moment', moment)

  .config(config)
  .config(routerConfig)

  .run(runBlock)

  .controller('LibraryController', LibraryController)
  .controller('SignUpController', SignUpController)
  .controller('BrowseController', BrowseController)
  .controller('SignInController', SignInController)

  .directive('navMenu', NavbarDirective);
