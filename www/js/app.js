'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ionic',
  'ui.router',
  'ngResource',
  'restangular',
  'ui.bootstrap',
  'angular-loading-bar',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', function($stateProvider, $urlRouterProvider, RestangularProvider) {
    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider
           // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
          // Here we are just setting up some convenience urls.
          //.when('/c?id', '/contacts/:id')
          //.when('/user/:id', '/contacts/:id')
          // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
          .otherwise('/menu/home');
    
    
    $stateProvider.state('menu', {
            url: "/menu",
            abstract: true,
            templateUrl: "menu.html"
    });
    
    
     $stateProvider.state('menu.home', {
            url: "/home",
            views: {
                'menuContent' :{
                    templateUrl: "partials/login.html",
                    controller: "LoginController"
                }
            },
            accessLevel: 'free1' 
    });
    
    
    $stateProvider.state('menu.login', {
            url: "/login",
            views: {
                'menuContent' :{
                    templateUrl: "partials/login.html",
                    controller: "LoginController"
                }
            },
            accessLogged: false 
    });
    
    /*
    $stateProvider.state('menu.home', {
        url: "/home",
        templateUrl: 'partials/login.html', 
        controller: 'LoginController',
        accessLevel: 'free1'
    });
        
    
    $stateProvider.state('menu.login',{
        url: '/login',
        templateUrl: 'partials/12login.html', 
        controller: 'LoginController1',
        accessLogged: false
    });
    */

    $stateProvider.state('menu.report',{
        url: '/report',
        views: {
                'menuContent' :{
                    templateUrl: "partials/reportM.html",
                    controller: "ReportCtrlMobile"
                }
            },
        accessLogged: true, 
        configAction: 'new'
    });
    
    $stateProvider.state('menu.list',{
        url: '/list',
        views: {
                'menuContent' :{
                    templateUrl: "partials/ListItemM.html",
                    controller: "InfiniteCtrl"
                }
            },
        accessLogged: true, 
        configAction: 'new'
    });
    
    $stateProvider.state('menu.new',{
        url: '/new',
        
        views: {
            'menuContent' :{
                templateUrl: "partials/EditItemM.html",
                controller: "EditItemCtrl"
            }
        },
        
        accessLogged: true, 
        configAction: 'new'
    });

    $stateProvider.state('menu.edit',{
        url: '/edit/:id',
        views: {
                'menuContent' :{
                    templateUrl: "partials/EditItemM.html",
                    controller: "EditItemCtrl"
                }
            },
        accessLogged: true, 
        configAction: 'edit'
    });
    
    
    $stateProvider.state('view',{
        url: '/view/:id',
        templateUrl: 'partials/EditItem.html', 
            controller: 'EditItemCtrl', 
        accessLogged: true, 
        configAction: 'view'
    });
    
    // rapporti
    
    
    $stateProvider.state('menu.listRelazioni',{
        url: '/listRelazioni',
        //templateUrl: 'partials/ListItemRelazioni.html', 
        //controller: 'InfiniteCtrlRelazioni', 
        
        views: {
                'menuContent' :{
                    templateUrl: "partials/ListItemRelazioniM.html",
                    controller: "InfiniteCtrlRelazioni"
                }
            },
        
        accessLogged: true, 
        configAction: 'new'
    });
    
    $stateProvider.state('menu.newRelazioni',{
        url: '/newRelazioni/:id',
        
        views: {
                'menuContent' :{
                    templateUrl: "partials/EditItemRelazioniM.html",
                    controller: "EditItemCtrlRelazioni"
                }
            },
        
        accessLogged: true, 
        configAction: 'new'
    });

    $stateProvider.state('menu.editRelazioni',{
        url: '/editRelazioni/:id',
         views: {
                'menuContent' :{
                    templateUrl: "partials/EditItemRelazioniM.html",
                    controller: "EditItemCtrlRelazioni"
                }
            },
        accessLogged: true, 
        configAction: 'edit'
    });
    
    $stateProvider.state('menu.about',{
        url: '/about',
         views: {
                'menuContent' :{
                    templateUrl: "partials/about.html",
                    controller: "AboutController"
                }
            },
        accessLogged: false, 
        configAction: 'view'
    });  
     

    $stateProvider.state('test',{
        url: '/test',
        templateUrl: 'partials/test.html', 
        controller: 'TestController', 
        accessLogged: false, 
        configAction: 'view'
    });    
  
  RestangularProvider.setBaseUrl('/apiQ');
  RestangularProvider.setDefaultRequestParams({ apiKey: '**********************' });
  RestangularProvider.setRestangularFields({id: '_id.$oid'});
  RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      })
}])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('API_PROVIDER_URL', {
  base_url: 'http://10.0.1.157:3000',
  url2: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

