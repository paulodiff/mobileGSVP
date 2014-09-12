"use strict";angular.module("myApp.controllers").controller("AppCtrl",["$scope","USER_ROLES","AUTH_EVENTS","$rootScope","AuthService","Session","Restangular","$state","$ionicPopup","$ionicSideMenuDelegate",function(e,t,o,n,i,c,r,a,u,l){e.currentUser=null,e.userRoles=t,e.isAuthorized=i.isAuthorized,e.go=function(e){a.go(e)},window.ionic,e.toggleLeft=function(){l.toggleLeft(e.$$childHead)},n.base_url="http://federadati.provincia.rimini.it:3000",r.setBaseUrl(n.base_url+"/apiQ"),n.$on(o.loginSuccess,function(){e.currentUser=c.nome_breve_utenti,r.setDefaultRequestParams({apiKey:c.token}),a.go("menu.list")}),n.$on(o.logoutSuccess,function(){e.currentUser="",r.setDefaultRequestParams({apiKey:""}),a.go("menu.home")}),n.$on(o.loginFailed,function(){var e=u.alert({title:"Login errato",template:"Immettere nome utente e password corrette"});e.then(function(){a.go("menu.home")})}),n.$on(o.notAuthenticated,function(){e.currentUser=c.nome_breve_utenti;var t=u.alert({title:"Utente non autenticato",template:"Immettere nome utente e password"});t.then(function(){a.go("menu.home")})}),n.$on("$stateChangeStart",function(e,t){t.accessLogged&&(i.isAuthenticated()||(e.preventDefault(),n.$broadcast(o.notAuthenticated)))})}]).controller("LoginController",["$scope","$rootScope","AUTH_EVENTS","AuthService","$state",function(e,t,o,n,i){e.credentials={username:"",password:""},e.leftButtons=[{type:"button-icon button-clear ion-navicon",tap:function(){$ionicSideMenuDelegate.toggleLeft(e.$$childHead)}}],e.navTitle='<span class="item-calm">Gestione Volontari</span>',e.goto_help=function(){i.go("menu.help")},e.login=function(e){n.login(e).then(function(){t.$broadcast(o.loginSuccess)},function(){t.$broadcast(o.loginFailed)})},e.logout=function(e){n.logout(e).then(function(){t.$broadcast(o.logoutSuccess)},function(){t.$broadcast(o.logoutSuccess)})}}]).controller("AboutController",["$scope","$rootScope","AUTH_EVENTS","AuthService","Session","$location","$ionicLoading","$http","$ionicPopup",function(e,t,o,n,i,c,r,a,u){e.navTitle=i.nome_breve_utenti,e.base_url=t.base_url,e.$location={},angular.forEach("protocol host port path search hash".split(" "),function(t){e.$location[t]=function(){var e=c[t].call(c);return angular.isObject(e)?angular.toJson(e):e}}),e.test_connection=function(){r.show({template:"Loading..."}),a({method:"GET",url:t.base_url+"/mv/testconnection"}).success(function(){var e=u.alert({title:"OK!",template:"Test di connessione ok"});e.then(function(){})}).error(function(){var e=u.alert({title:"Errori!",template:"Test di connessione FALLITO"});e.then(function(){})}),r.hide()}}]).controller("HelpController",["$scope","$rootScope","AUTH_EVENTS","AuthService","Session","$location","$ionicLoading","$http","$ionicPopup","$ionicSlideBoxDelegate","$state",function(e,t,o,n,i,c,r,a,u,l,s){e.goto_login=function(){s.go("menu.login")}}]);