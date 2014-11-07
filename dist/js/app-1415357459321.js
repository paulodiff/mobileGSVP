'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ionic',
  'ui.router',
  'ngResource',
  'restangular',
  //'ui.bootstrap',
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
            templateUrl: "partials/menuM.html"
    });
    
    
     $stateProvider.state('menu.home', {
            url: "/home",
            views: {
                'menuContent' :{
                    templateUrl: "partials/loginM.html",
                    controller: "LoginController"
                }
            },
            accessLevel: 'free1' 
    });
    
    
    $stateProvider.state('menu.login', {
            url: "/login",
            views: {
                'menuContent' :{
                    templateUrl: "partials/loginM.html",
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
    
    
    $stateProvider.state('menu.view',{
        url: '/view/:id',
        views: {
                'menuContent' :{
                    templateUrl: 'partials/EditItemM.html', 
                    controller: 'EditItemCtrl', 
                }
            },
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

    $stateProvider.state('menu.viewRelazioni',{
        url: '/viewRelazioni/:id',
         views: {
                'menuContent' :{
                    templateUrl: "partials/EditItemRelazioniM.html",
                    controller: "EditItemCtrlRelazioni"
                }
            },
        accessLogged: true, 
        configAction: 'view'
    });    
    
    $stateProvider.state('menu.about',{
        url: '/about',
         views: {
                'menuContent' :{
                    templateUrl: "partials/aboutM.html",
                    controller: "AboutController"
                }
            },
        accessLogged: false, 
        configAction: 'view'
    });  
    
    $stateProvider.state('menu.help',{
        url: '/help',
         views: {
                'menuContent' :{
                    templateUrl: "partials/helpM.html",
                    controller: "HelpController"
                }
            },
        accessLogged: false, 
        configAction: 'view'
    });
     

    $stateProvider.state('test',{
        url: '/test',
        templateUrl: 'partials/testM.html', 
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


'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myApp.services', [])
   
.service('rService', [function () {
    
    this.time_diff = function(t1,t2) {
    
        void 0;
        //var d1 = new Date('1900-01-01T08:15:00.000Z');
        //var d2 = new Date('1900-01-01T09:20:00.000Z');
        void 0;
        void 0;
        void 0;
        var diff = t2 - t1;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        //console.log(diff);
        //console.log(hh);
        //console.log(mm);
        //console.log(ss);
        return (hh+':'+mm).toString();
    };
    
  }])


  .service('version', [function() {
      return '0.0.1';
  }])

/*

.service('modalService', ['$modal',
    function ($modal) {

   
        
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'partials/modal.html'
        };

        var modalOptions = {
            type: 2,
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }

            return $modal.open(tempModalDefaults).result;
        };

    }])

*/

/*

// Reddit ---------------------------------------------------------------------------------------------------
 .factory('Reddit', ['Restangular', function( Restangular) {
    var Reddit = function(id_utente) {
        console.log('Reddit init id_utente : ' + id_utente);
        this.items = [];
        this.busy = false;
        this.id_utenti_selezione = id_utente;
        this.mese_selezione = 0;
        this.anno_selezione = 0;
        this.start = 0;
        this.after = '';
    };

  Reddit.prototype.resetPage = function() {
    console.log('Reddit resetPage ');

    var me = this;
    me.start = 0;
    console.log('Reddit resetPage id_utenti_selezione:' +   me.id_utenti_selezione);
    console.log('Reddit resetPage mese_selezione:' +   me.mese_selezione);
    console.log('Reddit resetPage anno_selezione:' +   me.anno_selezione);
    console.log('Reddit resetPage start:' +   me.start);
    me.items = [];
  };
    
      
      
  Reddit.prototype.nextPage = function() {
    console.log('Reddit nextPage');
    var me = this;
    if (this.busy) { 
            console.log('Reddit busy! return');
            return;
    }
    this.busy = true;
    //var url = "/apiQ/serviziAll?limit=10" + this.after + "&jsonp=JSON_CALLBACK";
    //console.log(url);
      
    console.log('Reddit nextPage id_utenti_selezione:' +   me.id_utenti_selezione);
    console.log('Reddit nextPage mese_selezione:' +   me.mese_selezione);
    console.log('Reddit nextPage anno_selezione:' +   me.anno_selezione);
    console.log('Reddit resetPage start:' +   me.start);
      
    var baseAccounts = Restangular.all('serviziAll');
    // This will query /accounts and return a promise.
            
    var q_options = {
                            limit: 100, 
                            start: me.start,
                            id_utenti_selezione : me.id_utenti_selezione,
                            mese_selezione : me.mese_selezione,
                            anno_selezione: me.anno_selezione
                    };
    console.log('Reddit query q_options');
    console.log(q_options);
    baseAccounts.getList(q_options)
    .then(function(accounts) {
        //$scope.projects = accounts;
        //console.log(accounts);
        //console.log(accounts.length);
        //var items = accounts;
        me.start = me.start + accounts.length;
        for (var i = 0; i < accounts.length; i++) {
        //me.items.push(accounts[i].id_utenti);
        // patch per il calcolo delle ore
            var t1 = new Date(accounts[i].da_ora_servizi); 
            var t2 = new Date(accounts[i].a_ora_servizi);
            var msec = t2 - t1;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            accounts[i].ore_calcolate_servizi  = hh+':'+mm;
            
            
            me.items.push(accounts[i]);
        }
        //this.after = "t3_" + this.items[this.items.length - 1].id;
        me.busy = false;
    }) 
  };

  return Reddit;
}])

*/

/*
.service('Phone', ['$resource',
  function($resource){
    return $resource('/apiQ/utentiAll', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }])
*/

.factory('AuthService', ['API_PROVIDER_URL', '$http', 'Session', '$rootScope', 
                         function (API_PROVIDER_URL, $http, Session, $rootScope) {
  return {
    login: function (credentials) {
      void 0;

        
      return $http
        .post($rootScope.base_url + '/api2/login', credentials)
        .then(function (res) {
            void 0;
            void 0;
            void 0;
            Session.create(res.data[0].id_utenti, res.data[0].nome_breve_utenti, res.data[0].token,  res.data[0].isadmin_utenti);
        });

        
 /*
      return $http
        .post('/api2/login', credentials)
        .success(function (res) {
            console.log('AuthService login then');
            console.log(res);
            console.log(res.data.id_utenti);
            Session.create(res.data.id_utenti, res.data.nome_breve_utenti, res.data.token,  res.data.isAdmin);
        })
        .error(function (err) {
            console.log('auth error');
            console.log(err);
        });
*/
    },
      
    logout: function (credentials) {
        void 0;
        void 0;
      return $http
        .post( $rootScope.base_url + '/api2/logout', credentials)
        .then(function (res) {
            void 0;
            void 0;
            void 0;
            Session.destroy();
        });
    },  
      
    isAuthenticated: function () {
        void 0;
      return !!Session.id_utenti;
    },
      
    isAuthorized: function (authorizedRoles) {
        void 0;
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (this.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    }
  };
}])

.service('Session', function () {
  this.create = function (id_utenti, nome_breve_utenti, token, isAdmin) {
    void 0;
    void 0;
    void 0;
    void 0;
    this.id_utenti = id_utenti;
    this.nome_breve_utenti = nome_breve_utenti;
    this.token = token;
    this.isAdmin = isAdmin;
  };
  this.destroy = function () {
      void 0;
    this.id_utenti = null;
    this.nome_breve_utenti = null;
    this.token = null;
    this.isAdmin = false;
  };
  return this;
});

/*
        
var phonecatServices = angular.module('phonecatServices', ['ngResource']);
 
phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('apiQ/utentiAll', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
*/
'use strict';

/* Controllers */

angular.module('myApp.controllers', []);
'use strict';

/* Controllers */

//angular.module('myApp.controllers', [])
angular.module('myApp.controllers')



.controller("AppCtrl", 
            [ '$scope',   'USER_ROLES',   'AUTH_EVENTS',   '$rootScope', 'AuthService', 'Session', 'Restangular',  '$state', '$ionicPopup','$ionicSideMenuDelegate',
            function($scope,   USER_ROLES,   AUTH_EVENTS,   $rootScope,   AuthService,   Session,   Restangular,    $state,   $ionicPopup, $ionicSideMenuDelegate) {

                
        void 0;
                
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
    
        $scope.go = function ( path ) {
            $state.go(path);
        };
                
        if(window.ionic){
            void 0;
        }
                
        $scope.toggleLeft = function() {
             $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
        };
          
        // CONFIGURAZIONI -----------------------------------------------------------------        
                
              
        // @if NODE_ENV='production'
                
            //PRODUZIONE : Impostazioni per produzione        
            $rootScope.base_url = "http://federadati.provincia.rimini.it:3000";
            
        // @endif
                
        // @if NODE_ENV='debug-settings'
                

            //SVILUPPO: Impostazioni per debug
            $rootScope.base_url = "http://10.0.1.157:3000";

            
            var  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IldXRi1JVEFMSUEiLCJpc0F1dGhvcml6ZWQiOnRydWV9.VWHKW_O31P4Eg2PwW3PvAufKSI3dfDPF8XY3_Ce05sQ';        
            Session.create(1, 'PROVINCIA', token,  true);
            $scope.currentUser = 'PROVINCIA';
            $scope.isAuthorized = true;
            Restangular.setDefaultRequestParams({ apiKey: Session.token });
            
                        
        // @endif
  
                
        void 0;
        void 0;
        Restangular.setBaseUrl($rootScope.base_url + '/apiQ');
                
        
        //AUTH_EVENTS.loginFailed
    
        $rootScope.$on(AUTH_EVENTS.loginSuccess , function (event, next) {
            void 0;
            void 0;
            void 0;
            $scope.currentUser = Session.nome_breve_utenti;
            Restangular.setDefaultRequestParams({ apiKey: Session.token });
            $state.go('menu.list');
        });
                
                
        $rootScope.$on(AUTH_EVENTS.logoutSuccess , function (event, next) {
            void 0;
            void 0;
            void 0;
            $scope.currentUser = '';
            Restangular.setDefaultRequestParams({ apiKey: '' });
            $state.go('menu.home');
        });        
                
   
        $rootScope.$on(AUTH_EVENTS.loginFailed, function (event, next) {
            void 0;
            void 0;
            void 0;
             
            
            var alertPopup = $ionicPopup.alert({
                title: 'Login errato',
                template: 'Immettere nome utente e password corrette'
            });
           alertPopup.then(function(res) {
                void 0;
                $state.go('menu.home');
           });
        }); 

    
    
         $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event, next) {
            void 0;
            void 0;
            void 0;
            $scope.currentUser = Session.nome_breve_utenti;
            
             var alertPopup = $ionicPopup.alert({
                title: 'Utente non autenticato',
                template: 'Immettere nome utente e password'
                });
            alertPopup.then(function(res) {
             void 0;
                $state.go('menu.home');
           });
           
           
            
        }); 
    
        $rootScope.$on('$stateChangeStart', function (event, next) {
            void 0;
                        
            if(next.accessLogged){
                void 0;
                if(!AuthService.isAuthenticated()){
                    event.preventDefault();    
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            } else {
                void 0;
            }
            
            /*
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                        // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
            */
        });
}])

// LoginController ------------------------------------------------------------------------------------
// LoginController ------------------------------------------------------------------------------------
// LoginController ------------------------------------------------------------------------------------
// LoginController ------------------------------------------------------------------------------------
// LoginController ------------------------------------------------------------------------------------
.controller('LoginController', 
            [ '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService','$state',
            function ($scope, $rootScope, AUTH_EVENTS, AuthService,$state) {
                
    void 0;
    void 0;
                
  
 $scope.credentials = {
    username: '',
    password: ''
  };
    
    
  
  
  $scope.leftButtons = [{
            type: 'button-icon button-clear ion-navicon',
            tap: function(e) {
                $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
            }
  }];                     
    
  // title ion-view
  $scope.navTitle = '<span class="item-calm">Gestione Volontari</span>';
  //$scope.navTitle = '<img style="height:100px; width:auto;" src="img/logo2.jpg" />';
             
 $scope.goto_help = function($id) {
        void 0;
        $state.go('menu.help');
    };     
                
    $scope.fullscreenOn = function(){
        void 0;
        void 0;
        screenfull.request();
    };

    $scope.fullscreenOff = function(){
        void 0;
        void 0;
        screenfull.exit();
    };            
                
                
                
  $scope.login = function (credentials) {
      void 0;
      void 0;
    AuthService.login(credentials).then(function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };

    $scope.logout = function (credentials) {
      void 0;
      void 0;
    AuthService.logout(credentials).then(function () {
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    });
  };

    
}])

// AboutController ------------------------------------------------------------------------------------
.controller('AboutController', 
            [ '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService','Session','$location','$ionicLoading','$http', '$ionicPopup',
            function ($scope, $rootScope, AUTH_EVENTS, AuthService, Session, $location, $ionicLoading, $http, $ionicPopup ) {
    void 0;
    void 0;
    $scope.navTitle = Session.nome_breve_utenti;
    $scope.base_url = $rootScope.base_url;
                
    $scope.$location = {};
    //$ionicLoading.show({   template: 'Loading...'   });         
    angular.forEach("protocol host port path search hash".split(" "), function(method){
        $scope.$location[method] = function(){
        var result = $location[method].call($location);
        return angular.isObject(result) ? angular.toJson(result) : result;
        };
    });
    //$ionicLoading.hide();
               
                
    $scope.fullscreenOn = function(){
        void 0;
        void 0;
        screenfull.request();
    };

    $scope.fullscreenOff = function(){
        void 0;
        void 0;
        screenfull.exit();
    };
                
    $scope.test_connection = function(){
        void 0;
        $ionicLoading.show({   template: 'Loading...'   }); 
      
        $http({method: 'GET', url: $rootScope.base_url + '/mv/testconnection'}).
        success(function(data, status, headers, config) {
                void 0;
                void 0;
                void 0;
                void 0;
                void 0;
            
                var alertPopup = $ionicPopup.alert({
                title: 'OK!',
                template: 'Test di connessione ok'
                });
                    alertPopup.then(function(res) {
                    void 0;
                });
        }).
        error(function(data, status, headers, config) {
                void 0;
                void 0;
                void 0;
                void 0;
                void 0;
                var alertPopup = $ionicPopup.alert({
                title: 'Errori!',
                template: 'Test di connessione FALLITO'
                });
                    alertPopup.then(function(res) {
                    void 0;
                });
        });
        
        
        
        
        $ionicLoading.hide();
        
    };
                
                
    
}])

// HelpController ------------------------------------------------------------------------------------
.controller('HelpController', 
            [ '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService','Session','$location','$ionicLoading','$http', '$ionicPopup','$ionicSlideBoxDelegate','$state',
            function ($scope, $rootScope, AUTH_EVENTS, AuthService, Session, $location, $ionicLoading, $http, $ionicPopup,$ionicSlideBoxDelegate,$state ) {
    void 0;
    
                
        // action new relazione
    $scope.goto_login = function($id) {
        void 0;
        $state.go('menu.login');
    };            
    
        
    
                
                
    
}]);



'use strict';

/* Controllers */

//angular.module('myApp.controllers', [])
angular.module('myApp.controllers')



//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
.controller('EditItemCtrl', ['$scope', '$filter', '$state', '$stateParams', 'Restangular',  'rService', 'Session', '$ionicPopup',   
                    function( $scope,   $filter,   $state,   $stateParams,   Restangular, rService, Session, $ionicPopup) {

    // azione deriva dalla configurazione del controller new/edit
    void 0;
    void 0;
    void 0;
            
    var configAction = $state.current.configAction;
    $scope.configAction = configAction;
    $scope.item = {};
    $scope.openedPopupDate = false;   
                            
    void 0;      
                        
    $scope.toggleRight = function() {
        $state.go('menu.list');
    };                                 
 
    $scope.rightButtons =  [{
        type: 'button-icon button-clear ion-email',
        tap: function(e) {
                void 0;
        }
    }];    
                                     
                        
    if (( configAction == 'edit') || ( configAction == 'view') || ( configAction == 'new'))  {
        void 0;

        
        if ( configAction == 'new') {
            void 0;
            $stateParams.id = 0;
        }
        
        var baseAccounts = Restangular.all('serviziAll');
        // This will query /accounts and return a promise.
        baseAccounts.getList({limit: 50, id_servizi_selezione : $stateParams.id}).then(function(accounts) {
            //$scope.projects = accounts;
            //console.log(accounts);
            $scope.item = accounts[0];

            void 0;
            // patch date object
            void 0;
            void 0;
            void 0;
            void 0;
            void 0;
            $scope.item.data_servizi = $filter('date')(accounts[0].data_servizi, "yyyy-MM-dd"); 
            //$scope.item.a_ora_servizi = $filter('date')(($filter('asDate')(accounts[0].a_ora_servizi)), "HH:mm"); 
            $scope.item.a_ora_servizi = accounts[0].a_ora_servizi.substr(11,5);
            //$scope.item.da_ora_servizi = $filter('date')(accounts[0].da_ora_servizi, "HH:mm"); 
            $scope.item.da_ora_servizi = accounts[0].da_ora_servizi.substr(11,5);
            void 0;
            void 0;
            void 0;
            
            void 0;
            void 0;
            void 0;

            $scope.item.id_utenti = accounts[0].id_utenti;
            $scope.item.lista_volontari_servizi = accounts[0].elenco_id_volontari.split(',');
            $scope.timeCalculated = rService.time_diff($scope.item.da_ora_servizi, $scope.item.a_ora_servizi);
            $scope.elenco_id_rapporti_servizio = accounts[0].elenco_id_rapporti_servizio;
            $scope.id_rapporto_valido_servizio = accounts[0].id_rapporto_valido_servizio;
            $scope.item.annullato_servizi = accounts[0].annullato_servizi;

            if ( configAction == 'new') {
                void 0;
                $scope.item = [];
                $scope.item.id_utenti = null;
                $scope.item.lista_volontari_servizi = [];
                $scope.item.data_servizi = $filter('date')(new Date(), "yyyy-MM-dd"); 
                $scope.item.a_ora_servizi = $filter('date')(new Date(), "HH:mm"); 
                $scope.item.da_ora_servizi = $filter('date')(new Date(), "HH:mm"); 
                $scope.item.annullato_servizi = 0;
            }
            
            
            
            // fill volontari --------------------------------
            
            //##check null data
            if ( (!(typeof $scope.item.id_utenti === "undefined")) && ($scope.item.id_utenti != null)) {
                        
            void 0;
            var volontariList = Restangular.all('volontariAll');
            volontariList.getList({id_volontari_utenti : $scope.item.id_utenti }).then(function(users) {
                    
            void 0;
        
            var fancyArray = [];
            var arrayLength = users.length;
            void 0;
            // build array per la lista di controllo fatta secondo il suo template    
            for (var i = 0; i < arrayLength; i++) {
                //users[i].id = users[i].id_;
                var more = {
                            id : users[i].id,
                            checked :  (accounts[0].elenco_id_volontari.indexOf(users[i].id) > -1)  ?  true : false ,
                            text : users[i].nome_completo_volontari
                        };
                void 0;
                fancyArray.push(more);
                //Do something
            }
        
            void 0;
            $scope.volontariList = fancyArray;
            void 0;
        
            //$scope.volontariList = users;
            });
   
            }//##check null data
                
            //fill utenti ------------------------------------------------------------------------------------
            if(Session.isAdmin) {
                void 0;
                var utentiList = Restangular.all('utentiAll');
                    utentiList.getList().then(function(accounts) {
                    //console.log(accounts);
                    $scope.utentiList = accounts;
                        
                    var fancyArray = [];
                    var arrayLength = accounts.length;
                    void 0;
                    for (var i = 0; i < arrayLength; i++) {
                        //accounts[i].id = accounts[i].id_;
                        var more = {
                                    id : accounts[i].id_utenti,
                                    checked : (accounts[i].id_utenti === $scope.item.id_utenti)  ?  true : false ,
                                    text : accounts[i].nome_breve_utenti
                                };
                        void 0;
                        fancyArray.push(more);
                        //Do something
                    }   
                    $scope.utentiList = fancyArray;    
                        
                });
            } else {
                void 0;
                void 0;
                $scope.utentiList = [];
                var fancyArray = [];
                var more = {
                                    id : Session.id_utenti,
                                    checked : true,
                                    text : Session.nome_breve_utenti
                                };
                fancyArray.push(more);
                $scope.utentiList = fancyArray;
                //$scope.utentiList.push({id_utenti: Session.id_utenti,nome_breve_utenti: Session.nome_breve_utenti});
                $scope.item.id_utenti = Session.id_utenti;
                $scope.item.nome_breve_utenti = Session.nome_breve_utenti;
            }
        });
    }
                        
    
    $scope.master = {};
    $scope.timeCalculated = 0;
    
 
    // time change event
    $scope.timechanged = function () {
        void 0;
        void 0;
        $scope.timeCalculated = rService.time_diff($scope.item.da_ora_servizi, $scope.item.a_ora_servizi);
        if ( $scope.timeCalculated < 1 ) {
            $scope.timeCalculated = $scope.timeCalculated + 24;
        }
    };
    
    //#### DELETE ACTION
    $scope.cancel_action = function(item){
        
        void 0;
        var confirmPopup = $ionicPopup.confirm({
                title: 'Messaggio',
                template: 'Annullare il presente elemento?'
        });
            
        confirmPopup.then(function(res) {
             if(res) {
                   void 0;
                   void 0;
                   Restangular.oneUrl('servizi', '/api1/servizi/' + item.id ).get().then(
                     function(account){
                                void 0;
                                void 0;
                                account.annullato_servizi = 1;
                                void 0;
                                //Restangular.setBaseUrl('/api1/servizi/' + item.id_servizi);
                                Restangular.setBaseUrl('/api1');
                                account.customPUT({annullato_servizi : 1},item.id, {}, {});
                                //account.put();
                                Restangular.setBaseUrl('/apiQ');
                                $state.go('menu.list');
                   });     
                     
                     
                 } else {
                   void 0;
                 }
        });
    }

    
    
    
    //#### SAVE ACTION
    $scope.save_action = function(item){
        
        // validate form
        void 0;
        
        var msg = '';
    
        if (typeof $scope.item.elenco_id_volontari === "undefined"){
            msg = 'Selezionare un volontario!';
        }
        
        if ($scope.item.elenco_id_volontari == ''){
            msg = 'Selezionare un volontario!';
        }
        
        void 0;
        void 0;
        
        if ( (!Session.isAdmin) && ($scope.item.data_servizi < new Date())  ){
            msg = 'Non è possibile selezionare date del servizio precedenti a quelle odierna.';
        }
    
        if (msg != ''){
            void 0;
            var alertPopup = $ionicPopup.alert({
                title: 'Errori di input',
                template: msg
            });
                alertPopup.then(function(res) {
                void 0;
            });
            
        } else {
            
            void 0;
        
            var new_servizio = {
                //id_volontari_servizi :  $scope.item.id_volontari_servizi,
                id_utenti : $scope.item.id_utenti,
                data_servizi : $scope.item.data_servizi,
                da_ora_servizi : '1900-01-01T' + $scope.item.da_ora_servizi + ':00.000Z',
                a_ora_servizi : '1900-01-01T' + $scope.item.a_ora_servizi + ':00.000Z',
                note_servizi : $scope.item.note_servizi,
                //lista_volontari : $scope.item.lista_volontari_servizi,
                // split to array
                lista_volontari : $scope.item.elenco_id_volontari.split(','),
                rapporto_servizi :  $scope.item.rapporto_servizi
            };
            
            void 0;
            void 0;
            
            var baseServizi = Restangular.allUrl('servizi', '/api1/servizi');
            baseServizi.post(new_servizio).then(
            function(msg){
                void 0;
                void 0;
                
                
                void 0;
                
            
                var alertPopup = $ionicPopup.alert({
                    title: 'Messaggio',
                    template: 'Dato inserito con successo!'
                });
                    alertPopup.then(function(res) {
                    void 0;
                    $state.go('menu.edit', { id: msg.id });
                });

            }, 
            function(msg) {
                void 0;
                void 0;
            }
            );
        }
       
    }
    
    // action new relazione
    $scope.new_relazione_action = function($id) {
        void 0;
        $state.go('menu.newRelazioni', { id: $id });
    };

    // action goto relazione
    $scope.goto_relazione_action = function($id) {
        void 0;
        $state.go('menu.editRelazioni', { id: $id });
    };
                        
    
    // click on date field
    $scope.popupDate = function($event) {
        void 0;
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedPopupDate) {
            $scope.openedPopupDate = false;
        } else {
            $scope.openedPopupDate = true;
        }
    }; 
    
    $scope.debug_action = function(item){
        void 0;
        void 0;
    }
                        
                        
    void 0;
    // on change id_utenti 
    $scope.$watch('item.id_utenti', function(newValue, oldValue) {
        void 0;
        
        
        if ( (configAction == 'new') &&  (!(typeof newValue === "undefined")) && (newValue != null)) {
            
            
            var volontariList = Restangular.all('volontariAll');
            volontariList.getList({id_volontari_utenti : newValue }).then(function(users) {
                    
            void 0;
        
            var fancyArray = [];
            var arrayLength = users.length;
            void 0;
            // build array per la lista di controllo fatta secondo il suo template    
            for (var i = 0; i < arrayLength; i++) {
                //users[i].id = users[i].id_;
                var more = {
                            id : users[i].id,
                            //checked :  (accounts[0].elenco_id_volontari.indexOf(users[i].id) > -1)  ?  true : false ,
                            checked :   false ,
                            text : users[i].nome_completo_volontari
                        };
                void 0;
                fancyArray.push(more);
                //Do something
            }
        
            void 0;
            $scope.item.elenco_volontari = '';
            $scope.item.elenco_id_volontari = '';
            $scope.volontariList = fancyArray;
            void 0;
        
            //$scope.volontariList = users;
            });

            
            /*
            var volontariList = Restangular.all('volontariAll');
            volontariList.getList({id_volontari_utenti : newValue }).then(function(accounts) {
                console.log('EditItemCtrl: RESET volontariList e list_volontari_servizi');
                $scope.volontariList = accounts;
                $scope.item.lista_volontari_servizi = [];
            });
            */
        }
        
    });
                        
    $scope.$watch('item.volontariList1', function(newValue, oldValue){
        void 0;
    });                    
                        
                        
}])



// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
.controller('InfiniteCtrl', ['$scope', '$location', 'Restangular', '$filter', 'Session', '$ionicModal','$ionicSideMenuDelegate','$ionicPopover', '$ionicLoading', 
                             function($scope,  $location, Restangular, $filter, Session, $ionicModal,   $ionicSideMenuDelegate,  $ionicPopover, $ionicLoading) {
    
  void 0;                                 
  void 0;
  
  $scope.totalPages = 0;
  $scope.itemsCount = 0;
  $scope.currentPage = 1; 
  $scope.currentItemDetail = null;
  $scope.totalItems = 0;
  $scope.pageSize = 1000; // impostato al massimo numero di elementi
  $scope.startPage = 0;         
  $scope.openedPopupDate = false;    
  $scope.utentiList = [];
  $scope.id_utenti_selezione = 0;        
  $scope.items = [];
  $scope.loadMoreDataCanBeLoaded = true;
  
  // gestione modal popup slide per i filtri --------------------------------------------------
  $ionicModal.fromTemplateUrl('partials/sortModal.html', 
        function(sortModal) {
            $scope.sortModal = sortModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
           
  $ionicModal.fromTemplateUrl('partials/detailModal.html', 
        function(detailModal) {
            $scope.detailModal = detailModal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });
                                 
                                 
                                 
  $scope.openSortModal = function() {
        void 0;    
        $scope.sortModal.show();
  };
                                 
  $scope.openDetailModal = function(item) {
        void 0;    
        void 0;
        item.data_servizi = $filter('date')(item.data_servizi, "dd/MM/yyyy"); 
        item.a_ora_servizi = item.a_ora_servizi.substr(11,5);
        item.da_ora_servizi = item.da_ora_servizi.substr(11,5);
        $scope.currentItemDetail = item;
        $scope.detailModal.show();
  };
                                 
                                 
  $scope.closeSortModal = function() {$scope.sortModal.hide();};
  $scope.closeDetailModal = function() {$scope.detailModal.hide();};
                                 
  $scope.saveSort = function() {
    void 0;
    $scope.filterCriteria.id_utenti_selezione = this.id_utenti_selezione;
    void 0;
    $scope.filterTerm = this.filterTerm;
    $scope.sortBy = this.sortBy;
    $scope.sortModal.hide();
    $scope.fetchResult();
  }
  
  $scope.OpenFilter = function() {
       void 0;
        $scope.sortModal.show();
  };                                 
                               
                                 
  //default criteria that will be sent to the server
  $scope.filterCriteria = {
    pageNumber: 1,
    count: 0,
    limit: $scope.pageSize,
    start: 0,
    sortDir: 'asc',
    sortedBy: 'id',
    id_utenti_selezione : Session.isAdmin ? 0 : Session.id_utenti,
    mese_selezione : 0,
    anno_selezione: 0
  };
    
    void 0;
    void 0;
    
    // popola la lista utenti
    var volontariList = Restangular.all('utentiAll');
                                 
    void 0;                              
                                 
    volontariList.getList().then(function(accounts) {
        void 0;
        if(Session.isAdmin) {
            void 0;
            $scope.utentiList = accounts;
            $scope.utentiList.push({"id_utenti": 0,"nome_breve_utenti": "TUTTI"});
            $scope.id_utenti_selezione = 0;
        } else {
            void 0;
            void 0;
            $scope.id_utenti_selezione = Session.id_utenti;
            $scope.filterCriteria.id_utenti_selezione = Session.id_utenti;
            $scope.utentiList = [];
            $scope.utentiList.push({id_utenti: Session.id_utenti,nome_breve_utenti: Session.nome_breve_utenti});
        }
    });    
 

 
  //The function that is responsible of fetching the result from the server and setting the grid to the new result
  $scope.fetchResult = function () {
      void 0;
      void 0;

      var offset_page =  ( $scope.currentPage - 1 ) * $scope.pageSize;
      $scope.filterCriteria.start = offset_page;
      void 0;
      
    
      var serviziList = Restangular.all('serviziAll');
      
      void 0;
      
      // Get items count 
      /*
      $scope.filterCriteria.count = 1; // imposta il conteggio sul server
      serviziList.getList($scope.filterCriteria).then(function(data) {
            console.log('COUNT: data[0].totalItems:' + data[0].totalItems);
            console.log(data);
          
            if (data.length > 0) {
                $scope.totalItems = data[0].totalItems;
            } else {
                $scope.totalItems = 0;
            }
        // Error get count
        }, function () {
            $scope.totalItems = 0;
            //$scope.totalPages = 0;
      }); // items count
      */      
          // Get items ...  
      void 0;
      $scope.filterCriteria.count = 0; // imposta la selezione standard sul server
      $ionicLoading.show({template: 'Dati in arrivo!' });
      return serviziList.getList($scope.filterCriteria).then(function(data) {
                //console.log(data);
                $scope.items = data;
                /*
                data.forEach(function (idata) {
                    console.log(idata);
                    $scope.items.push(idata);
                });
                */
            
                void 0;
                $ionicLoading.hide();  
              
          // in caso di errore azzera la lista...      
          }, function () {
                $scope.items = [];
      });
          
      /*
      $scope.items = serviziList.getList($scope.filterCriteria).$object;
      console.log('@@@@@@@@@@@@@@@@@@ dati ritornati @@@@@@@@@@@@@@@@@@@');
      console.log($scope.items);
      */
          
 };
      
 
  //called when navigate to another page in the pagination
  $scope.selectPage = function () {
    var page = $scope.currentPage;
    void 0;  
    void 0;  
    void 0;
    $scope.currentPage = page;
    $scope.filterCriteria.pageNumber = page;
    $scope.fetchResult();
      
  };
                  
 
 
  //manually select a page to trigger an ajax request to populate the grid on page load
  void 0;
  $scope.selectPage();
    

  /*
                                 
  // watch change selection    
  $scope.$watch("id_utenti_selezione", function(newValue, oldValue) {
        console.log('id_utenti changed! New ' + newValue + ' Old ' +  oldValue);
        
        if(Session.isAdmin) {
            $scope.filterCriteria.id_utenti_selezione = newValue;
            $scope.currentPage = 1;
            $scope.filterCriteria.pageNumber = $scope.currentPage;
            $scope.fetchResult();
        } else {
            console.log('id_utenti changed! New NO ADMIN NO ACTION');
        }
        
    });    
    
    //watch on change data_servizi NON SERVE
    
                                 
    $scope.$watch("data_servizi_selezione", function(newValue, oldValue) {
        console.log('data_servizi changed!' + newValue + ' ' +  oldValue);
        
        if(newValue){
            console.log($filter('date')(newValue,'MM'));
            console.log($filter('date')(newValue,'yyyy'));
            $scope.filterCriteria.mese_selezione = $filter('date')(newValue,'MM');
            $scope.filterCriteria.anno_selezione = $filter('date')(newValue,'yyyy');
        } else {
            $scope.filterCriteria.mese_selezione = 0;
            $scope.filterCriteria.anno_selezione = 0;
        }
        $scope.currentPage = 1;
        $scope.filterCriteria.pageNumber = $scope.currentPage;
        $scope.fetchResult();
        
    });    
    
    
    $scope.popupDate = function($event) {
        console.log('popupDate');
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedPopupDate) {
            $scope.openedPopupDate = false;
        } else {
            $scope.openedPopupDate = true;
        }
    };
    
    */
                                 
    // callback for ng-click 'editUser':
    $scope.editItem = function (itemId) {
        void 0;
        void 0;
        $location.path('/menu/edit/' + itemId);
    };
    
    // callback for ng-click 'editUser':
    $scope.editItem = function (itemId) {
        void 0;
        void 0;
        $location.path('/menu/view/' + itemId);
    };    
                                 
                                 
    // callback for ng-click 'editUser':
    $scope.editRelazioni = function (itemId) {
        void 0;
        $location.path('/menu/editRelazioni/' + itemId);
    };
    
    
     // callback for ng-click 'editUser':
    $scope.newRelazioni = function () {
        void 0;
        $location.path('/menu/new');
    };
    
    $scope.debug_action = function(item){
        void 0;
        void 0;
    };
                                 
    $scope.newRelazioniFromPopover = function () {
        void 0;
        $scope.popover.remove();
        $location.path('/menu/new');
    };
                        
    $scope.OpenFilterFromPopover = function() {
        void 0;
        $scope.popover.hide();
        $scope.sortModal.show();
    };                                   
                                 
                                 
                                 
    var templatePopover = '<ion-popover-view>';
    //templatePopover +=    '<ion-header-bar><h1 class="title">Azioni possibili</h1></ion-header-bar>';                                          
    templatePopover +=    '<ion-content>';                                      
    templatePopover +=    '<div class="list">';
    templatePopover +=    '<a class="item item-icon-left" ng-click="newRelazioniFromPopover()" ><i class="icon ion-plus-circled"></i> Nuovo elemento</a>';
    templatePopover +=    '<a class="item item-icon-left" ng-click="OpenFilterFromPopover()"><i class="icon ion-funnel"></i>Filtro</a>';
    //templatePopover +=    '<a class="item item-icon-left" ng-click="ShowItemDetailFromPopover()"><i class="icon ion-funnel"></i>Item</a>';
    //templatePopover +=    '<button class="button button-clear button-positive" ng-click="debug_action()">Chiudi</button>';
    templatePopover +=    '</div>';
    templatePopover +=    '</ion-content>';                                      
    templatePopover +=    '</ion-popover-view>';

    //<ion-nav-buttons side="right" >
    //<button class="button button-icon button-clear ion-plus-circled" ng-click="newRelazioni()"></button>
    //</ion-nav-buttons>
                                 
    void 0;                                          
                             
    $scope.popover = $ionicPopover.fromTemplate(templatePopover,{ scope: $scope });                                     
                                          
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });

                                 
                                 
}]);


'use strict';

/* Controllers */

angular.module('myApp.controllers')


//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
//EditItemCtrl--------------------------------------------------------------------------------------
.controller('EditItemCtrlRelazioni', 
                           ['$scope','$filter', '$state', '$stateParams', 'Restangular','rService', 'Session', '$ionicPopup',  
                    function($scope,  $filter,   $state,   $stateParams,   Restangular,  rService ,  Session, $ionicPopup) {

    // azione deriva dalla configurazione del controller new/edit
    void 0;
    void 0;
    void 0;
            
    var configAction = $state.current.configAction;
    $scope.configAction = configAction;
    $scope.item = {};
    $scope.openedPopupDate = false;   
    
    //if (( configAction == 'edit') || ( configAction == 'view') || ( configAction == 'new') )  {
        
    void 0;

    if (( configAction == 'edit') || ( configAction == 'view')  )  {
        var baseAccounts = Restangular.all('rapportiAll');
        var queryOptions =  {
                                limit : 50,
                                id_rapporti_selezione :  $stateParams.id
                            };
    } else { // new action
        var baseAccounts = Restangular.all('serviziAll');
        var queryOptions =  {
                                limit: 50, 
                                id_servizi_selezione : $stateParams.id
                            };
    }
        //var baseAccounts = Restangular.all('rapportiAll');
        //baseAccounts.getList({limit: 50, id_rapporti_selezione : $stateParams.id}).then(function(accounts) {
                
    baseAccounts.getList(queryOptions).then(function(accounts) {
        void 0;
        if (( configAction == 'edit') || ( configAction == 'view')  )  {

            void 0;
            $scope.item.id = $stateParams.id;
            $scope.item.id_servizi = accounts[0].id_servizi;
            $scope.item.id_utenti = accounts[0].id_utenti;
            $scope.item.nome_breve_utenti = accounts[0].nome_breve_utenti;
            $scope.item.elenco_id_volontari = accounts[0].elenco_id_volontari;
            $scope.item.elenco_volontari = accounts[0].elenco_volontari;
            $scope.item.lista_volontari_relazioni = accounts[0].elenco_id_volontari.split(',');
            $scope.item.data_relazioni = $filter('date')(accounts[0].data_relazioni, "yyyy-MM-dd");
            $scope.item.a_ora_relazioni = $filter('date')(accounts[0].a_ora_relazioni, "HH:mm");
            $scope.item.da_ora_relazioni = $filter('date')(accounts[0].da_ora_relazioni, "HH:mm");
            $scope.timeCalculated = rService.time_diff($scope.item.da_ora_relazioni, $scope.item.a_ora_relazioni);
            $scope.item.auto_relazioni = accounts[0].auto_relazioni;
            $scope.item.note_relazioni = accounts[0].note_relazioni;
            $scope.item.rapporto_relazioni = accounts[0].rapporto_relazioni;
            $scope.item.annullato_relazioni = accounts[0].annullato_relazioni;
        } else {
            void 0;
            $scope.item.id_servizi = $stateParams.id;
            $scope.item.id_utenti = accounts[0].id_utenti;
            $scope.item.nome_breve_utenti = accounts[0].nome_breve_utenti;
            $scope.item.elenco_id_volontari = accounts[0].elenco_id_volontari;
            $scope.item.elenco_volontari = accounts[0].elenco_volontari;
            $scope.item.lista_volontari_relazioni = accounts[0].elenco_id_volontari.split(',');
            $scope.item.elenco_id_volontari = accounts[0].elenco_id_volontari;
            $scope.item.data_relazioni = $filter('date')(accounts[0].data_servizi, "yyyy-MM-dd");
            $scope.item.a_ora_relazioni = $filter('date')(accounts[0].a_ora_servizi, "HH:mm");
            $scope.item.da_ora_relazioni = $filter('date')(accounts[0].da_ora_servizi, "HH:mm");
            $scope.timeCalculated = rService.time_diff($scope.item.da_ora_relazioni, $scope.item.a_ora_relazioni);
            $scope.item.auto_relazioni = ' -- NEW AUTO --';
            $scope.item.note_relazioni = ' -- NEW NOTE --';
            $scope.item.rapporto_relazioni = ' -- NEW RAPPORTO --';
            $scope.item.annullato_relazioni = 0;
        }
         
            
        // fill volontari --------------------------------
        if ( (!(typeof $scope.item.id_utenti === "undefined")) && ($scope.item.id_utenti != null)) {
                        
            void 0;
            var volontariList = Restangular.all('volontariAll');
            volontariList.getList({id_volontari_utenti : $scope.item.id_utenti }).then(function(users) {

                var fancyArray = [];
                var arrayLength = users.length;
                void 0;
                // build array per la lista di controllo fatta secondo il suo template    
                for (var i = 0; i < arrayLength; i++) {
                    var more = {
                                id : users[i].id,
                                checked :  (accounts[0].elenco_id_volontari.indexOf(users[i].id) > -1)  ?  true : false ,
                                text : users[i].nome_completo_volontari
                            };
                    //console.log(more);
                    fancyArray.push(more);
                }

                //console.log(users);
                $scope.volontariList = fancyArray;
                void 0;
        
            });
   
        }//##check null data
            
 
        //fill utenti ------------------------------------------------------------------------------------
        if(Session.isAdmin) {
                void 0;
                var utentiList = Restangular.all('utentiAll');
                    utentiList.getList().then(function(accounts) {
                    //console.log(accounts);
                    $scope.utentiList = accounts;
                        
                    var fancyArray = [];
                    var arrayLength = accounts.length;
                    void 0;
                    for (var i = 0; i < arrayLength; i++) {
                        //accounts[i].id = accounts[i].id_;
                        var more = {
                                    id : accounts[i].id_utenti,
                                    checked : (accounts[i].id_utenti === $scope.item.id_utenti)  ?  true : false ,
                                    text : accounts[i].nome_breve_utenti
                                };
                        void 0;
                        fancyArray.push(more);
                        //Do something
                    }   
                    $scope.utentiList = fancyArray;    
                        
                });
            } else {
                void 0;
                void 0;
                $scope.utentiList = [];
                var fancyArray = [];
                var more = {
                                    id : Session.id_utenti,
                                    checked : true,
                                    text : Session.nome_breve_utenti
                                };
                fancyArray.push(more);
                $scope.utentiList = fancyArray;
                //$scope.utentiList.push({id_utenti: Session.id_utenti,nome_breve_utenti: Session.nome_breve_utenti});
                $scope.item.id_utenti = Session.id_utenti;
                $scope.item.nome_breve_utenti = Session.nome_breve_utenti;
            } // end fill utenti
            
    });
    

    $scope.toggleRight = function() {
        $state.go('menu.listRelazioni');
        /*
        var alertPopup = $ionicPopup.alert({
                title: '*TODO*',
                template: 'TODO'
        });
                alertPopup.then(function(res) {
                console.log('EditItemCtrlRelazioni: toggleRight');
        });
        */
    };                           
                        
                        
    /*    
    if ( configAction == 'new') {
        
        // fare get dal servizio ed inizializzare i dati
        console.log('EditItemCtrlRelazioni : new from id_servizi' + $stateParams.id);
        
        
        var baseAccounts = Restangular.all('serviziAll');
        // This will query /accounts and return a promise.
        baseAccounts.getList({limit: 50, id_servizi_selezione : $stateParams.id}).then(function(accounts) {
            //$scope.projects = accounts;
            //console.log(accounts);
            console.log('EditItemCtrlRelazioni : load data ....');
            
            //$scope.item = accounts[0];
            //   patch date object
            //console.log('EditItemCtrl : patch time object');
            //console.log(accounts[0].da_ora_rapporti);
            //console.log(accounts[0].a_ora_rapporti);
            
       
            console.log(accounts[0].elenco_id_volontari.split(','));

            $scope.item.id_servizi = $stateParams.id;
            $scope.item.id_utenti = accounts[0].id_utenti;
            $scope.item.lista_volontari_relazioni = accounts[0].elenco_id_volontari.split(',');
            $scope.item.a_ora_relazioni = new Date(accounts[0].a_ora_servizi);
            $scope.item.da_ora_relazioni = new Date(accounts[0].da_ora_servizi);
            $scope.timeCalculated = rService.time_diff($scope.item.da_ora_relazioni, $scope.item.a_ora_relazioni);
            $scope.item.data_relazioni = accounts[0].data_servizi;
            $scope.item.auto_relazioni = ' -- NEW AUTO --';
            $scope.item.note_relazioni = ' -- NEW NOTE --';
            $scope.item.rapporto_relazioni = ' -- NEW RAPPORTO --';
            
        });
    }
    */
    
    
    $scope.master = {};
    $scope.timeCalculated = 0;
    
 
    // time change event
    $scope.timechanged = function () {
        void 0;
        void 0;
        $scope.timeCalculated = rService.time_diff($scope.item.da_ora_relazioni, $scope.item.a_ora_relazioni);
        if ( $scope.timeCalculated < 1 ) {
            $scope.timeCalculated = $scope.timeCalculated + 24;
        }
    };
    
    // ### CANCEL ACTION -------------------------------------------------------------------
    $scope.cancel_action = function(item){
        
        void 0;
        var confirmPopup = $ionicPopup.confirm({
                title: 'Messaggio',
                template: 'Annullare il presente elemento?'
        });
        
        confirmPopup.then(function(res) {
             if(res) 
             {
                    void 0;
                    void 0;
                    Restangular.oneUrl('relazioni', '/api1/relazioni/' + item.id ).get().then(
                            function(account){
                                void 0;
                                void 0;
                                account.annullato_relazioni = 1;
                                void 0;
                                //Restangular.setBaseUrl('/api1/servizi/' + item.id_servizi);
                                Restangular.setBaseUrl('/api1');
                                account.customPUT({annullato_relazioni : 1},item.id, {}, {});
                                //account.put();
                                Restangular.setBaseUrl('/apiQ');
                                $state.go('menu.listRelazioni');
                              });
                    void 0;         
                 
             } else {
                   void 0;
             }
        });
    } // END CANCEL DELETE ACTION ---------------------------------------------------
    
    
    // #### SAVE ACTION -------------------------------------------------------------
    $scope.save_action = function(item){
        
        // validate form
        void 0;
        
        var msg = '';
    
        if (typeof $scope.item.elenco_id_volontari === "undefined"){
            msg = 'Selezionare un volontario!';
        }
        
        if ($scope.item.elenco_id_volontari == ''){
            msg = 'Selezionare un volontario!';
        }

        if ($scope.item.lista_volontari_relazioni.length == 0){
            msg = 'Selezionare un volontario!';
        }
        
               
        /*
        if ( (!Session.isAdmin) && ($scope.item.data_relazioni < new Date())  ){
            msg = 'Non è possibile selezionare date del servizio precedenti a quelle odierna.';
        }
        */
    
        if (msg != ''){
            void 0;
            var alertPopup = $ionicPopup.alert({
                title: 'Errori di input',
                template: msg
            });
                alertPopup.then(function(res) {
                void 0;
            });
        } else {
            
            void 0;
        
            var new_relazione = {
                //id_volontari_servizi :  $scope.item.id_volontari_servizi,
                id_utenti : $scope.item.id_utenti,
                id_servizi : $scope.item.id_servizi,
                data_relazioni : $scope.item.data_relazioni,
                da_ora_relazioni : '1900-01-01T' +  $scope.item.da_ora_relazioni + ':00.000Z',
                a_ora_relazioni : '1900-01-01T' +  $scope.item.a_ora_relazioni + ':00.000Z',
                note_relazioni : $scope.item.note_relazioni,
                auto_relazioni : $scope.item.auto_relazioni,
                rapporto_relazioni : $scope.item.rapporto_relazioni,
                lista_volontari : $scope.item.lista_volontari_relazioni
            };
            
            void 0;
            void 0;
            void 0;
            
            var baseServizi = Restangular.allUrl('relazioni', '/api1/relazioni');
            baseServizi.post(new_relazione).then(
                function(msg){
                    void 0;
                    void 0;
       

                   var alertPopup = $ionicPopup.alert({
                        title: 'Messaggio',
                        template: 'Dato inserito con successo!'
                    });
                    alertPopup.then(function(res) {
                        void 0;
                        $state.go('menu.viewRelazioni', { id: msg.id });
                    });
                }, 
                function(msg) {
                    void 0;
                    void 0;
                }
            );
        }
       
    }
    
    // click on date field
    $scope.popupDate = function($event) {
        void 0;
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedPopupDate) {
            $scope.openedPopupDate = false;
        } else {
            $scope.openedPopupDate = true;
        }
    }; 
    
    $scope.debug_action = function(item){
        void 0;
        void 0;
    }                        
    
    void 0;
    // on change id_utenti 
    $scope.$watch('item.id_utenti', function(newValue, oldValue) {
        void 0;
        /*
        if ( configAction == 'new') {
        
            var volontariList = Restangular.all('volontariAll');
            volontariList.getList({id_volontari_utenti : newValue }).then(function(accounts) {
                console.log('EditItemCtrlRelazioni: RESET volontariList e list_volontari_servizi');
                $scope.volontariList = accounts;
                $scope.item.lista_volontari_servizi = [];
            });
        }
        */
        
    });
}])



// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------
// InfiniteCtrl ---------------------------------------------------------------------------------

// Lista elementi delle relazioni

.controller('InfiniteCtrlRelazioni', ['$scope', '$location', 'Restangular', '$filter', 'Session' , '$ionicPopup', '$ionicPopover',
                                      function($scope,  $location, Restangular, $filter, Session, $ionicPopup, $ionicPopover) {
    
  void 0;
  void 0;
  
  $scope.totalPages = 0;
  $scope.itemsCount = 0;
  $scope.currentPage = 1;    
  $scope.totalItems = 0;
  $scope.pageSize = 8;
  $scope.startPage = 0;         
  $scope.openedPopupDate = false;    
  $scope.utentiList = [];
    


    
  //default criteria that will be sent to the server
  $scope.filterCriteria = {
    pageNumber: 1,
    count: 0,
    limit: $scope.pageSize,
    start: 0,
    sortDir: 'asc',
    sortedBy: 'id',
    id_utenti_selezione : Session.isAdmin ? 0 : Session.id_utenti,
    mese_selezione : 0,
    anno_selezione: 0
  };
    
    void 0;
    void 0;
    
    // popola la lista utenti
    var volontariList = Restangular.all('utentiAll');
    volontariList.getList().then(function(accounts) {
        void 0;
        if(Session.isAdmin) {
            void 0;
            $scope.utentiList = accounts;
            $scope.utentiList.push({"id_utenti": 0,"nome_breve_utenti": "TUTTI"});
            $scope.id_utenti_selezione = 0;
        } else {
            void 0;
            void 0;
            $scope.id_utenti_selezione = Session.id_utenti;
            $scope.filterCriteria.id_utenti_selezione = Session.id_utenti;
            $scope.utentiList = [];
            $scope.utentiList.push({id_utenti: Session.id_utenti,nome_breve_utenti: Session.nome_breve_utenti});
        }
    });    
 

 
  //The function that is responsible of fetching the result from the server and setting the grid to the new result
  $scope.fetchResult = function () {
      void 0;
      void 0;
    
      var serviziList = Restangular.all('rapportiAll');
      
      void 0;
      $scope.filterCriteria.count = 1;
      serviziList.getList($scope.filterCriteria).then(function(data) {
            void 0;
            void 0;
          
            if (data.length > 0) {
                $scope.totalItems = data[0].totalItems;
            } else {
                $scope.totalItems = 0;
            }
            //$scope.totalPages = data[0].totalItems;
        }, function () {
            $scope.totalItems = 0;
            //$scope.totalPages = 0;
        });

      void 0;
      
      var offset_page =  ( $scope.currentPage - 1 ) * $scope.pageSize;
      $scope.filterCriteria.count = 0;
      $scope.filterCriteria.start = offset_page;
      return serviziList.getList($scope.filterCriteria).then(function(data) {
            void 0;
            $scope.items = data;
        }, function () {
            $scope.items = [];
        });
    };
      
 
  //called when navigate to another page in the pagination
  $scope.selectPage = function () {
    var page = $scope.currentPage;
    void 0;  
    void 0;
    $scope.currentPage = page;
    $scope.filterCriteria.pageNumber = page;
    $scope.fetchResult();
  };
 
  
 
  //manually select a page to trigger an ajax request to populate the grid on page load
  void 0;
                                          
  $scope.selectPage(1);
    

  /* watch change selection    
    $scope.$watch("id_utenti_selezione", function(newValue, oldValue) {
        console.log('id_utenti changed! New ' + newValue + ' Old ' +  oldValue + ' NO ACTION');
    });    
    
    //watch on change
    
    $scope.$watch("data_servizi_selezione", function(newValue, oldValue) {
        console.log('data_servizi changed!' + newValue + ' ' +  oldValue);
        
        if(newValue){
            console.log($filter('date')(newValue,'MM'));
            console.log($filter('date')(newValue,'yyyy'));
            $scope.filterCriteria.mese_selezione = $filter('date')(newValue,'MM');
            $scope.filterCriteria.anno_selezione = $filter('date')(newValue,'yyyy');
        } else {
            $scope.filterCriteria.mese_selezione = 0;
            $scope.filterCriteria.anno_selezione = 0;
        }
        $scope.currentPage = 1;
        $scope.filterCriteria.pageNumber = $scope.currentPage;
        $scope.fetchResult();
        
    });    
    */
    
    
    $scope.popupDate = function($event) {
        void 0;
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedPopupDate) {
            $scope.openedPopupDate = false;
        } else {
            $scope.openedPopupDate = true;
        }
    };
    
    
    // callback for ng-click 'editUser':
    $scope.editItem = function (itemId) {
        void 0;
        $location.path('/menu/editRelazioni/' + itemId);
    };
    
    
    // callback for ng-click 'editUser':
    $scope.viewItem = function (itemId) {
        void 0;
        $location.path('/menu/viewRelazioni/' + itemId);
    };    
    
    $scope.toggleRight = function() {
        var alertPopup = $ionicPopup.alert({
                title: '*TODO*',
                template: 'TODO'
        });
                alertPopup.then(function(res) {
                void 0;
        });
    }; 
                                          
    $scope.OpenFilterFromPopover = function() {
        $scope.popover.hide();
        //$scope.sortModal.show();
    };
    
    // Gestione popover                                      
                                          
    var templatePopover = '<ion-popover-view>';
    //templatePopover +=    '<ion-header-bar><h1 class="title">Azioni possibili</h1></ion-header-bar>';                                          
    templatePopover +=    '<ion-content>';                                      
    templatePopover +=    '<div class="list">';
    templatePopover +=    '<a class="item item-icon-left" ng-click="OpenFilterFromPopover()"><i class="icon ion-funnel"></i>Filtro</a>';
    //templatePopover +=    '<button class="button button-clear button-positive" ng-click="debug_action()">Chiudi</button>';
    templatePopover +=    '</div>';
    templatePopover +=    '</ion-content>';                                      
    templatePopover +=    '</ion-popover-view>';


                                       
                                          
    void 0;                                          
                                          
    //$ionicPopover.fromTemplateUrl('popover.html', function(popover) {
     //$scope.popover = popover;
    //});              
                             
    $scope.popover = $ionicPopover.fromTemplate(templatePopover, { scope: $scope });                                     
                                          
                                          
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });                                          
                                          
                                          
    
    
}]);


'use strict';

/* Controllers */

//angular.module('myApp.controllers', [])
angular.module('myApp.controllers')


// ReportCtrl -------------------------------------------------------------------------------------
// ReportCtrl -------------------------------------------------------------------------------------
// ReportCtrl -------------------------------------------------------------------------------------
// ReportCtrl -------------------------------------------------------------------------------------
// ReportCtrl -------------------------------------------------------------------------------------
.controller('ReportCtrlMobile', ['$scope', '$rootScope', 'Restangular', 'rService', '$filter', '$http', '$sce', 'Session', '$ionicPopup',
                        function( $scope,   $rootScope,   Restangular,   rService,   $filter,   $http,   $sce,   Session,   $ionicPopup ) {

    $scope.timeCalculated = 0;
    $scope.item = {};
    $scope.item.tipo_report = 1;
    $scope.openedPopupDate = false;    
    $scope.showDownloadButton = false;
    $scope.showDownloadUrl = false;
    $scope.showGoogleViewUrl = '';
    
   // fill select utenti
    if(Session.isAdmin) {
        void 0;
        var utentiList = Restangular.all('utentiAll');
        utentiList.getList().then(function(accounts) {
            //console.log(accounts);
            $scope.utentiList = accounts;
            $scope.utentiList.push({"id_utenti": 0,"nome_breve_utenti": "TUTTI"});
        });
    } else {
        void 0;
        void 0;
        $scope.utentiList = [];
        $scope.utentiList.push({id_utenti: Session.id_utenti,nome_breve_utenti: Session.nome_breve_utenti});
        $scope.item.id_utenti = Session.id_utenti;
    }

    $scope.popupDate = function($event) {
        void 0;
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedPopupDate) {
            $scope.openedPopupDate = false;
        } else {
            $scope.openedPopupDate = true;
        }
    };                      
                      
    $scope.view_pdf = function(item){
        void 0;
        void 0;
        //TEST:https://docs.google.com/viewer?url=http%3A%2F%2Fresearch.google.com%2Farchive%2Fbigtable-osdi06.pdf
        //$scope.showGoogleViewUrl = 'https://docs.google.com/viewer?url=' + encodeURIComponent($rootScope.base_url +  $scope.showDownloadUrl);
        var browser = window.open($scope.showGoogleViewUrl, '_blank', 'location=no');
    };
                      
    $scope.build_report = function(item){
        
        // validate form
        void 0;
        void 0;
        void 0;

        var msg = '';
        
        if ($scope.item.id_utenti >= 0){
            msg = '';
        } else {
            msg = 'Selezionare una Associazione';
        }
        
        if (!$scope.item.data_servizi){
            msg = 'Selezionare una data!';
        }
    
        if (msg != ''){
            void 0;
            var alertPopup = $ionicPopup.alert({
                title: 'Errori di input',
                template: msg
            });
                alertPopup.then(function(res) {
                void 0;
            });   
            
        } else {
        
        
            // carica i dati per creare la url
            var new_stampa = {
                id_utenti : $scope.item.id_utenti,
                tipo_report : $scope.item.tipo_report,
                data_servizi : $scope.item.data_servizi,
                relazione_servizio : $scope.item.relazione_servizio,
                utenti_controllati : $scope.item.utenti_controllati,
                dati_auto : $scope.item.dati_auto,
                giorno_servizi : $filter('date')($scope.item.data_servizi,'dd'),
                mese_servizi : $filter('date')($scope.item.data_servizi,'MM'),
                anno_servizi : $filter('date')($scope.item.data_servizi,'yyyy'),
                nome_file : new Date().getTime(),
                mobile : 1
            };

            var utentiList = Restangular.allUrl('pdf','/pdf');
            //var baseServizi = Restangular.allUrl('servizi', '/api1/servizi');
            utentiList.getList(new_stampa).then(function(accounts) {
                //console.log(accounts);
                void 0;
                
                if ( accounts[0].report_filename == 'NODATATODISPLAY'){
                      var alertPopup = $ionicPopup.alert({
                                  title: 'Messaggio',
                                  template: 'Nessun dato da visualizzare'
                    });
                    alertPopup.then(function(res) {
                        void 0;
                    });   

                } else
                {
                    $scope.showDownloadButton = true;
                    $scope.showDownloadButtonText = "Scarica la stampa pdf (" + accounts[0].report_filename + ")";
                    $scope.showDownloadUrl = "/pdfget?nomefile=" + accounts[0].report_filename;
                    $scope.showGoogleViewUrl = 'https://docs.google.com/viewer?url=' + encodeURIComponent($rootScope.base_url +  $scope.showDownloadUrl);
                }
                
                
                //var browser = window.open('http://www.google.com', '_blank', 'location=no');
                void 0;
                
                
                //'NODATATODISPLAY'
                
            }, function () {
                void 0;
                //$scope.totalPages = 0;
            });

            

            /*
            var r_array = JSON.stringify(new_stampa);
            console.log(r_array);


            var formString = '', key;
            for (key in new_stampa) {
                    //if (!new_stampa[key]) { return; }
                    if (!new_stampa.hasOwnProperty(key)) { return; }
                    if (formString.length !== 0) { formString += '&'; }
                        formString += key + '=' + encodeURIComponent(new_stampa[key]);
            }
            console.log(formString);

            var url = '/pdf/?' + formString;
            //url = '/pdf?anno_servizi=1&prova=123';
            console.log(url);
            var success = new PDFObject({ url: url }).embed("PDF_DIV_CONTAINER");
            */
        } // ok
        
    }
    


    

}])
    
//TestController --------------------------------------------------------------------------------------
//TestController --------------------------------------------------------------------------------------
//TestController --------------------------------------------------------------------------------------
//TestController --------------------------------------------------------------------------------------
//TestController --------------------------------------------------------------------------------------
.controller('TestController', 
            [ '$scope', 'Session', 'Restangular', '$rootScope', '$modal', '$filter', '$location',
            function ($scope, Session, Restangular, $rootScope, $modal, $filter, $location) {
  void 0;
  
  $scope.totalPages = 0;
  $scope.itemsCount = 0;
  $scope.currentPage = 1;    
  $scope.totalItems = 0;
  $scope.pageSize = 3;
  $scope.startPage = 0;         
  $scope.openedPopupDate = false;    
  $scope.utentiList = [];
 
    
  //default criteria that will be sent to the server
  $scope.filterCriteria = {
    pageNumber: 1,
    count: 0,
    limit: $scope.pageSize,
    start: 0,
    sortDir: 'asc',
    sortedBy: 'id',
    id_utenti_selezione : 0,
    mese_selezione : 0,
    anno_selezione: 0
  };
    
    // popola la lista utenti
    var volontariList = Restangular.all('utentiAll');
    volontariList.getList().then(function(accounts) {
        void 0;
        if(Session.isAdmin) {
            void 0;
            $scope.utentiList = accounts;
            $scope.utentiList.push({"id_utenti": 0,"nome_breve_utenti": "TUTTI"});
            $scope.id_utenti_selezione = 0;
        } else {
            void 0;
            void 0;
            $scope.id_utenti_selezione = Session.id_utenti;
            $scope.utentiList = [];
            $scope.utentiList.push({id_utenti: Session.id_utenti,nome_breve_utenti: Session.nome_breve_utenti});
        }
    });    
 

 
  //The function that is responsible of fetching the result from the server and setting the grid to the new result
  $scope.fetchResult = function () {
      void 0;
      void 0;
    
      var serviziList = Restangular.all('serviziAll');
      
      void 0;
      $scope.filterCriteria.count = 1;
      serviziList.getList($scope.filterCriteria).then(function(data) {
            void 0;
            void 0;
          
            if (data.length > 0) {
                $scope.totalItems = data[0].totalItems;
            } else {
                $scope.totalItems = 0;
            }
            //$scope.totalPages = data[0].totalItems;
        }, function () {
            $scope.totalItems = 0;
            //$scope.totalPages = 0;
        });

      void 0;
      
      var offset_page =  ( $scope.currentPage - 1 ) * $scope.pageSize;
      $scope.filterCriteria.count = 0;
      $scope.filterCriteria.start = offset_page;
      return serviziList.getList($scope.filterCriteria).then(function(data) {
            void 0;
            $scope.items = data;
        }, function () {
            $scope.items = [];
        });
    };
      
 
  //called when navigate to another page in the pagination
  $scope.selectPage = function () {
    var page = $scope.currentPage;
    void 0;  
    void 0;
    $scope.currentPage = page;
    $scope.filterCriteria.pageNumber = page;
    $scope.fetchResult();
  };
 
  
 
  //manually select a page to trigger an ajax request to populate the grid on page load
  $scope.selectPage(1);
    

  // watch change selection    
  $scope.$watch("id_utenti_selezione", function(newValue, oldValue) {
        void 0;
        
        if(Session.isAdmin) {
            
            
            $scope.filterCriteria.id_utenti_selezione = newValue;
            $scope.currentPage = 1;
            $scope.filterCriteria.pageNumber = $scope.currentPage;
            $scope.fetchResult();

        } else {
            void 0;
        }
        
    });    
    
    //watch on change
    
    $scope.$watch("data_servizi_selezione", function(newValue, oldValue) {
        void 0;
        
        if(newValue){
            void 0;
            void 0;
            $scope.filterCriteria.mese_selezione = $filter('date')(newValue,'MM');
            $scope.filterCriteria.anno_selezione = $filter('date')(newValue,'yyyy');
        } else {
            $scope.filterCriteria.mese_selezione = 0;
            $scope.filterCriteria.anno_selezione = 0;
        }
        $scope.currentPage = 1;
        $scope.filterCriteria.pageNumber = $scope.currentPage;
        $scope.fetchResult();
        
    });    
    
    
    
    $scope.popupDate = function($event) {
        void 0;
        $event.preventDefault();
        $event.stopPropagation();
        if($scope.openedPopupDate) {
            $scope.openedPopupDate = false;
        } else {
            $scope.openedPopupDate = true;
        }
    };
    
    
    // callback for ng-click 'editUser':
    $scope.editItem = function (itemId) {
        void 0;
        $location.path('/edit/' + itemId);
    };
    
    // callback for ng-click 'viewUser':
    $scope.viewItem = function (itemId) {
        void 0;
        $location.path('/view/' + itemId);
    };    
    
  // --------------------------------------------------- modal test    
    
    
  $scope.items = ['item1', 'item2', 'item3'];

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};    
    
    
    
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      void 0;
    });
  };
   
      
}]);


