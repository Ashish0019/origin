/******/!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}// webpackBootstrap
/******/
var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var o=n(1),r=n(2),a=n(3),i=n(4),l=n(5);angular.module("originWeb",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr"]).constant("malarkey",malarkey).constant("moment",moment).config(o.config).config(r.routerConfig).run(a.runBlock).controller("LoginController",i.LoginController).directive("navMenu",l.NavbarDirective)},function(e,t){"use strict";function n(e){"ngInject";e.debugEnabled(!0)}Object.defineProperty(t,"__esModule",{value:!0}),t.config=n,n.$inject=["$logProvider"]},function(e,t){"use strict";function n(e,t){"ngInject";e.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),t.otherwise("/login")}Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=n,n.$inject=["$stateProvider","$urlRouterProvider"]},function(e,t){"use strict";function n(e){"ngInject";e.debug("runBlock end")}Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=n,n.$inject=["$log"]},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function r(){"ngInject";n(this,r)};t.LoginController=o},function(e,t){"use strict";function n(){"ngInject";var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="}};return e}Object.defineProperty(t,"__esModule",{value:!0}),t.NavbarDirective=n}]),angular.module("originWeb").run(["$templateCache",function(e){e.put("app/login/login.html",'<div login-container="" layout="column" layout-fill="" layout-align="center center"><section login-panel="" layout-align="center center" layout="column"><div header-section="" layout="column" layout-align="center center"><span brand="">THE ORIGIN</span> <span sub-title="">- FUTURE OF LEARNING -</span></div><div form-section="" layout="column" layout-align="center center" class="ng-scope layout-row layout-align-center-center"><span tagline="" layout="column" layout-align="center start" class="ng-scope layout-row layout-align-center-start"><i>You are one step away from getting your free K-12 content</i></span><div user-types="" layout="row" layout-align="center center"><div user="student" layout="column" layout-align="center center"><div icon=""></div><div>Join as Student</div></div><div user="teacher" layout="column" layout-align="center center"><div icon=""></div><div>Join as Teacher</div></div></div><div registration-form=""><label></label> <input ng-model="user.fullname" placeholder="Full Name" type="text"> <input ng-model="user.email" placeholder="Email ID" type="email"> <input ng-model="user.password" placeholder="Password" type="password"><div password-info=""><i>Password must contain atleast 6 but not more than 20 characters</i></div></div></div></section></div>'),e.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-81879cbac8.js.map
