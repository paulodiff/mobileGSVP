"use strict";angular.module("myApp",["ionic","ui.router","ngResource","restangular","ui.bootstrap","angular-loading-bar","myApp.filters","myApp.services","myApp.directives","myApp.controllers"]).config(["$stateProvider","$urlRouterProvider","RestangularProvider",function(t,e,i){e.otherwise("/menu/home"),t.state("menu",{url:"/menu","abstract":!0,templateUrl:"menu.html"}),t.state("menu.home",{url:"/home",views:{menuContent:{templateUrl:"partials/login.html",controller:"LoginController"}},accessLevel:"free1"}),t.state("menu.login",{url:"/login",views:{menuContent:{templateUrl:"partials/login.html",controller:"LoginController"}},accessLogged:!1}),t.state("menu.report",{url:"/report",views:{menuContent:{templateUrl:"partials/reportM.html",controller:"ReportCtrlMobile"}},accessLogged:!0,configAction:"new"}),t.state("menu.list",{url:"/list",views:{menuContent:{templateUrl:"partials/ListItemM.html",controller:"InfiniteCtrl"}},accessLogged:!0,configAction:"new"}),t.state("menu.new",{url:"/new",views:{menuContent:{templateUrl:"partials/EditItemM.html",controller:"EditItemCtrl"}},accessLogged:!0,configAction:"new"}),t.state("menu.edit",{url:"/edit/:id",views:{menuContent:{templateUrl:"partials/EditItemM.html",controller:"EditItemCtrl"}},accessLogged:!0,configAction:"edit"}),t.state("view",{url:"/view/:id",templateUrl:"partials/EditItem.html",controller:"EditItemCtrl",accessLogged:!0,configAction:"view"}),t.state("menu.listRelazioni",{url:"/listRelazioni",views:{menuContent:{templateUrl:"partials/ListItemRelazioniM.html",controller:"InfiniteCtrlRelazioni"}},accessLogged:!0,configAction:"new"}),t.state("menu.newRelazioni",{url:"/newRelazioni/:id",views:{menuContent:{templateUrl:"partials/EditItemRelazioniM.html",controller:"EditItemCtrlRelazioni"}},accessLogged:!0,configAction:"new"}),t.state("menu.editRelazioni",{url:"/editRelazioni/:id",views:{menuContent:{templateUrl:"partials/EditItemRelazioniM.html",controller:"EditItemCtrlRelazioni"}},accessLogged:!0,configAction:"edit"}),t.state("menu.about",{url:"/about",views:{menuContent:{templateUrl:"partials/about.html",controller:"AboutController"}},accessLogged:!1,configAction:"view"}),t.state("test",{url:"/test",templateUrl:"partials/test.html",controller:"TestController",accessLogged:!1,configAction:"view"}),i.setBaseUrl("/apiQ"),i.setDefaultRequestParams({apiKey:"**********************"}),i.setRestangularFields({id:"_id.$oid"}),i.setRequestInterceptor(function(t,e){return"put"===e?(t._id=void 0,t):t})}]).constant("AUTH_EVENTS",{loginSuccess:"auth-login-success",loginFailed:"auth-login-failed",logoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}).constant("API_PROVIDER_URL",{base_url:"http://10.0.1.157:3000",url2:"auth-login-failed",logoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}).constant("USER_ROLES",{all:"*",admin:"admin",editor:"editor",guest:"guest"});