'use strict';

/* Filters */

angular.module('myApp.filters', [])

.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}])
.filter("asDate", function () {
    return function (input) {
        void 0;
        return new Date(input);
    }
})
.filter('datetmUTC', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
    void 0;
    var _date = $filter('date')(new Date(input),'MMM dd yyyy - HH:mm:ss');
    void 0;
    var _now = new Date(_date);
    void 0;
    void 0;
    return _now.getTime();
 };
});
'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

.directive('browserVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
            var agentStr = navigator.userAgent;
            this.IsIE = false;
            this.IsOn = undefined;  //defined only if IE
            this.Version = undefined;

        if (agentStr.indexOf("MSIE 7.0") > -1) {
          this.IsIE = true;
          this.IsOn = true;
          if (agentStr.indexOf("Trident/6.0") > -1) {
            this.Version = 'IE10';
          } else if (agentStr.indexOf("Trident/5.0") > -1) {
            this.Version = 'IE9';
          } else if (agentStr.indexOf("Trident/4.0") > -1) {
            this.Version = 'IE8';
          } else {
            this.IsOn = false; // compatability mimics 7, thus not on
            this.Version = 'IE7';
          }
        } //IE 7
  };
  }])


.directive('fancySelect', [ '$ionicModal',function($ionicModal) 
            {
            return {
                /* Only use as <fancy-select> tag */
                restrict : 'E',

                /* Our template */
                templateUrl: 'partials/fancy-select.html',

                /* Attributes to set */
                scope: {
                    'items'        : '=', /* Items list is mandatory */
                    'text'         : '=', /* Displayed text is mandatory */
                    'value'        : '=', /* Selected value binding is mandatory */
                    'callback'     : '&'
                },

                link: function (scope, element, attrs) {

                    /* Default values */
                    scope.multiSelect   = attrs.multiSelect === 'true' ? true : false;
                    scope.allowEmpty    = attrs.allowEmpty === 'false' ? false : true;

                    /* Header used in ion-header-bar */
                    scope.headerText    = attrs.headerText || '';
                    scope.labelText     = attrs.labelText || '';

                    /* Text displayed on label */
                    // scope.text          = attrs.text || '';
                    scope.defaultText   = scope.text || '';

                    /* Notes in the right side of the label */
                    scope.noteText      = attrs.noteText || '';
                    scope.noteImg       = attrs.noteImg || '';
                    scope.noteImgClass  = attrs.noteImgClass || '';
                    
                    /* Optionnal callback function */
                    // scope.callback = attrs.callback || null;

                    /* Instanciate ionic modal view and set params */

                    /* Some additionnal notes here : 
                     * 
                     * In previous version of the directive,
                     * we were using attrs.parentSelector
                     * to open the modal box within a selector. 
                     * 
                     * This is handy in particular when opening
                     * the "fancy select" from the right pane of
                     * a side view. 
                     * 
                     * But the problem is that I had to edit ionic.bundle.js
                     * and the modal component each time ionic team
                     * make an update of the FW.
                     * 
                     * Also, seems that animations do not work 
                     * anymore.
                     * 
                     */
                    $ionicModal.fromTemplateUrl(
                        'partials/fancy-select-items.html',
                          {'scope': scope}
                    ).then(function(modal) {
                        scope.modal = modal;
                    });

                    /* Validate selection from header bar */
                    scope.validate = function (event) {
                        // Construct selected values and selected text
                        if (scope.multiSelect == true) {

                            // Clear values
                            scope.value = '';
                            scope.text = '';

                            // Loop on items
                            jQuery.each(scope.items, function (index, item) {
                                if (item.checked) {
                                    scope.value = scope.value + item.id+',';
                                    scope.text = scope.text + '\r' + item.text+', ';
                                }
                            });

                            // Remove trailing comma
                            scope.value = scope.value.substr(0,scope.value.length - 1);
                            scope.text = scope.text.substr(0,scope.text.length - 2);
                            
                            void 0;
                            void 0;
                            
                        }

                        // Select first value if not nullable
                        if (typeof scope.value == 'undefined' || scope.value == '' || scope.value == null ) {
                            if (scope.allowEmpty == false) {
                                scope.value = scope.items[0].id;
                                scope.text = scope.items[0].text;

                                // Check for multi select
                                scope.items[0].checked = true;
                            } else {
                                scope.text = scope.defaultText;
                            }
                        }

                        // Hide modal
                        scope.hideItems();
                        
                        // Execute callback function
                        if (typeof scope.callback == 'function') {
                            scope.callback (scope.value);
                        }
                    }

                    /* Show list */
                    scope.showItems = function (event) {
                        event.preventDefault();
                        scope.modal.show();
                    }

                    /* Hide list */
                    scope.hideItems = function () {
                        scope.modal.hide();
                    }

                    /* Destroy modal */
                    scope.$on('$destroy', function() {
                      scope.modal.remove();
                    });

                    /* Validate single with data */
                    scope.validateSingle = function (item) {

                        // Set selected text
                        scope.text = item.text;

                        // Set selected value
                        scope.value = item.id;

                        // Hide items
                        scope.hideItems();
                        
                        // Execute callback function
                        if (typeof scope.callback == 'function') {
                            scope.callback (scope.value);
                        }
                    }
                }
            };
        }
    ]
);