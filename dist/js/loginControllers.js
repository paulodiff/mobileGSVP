"use strict";angular.module("myApp.controllers").controller("AppCtrl",["$scope","USER_ROLES","AUTH_EVENTS","$rootScope","AuthService","Session","Restangular","$state","$ionicPopup","$ionicSideMenuDelegate",function(e,t,n,o,i,c,r,u,l,a){e.currentUser=null,e.userRoles=t,e.isAuthorized=i.isAuthorized,e.go=function(e){u.go(e)},window.ionic,e.toggleLeft=function(){a.toggleLeft(e.$$childHead)},o.base_url="http://federadati.provincia.rimini.it:3000",r.setBaseUrl(o.base_url+"/apiQ"),o.$on(n.loginSuccess,function(){e.currentUser=c.nome_breve_utenti,r.setDefaultRequestParams({apiKey:c.token}),u.go("menu.list")}),o.$on(n.logoutSuccess,function(){e.currentUser="",r.setDefaultRequestParams({apiKey:""}),u.go("menu.home")}),o.$on(n.loginFailed,function(){var e=l.alert({title:"Login errato",template:"Immettere nome utente e password corrette"});e.then(function(){u.go("menu.home")})}),o.$on(n.notAuthenticated,function(){e.currentUser=c.nome_breve_utenti;var t=l.alert({title:"Utente non autenticato",template:"Immettere nome utente e password"});t.then(function(){u.go("menu.home")})}),o.$on("$stateChangeStart",function(e,t){t.accessLogged&&(i.isAuthenticated()||(e.preventDefault(),o.$broadcast(n.notAuthenticated)))})}]).controller("LoginController",["$scope","$rootScope","AUTH_EVENTS","AuthService","$state",function(e,t,n,o,i){e.credentials={username:"",password:""},e.leftButtons=[{type:"button-icon button-clear ion-navicon",tap:function(){$ionicSideMenuDelegate.toggleLeft(e.$$childHead)}}],e.navTitle='<span class="item-calm">Gestione Volontari</span>',e.goto_help=function(){i.go("menu.help")},e.fullscreenOn=function(){screenfull.request()},e.fullscreenOff=function(){screenfull.exit()},e.login=function(e){o.login(e).then(function(){t.$broadcast(n.loginSuccess)},function(){t.$broadcast(n.loginFailed)})},e.logout=function(e){o.logout(e).then(function(){t.$broadcast(n.logoutSuccess)},function(){t.$broadcast(n.logoutSuccess)})}}]).controller("AboutController",["$scope","$rootScope","AUTH_EVENTS","AuthService","Session","$location","$ionicLoading","$http","$ionicPopup",function(e,t,n,o,i,c,r,u,l){e.navTitle=i.nome_breve_utenti,e.base_url=t.base_url,e.$location={},angular.forEach("protocol host port path search hash".split(" "),function(t){e.$location[t]=function(){var e=c[t].call(c);return angular.isObject(e)?angular.toJson(e):e}}),e.fullscreenOn=function(){screenfull.request()},e.fullscreenOff=function(){screenfull.exit()},e.test_connection=function(){r.show({template:"Loading..."}),u({method:"GET",url:t.base_url+"/mv/testconnection"}).success(function(){var e=l.alert({title:"OK!",template:"Test di connessione ok"});e.then(function(){})}).error(function(){var e=l.alert({title:"Errori!",template:"Test di connessione FALLITO"});e.then(function(){})}),r.hide()}}]).controller("HelpController",["$scope","$rootScope","AUTH_EVENTS","AuthService","Session","$location","$ionicLoading","$http","$ionicPopup","$ionicSlideBoxDelegate","$state",function(e,t,n,o,i,c,r,u,l,a,s){e.goto_login=function(){s.go("menu.login")}}]);