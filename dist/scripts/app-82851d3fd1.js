/******/!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}// webpackBootstrap
/******/
var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var o=n(1),r=n(2),a=n(3),i=n(4),l=n(5);angular.module("originWeb",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr"]).constant("malarkey",malarkey).constant("moment",moment).config(o.config).config(r.routerConfig).run(a.runBlock).controller("LoginController",i.LoginController).directive("navMenu",l.NavbarDirective)},function(t,e){"use strict";function n(t){"ngInject";t.debugEnabled(!0)}Object.defineProperty(e,"__esModule",{value:!0}),e.config=n,n.$inject=["$logProvider"]},function(t,e){"use strict";function n(t,e){"ngInject";t.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),e.otherwise("/login")}Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=n,n.$inject=["$stateProvider","$urlRouterProvider"]},function(t,e){"use strict";function n(t){"ngInject";t.debug("runBlock end")}Object.defineProperty(e,"__esModule",{value:!0}),e.runBlock=n,n.$inject=["$log"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function r(){"ngInject";n(this,r)};e.LoginController=o},function(t,e){"use strict";function n(){"ngInject";var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="}};return t}Object.defineProperty(e,"__esModule",{value:!0}),e.NavbarDirective=n}]),angular.module("originWeb").run(["$templateCache",function(t){t.put("app/login/login.html",'<div login-container="" layout="column" layout-fill="" layout-align="center center"><section login-panel="" layout-align="center center" layout="column"><div header-section="" layout="column" layout-align="center center"><span brand="">THE ORIGIN</span> <span sub-title="">- FUTURE OF LEARNING -</span></div><div form-section="" layout="column" layout-align="center center"><span tagline=""><i>You are one step away from getting your free K-12 content</i></span><div user-types="" layout="row" layout-align="center center"><div user="student" layout="column" layout-align="center center"><div icon="" ng-click="studentFirst"></div><div>Join as Student</div></div><div user="teacher" layout="column" layout-align="center center"><div icon="" ng-click="teacherFirst"></div><div>Join as Teacher</div></div></div><div registration-details=""><input input-feature="" ng-model="user.fullname" placeholder="Full Name" type="text" maxlength="60"> <input input-feature="" ng-model="user.email" placeholder="Email ID" type="email"> <input input-feature="" ng-model="user.password" placeholder="Password" type="password" minlength="6" maxlength="20"><div password-info=""><i>Password must contain atleast 6 but not more than 20 characters</i></div></div><div entity="check_box"><md-checkbox md-no-ink="" class="md-primary" required="">By signing up, you agree to our <a href="">terms of use</a> and <a href="">privacy policy</a>.</md-checkbox></div><div registration="container" layout="row" layout-align="center center"><md-button registration="register-button" class="md-raised md-primary">REGISTER</md-button><md-button registration="cancel-button" class="md-raised md-primary">CANCEL</md-button></div><div entity="hasAccount">Already have an account? <a href="">Login now</a></div><div entity="third-party-login" layout="column" layout-align="center center"><hr>OR<hr><md-button third-party="Facebook" class="md-raised md-primary">Connect with Facebook</md-button><md-button third-party="Google" class="md-raised md-primary">Connect with Google +</md-button></div></div></section></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-82851d3fd1.js.map
