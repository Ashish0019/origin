/******/!function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}// webpackBootstrap
/******/
var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var o=n(1),a=n(2),r=n(3),i=n(4),l=n(5);angular.module("originWeb",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ngMaterial","toastr"]).constant("malarkey",malarkey).constant("moment",moment).config(o.config).config(a.routerConfig).run(r.runBlock).controller("LoginController",i.LoginController).directive("navMenu",l.NavbarDirective)},function(e,t){"use strict";function n(e){"ngInject";e.debugEnabled(!0)}Object.defineProperty(t,"__esModule",{value:!0}),t.config=n,n.$inject=["$logProvider"]},function(e,t){"use strict";function n(e,t){"ngInject";e.state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),t.otherwise("/login")}Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=n,n.$inject=["$stateProvider","$urlRouterProvider"]},function(e,t){"use strict";function n(e){"ngInject";e.debug("runBlock end")}Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=n,n.$inject=["$log"]},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function a(e,t){"ngInject";n(this,a),this.imageProps={current:"student"},e.$watch("email",function(t){if(e.email="","undefined"!=typeof t)e.email=t.length;else if(e.email.length>=1){var n=/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;e.check=Boolean(e.email.match(n))}})};o.$inject=["$scope","$log"],t.LoginController=o},function(e,t){"use strict";function n(){"ngInject";var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="}};return e}Object.defineProperty(t,"__esModule",{value:!0}),t.NavbarDirective=n}]),angular.module("originWeb").run(["$templateCache",function(e){e.put("app/login/login.html",'<div login-container="" layout="column" layout-fill="" layout-align="center center"><section login-panel="" layout-align="center center" layout="column"><div header-section="" layout="column" layout-align="center center"><span brand="">THE ORIGIN</span> <span sub-title="">- FUTURE OF LEARNING -</span></div><div form-section="" layout="column" layout-align="center center"><span tagline=""><i>You are one step away from getting your free K-12 content</i></span><div user-types="" layout="row" layout-align="center center"><div user="student" layout="column" layout-align="center center" ng-click="login.imageProps.current = \'student\'"><div icon="" md-ink="" ng-class="{\'active\': login.imageProps.current === \'student\'}"></div><div>Join as Student</div></div><div user="teacher" layout="column" layout-align="center center" ng-click="login.imageProps.current = \'teacher\'"><div icon="" md-ink="" ng-class="{\'active\': login.imageProps.current === \'teacher\'}"></div><div>Join as Teacher</div></div></div><div registration-details=""><input input-feature="" ng-model="user.fullname" placeholder="Full Name" type="text" maxlength="60" value="Full Name"> <input input-feature="" ng-model="user.email" placeholder="Email ID" type="email"> <input input-feature="" ng-model="user.password" placeholder="Password" type="password" minlength="6" maxlength="20"><div password-info=""><i>Password must contain atleast 6 but not more than 20 characters</i></div></div><div entity="check_box"><md-checkbox md-ink="" class="md-primary">By signing up, you agree to our <a href="">terms of use</a> and <a href="">privacy policy</a>.</md-checkbox></div><div registration="container" layout="row" layout-align="center center"><md-button registration="register-button" class="md-raised md-primary">REGISTER</md-button><md-button registration="cancel-button" class="md-raised md-primary">CANCEL</md-button></div><div entity="hasAccount">Already have an account? <a href="">Login now</a></div><div entity="third-party-login" layout="column" layout-align="center center"><hr>OR<hr><md-button third-party="Facebook" class="md-raised md-primary"><span class="tpFacebook">Connect with Facebook</span></md-button><md-button third-party="Google" class="md-raised md-primary"><span class="tpGoogle"></span> Connect with Google +</md-button></div></div></section></div>'),e.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-ba6dde9267.js.map
