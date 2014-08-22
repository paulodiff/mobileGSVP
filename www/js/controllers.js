/*! DesktopV 2014-05-09 */
"use strict";angular.module("myApp.controllers",[]).controller("AppCtrl",["$scope","USER_ROLES","AUTH_EVENTS","$rootScope","AuthService","modalService","Session","Restangular","$state",function($scope,USER_ROLES,AUTH_EVENTS,$rootScope,AuthService,modalService,Session,Restangular,$state){$scope.currentUser=null,$scope.userRoles=USER_ROLES,$scope.isAuthorized=AuthService.isAuthorized,$scope.go=function(path){$state.go(path)},$rootScope.$on(AUTH_EVENTS.loginSuccess,function(event,next){$scope.currentUser=Session.nome_breve_utenti,Restangular.setDefaultRequestParams({apiKey:Session.token})}),$rootScope.$on(AUTH_EVENTS.loginFailed,function(event,next){modalService.showModal({},{type:2,closeButtonText:"Cancel",actionButtonText:"Ok",headerText:"Login errato",bodyText:"Immettere nome utente e password corrette"}).then(function(){})}),$rootScope.$on(AUTH_EVENTS.notAuthenticated,function(event,next){$scope.currentUser=Session.nome_breve_utenti,modalService.showModal({},{type:2,closeButtonText:"Cancel",actionButtonText:"Ok",headerText:"Utente non autenticato",bodyText:"Immettere nome utente e password dalla pagina home"}).then(function(){})}),$rootScope.$on("$stateChangeStart",function(event,next){next.accessLogged&&(AuthService.isAuthenticated()||(event.preventDefault(),$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated)))})}]).controller("EditItemCtrl",["$scope","$state","$stateParams","Restangular","modalService","rService","Session",function($scope,$state,$stateParams,Restangular,modalService,rService,Session){var configAction=$state.current.configAction;if($scope.configAction=configAction,$scope.item={},$scope.openedPopupDate=!1,"edit"==configAction||"view"==configAction){var baseAccounts=Restangular.all("serviziAll");baseAccounts.getList({limit:50,id_servizi_selezione:$stateParams.id}).then(function(accounts){$scope.item=accounts[0],$scope.item.a_ora_servizi=new Date(accounts[0].a_ora_servizi),$scope.item.da_ora_servizi=new Date(accounts[0].da_ora_servizi),$scope.timeCalculated=rService.time_diff($scope.item.da_ora_servizi,$scope.item.a_ora_servizi)})}if("new"==configAction){var new_servizio={id_utenti:1,id_volontari_servizi:0,data_servizi:new Date,da_ora_servizi:new Date("1900-01-01T08:30:00.000Z"),a_ora_servizi:new Date("1900-01-01T10:30:00.000Z"),note_servizi:"",rapporto_servizi:""};$scope.item=new_servizio,$scope.timeCalculated=rService.time_diff(new Date("1900-01-01T08:15:00.000Z"),new Date("1900-01-01T19:33:00.000Z"))}if(Session.isAdmin){var utentiList=Restangular.all("utentiAll");utentiList.getList().then(function(accounts){$scope.utentiList=accounts})}else $scope.utentiList=[],$scope.utentiList.push({id_utenti:Session.id_utenti,nome_breve_utenti:Session.nome_breve_utenti}),$scope.item.id_utenti=Session.id_utenti;var volontariList=Restangular.all("volontariAll");volontariList.getList().then(function(accounts){$scope.volontariList=accounts}),$scope.master={},$scope.timeCalculated=0,$scope.timechanged=function(){$scope.timeCalculated=rService.time_diff($scope.item.da_ora_servizi,$scope.item.a_ora_servizi)},$scope.cancel_action=function(item){modalService.showModal({},{type:1,closeButtonText:"Indietro",actionButtonText:"Ok - Elimina!",headerText:"Messaggio",bodyText:"Eliminare il presente servizio?"}).then(function(){Restangular.oneUrl("servizi","/api1/servizi/"+item.id_servizi).get().then(function(account){account.annullato_servizi=1,Restangular.setBaseUrl("/api1"),account.customPUT({annullato_servizi:1},item.id_servizi,{},{}),Restangular.setBaseUrl("/apiQ"),$state.go("list")})})},$scope.save_action=function(){var msg="";if($scope.item.a_ora_servizi<=$scope.item.da_ora_servizi&&(msg="Orario servizi errato!"),0==$scope.item.id_volontari_servizi&&(msg="Selezionare un volontario!"),$scope.item.data_servizi<new Date&&(msg="Non è possibile selezionare date del servizio precedenti a quelle odierna."),""!=msg)modalService.showModal({},{type:2,closeButtonText:"Cancel",actionButtonText:"Ok",headerText:"Errori di inserimento dati!",bodyText:msg}).then(function(){});else{var new_servizio={id_volontari_servizi:$scope.item.id_volontari_servizi,data_servizi:$scope.item.data_servizi,da_ora_servizi:$scope.item.da_ora_servizi,a_ora_servizi:$scope.item.a_ora_servizi,note_servizi:$scope.item.note_servizi,rapporto_servizi:$scope.item.rapporto_servizi},baseServizi=Restangular.allUrl("servizi","/api1/servizi");baseServizi.post(new_servizio).then(function(msg){var modalOptions={type:1,headerText:"Messaggio",bodyText:"Dato inserito con successo"};modalService.showModal({},modalOptions).then(function(){$state.go("view",{id:msg.id_servizi})},function(){$state.go("view",{id:msg.id_servizi})})},function(msg){})}},$scope.popupDate=function($event){$event.preventDefault(),$event.stopPropagation(),$scope.openedPopupDate=$scope.openedPopupDate?!1:!0},$scope.$watch("item.id_utenti",function(newValue,oldValue){var volontariList=Restangular.all("volontariAll");volontariList.getList({id_volontari_utenti:newValue}).then(function(accounts){$scope.volontariList=accounts})})}]).controller("InfiniteCtrl",["$scope","$location","Restangular","$filter","Session",function($scope,$location,Restangular,$filter,Session){$scope.totalPages=0,$scope.itemsCount=0,$scope.currentPage=1,$scope.totalItems=0,$scope.pageSize=8,$scope.startPage=0,$scope.openedPopupDate=!1,$scope.utentiList=[],$scope.filterCriteria={pageNumber:1,count:0,limit:$scope.pageSize,start:0,sortDir:"asc",sortedBy:"id",id_utenti_selezione:Session.isAdmin?0:Session.id_utenti,mese_selezione:0,anno_selezione:0};var volontariList=Restangular.all("utentiAll");volontariList.getList().then(function(accounts){Session.isAdmin?($scope.utentiList=accounts,$scope.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"}),$scope.id_utenti_selezione=0):($scope.id_utenti_selezione=Session.id_utenti,$scope.filterCriteria.id_utenti_selezione=Session.id_utenti,$scope.utentiList=[],$scope.utentiList.push({id_utenti:Session.id_utenti,nome_breve_utenti:Session.nome_breve_utenti}))}),$scope.fetchResult=function(){var serviziList=Restangular.all("serviziAll");$scope.filterCriteria.count=1,serviziList.getList($scope.filterCriteria).then(function(data){$scope.totalItems=data.length>0?data[0].totalItems:0},function(){$scope.totalItems=0});var offset_page=($scope.currentPage-1)*$scope.pageSize;return $scope.filterCriteria.count=0,$scope.filterCriteria.start=offset_page,serviziList.getList($scope.filterCriteria).then(function(data){$scope.items=data},function(){$scope.items=[]})},$scope.selectPage=function(){var page=$scope.currentPage;$scope.currentPage=page,$scope.filterCriteria.pageNumber=page,$scope.fetchResult()},$scope.selectPage(1),$scope.$watch("id_utenti_selezione",function(newValue,oldValue){Session.isAdmin&&($scope.filterCriteria.id_utenti_selezione=newValue,$scope.currentPage=1,$scope.filterCriteria.pageNumber=$scope.currentPage,$scope.fetchResult())}),$scope.$watch("data_servizi_selezione",function(newValue,oldValue){newValue?($scope.filterCriteria.mese_selezione=$filter("date")(newValue,"MM"),$scope.filterCriteria.anno_selezione=$filter("date")(newValue,"yyyy")):($scope.filterCriteria.mese_selezione=0,$scope.filterCriteria.anno_selezione=0),$scope.currentPage=1,$scope.filterCriteria.pageNumber=$scope.currentPage,$scope.fetchResult()}),$scope.popupDate=function($event){$event.preventDefault(),$event.stopPropagation(),$scope.openedPopupDate=$scope.openedPopupDate?!1:!0},$scope.editItem=function(itemId){$location.path("/edit/"+itemId)}}]).controller("ReportCtrl",["$scope","Restangular","modalService","rService","$filter","$http","$sce","Session",function($scope,Restangular,modalService,rService,$filter,$http,$sce,Session){if($scope.timeCalculated=0,$scope.item={},$scope.item.tipo_report=1,$scope.openedPopupDate=!1,Session.isAdmin){var utentiList=Restangular.all("utentiAll");utentiList.getList().then(function(accounts){$scope.utentiList=accounts,$scope.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"})})}else $scope.utentiList=[],$scope.utentiList.push({id_utenti:Session.id_utenti,nome_breve_utenti:Session.nome_breve_utenti}),$scope.item.id_utenti=Session.id_utenti;var volontariList=Restangular.all("volontariAll");volontariList.getList().then(function(accounts){$scope.volontariList=accounts}),$scope.timechanged=function(){$scope.timeCalculated=rService.time_diff($scope.item.da_ora_servizi,$scope.item.a_ora_servizi)},$scope.popupDate=function($event){$event.preventDefault(),$event.stopPropagation(),$scope.openedPopupDate=$scope.openedPopupDate?!1:!0},$scope.build_report=function(item){var msg="";if($scope.item.id_utenti||(msg="Selezionare una Associazione"),$scope.item.data_servizi||(msg="Selezionare una data!"),""!=msg)modalService.showModal({},{closeButtonText:"Cancel",actionButtonText:"Ok",headerText:"Errori di inserimento dati!",bodyText:msg}).then(function(){});else{var key,new_stampa={id_utenti:$scope.item.id_utenti,tipo_report:$scope.item.tipo_report,data_servizi:$scope.item.data_servizi,relazione_servizio:$scope.item.relazione_servizio,utenti_controllati:$scope.item.utenti_controllati,dati_auto:$scope.item.dati_auto,giorno_servizi:$filter("date")($scope.item.data_servizi,"dd"),mese_servizi:$filter("date")($scope.item.data_servizi,"MM"),anno_servizi:$filter("date")($scope.item.data_servizi,"yyyy")},formString=(JSON.stringify(new_stampa),"");for(key in new_stampa){if(!new_stampa.hasOwnProperty(key))return;0!==formString.length&&(formString+="&"),formString+=key+"="+encodeURIComponent(new_stampa[key])}{var url="/pdf/?"+formString;new PDFObject({url:url}).embed("PDF_DIV_CONTAINER")}}},$scope.$watch("item.data_servizi",function(newValue,oldValue){var baseAccounts=Restangular.all("serviziAll");baseAccounts.getList({limit:50,id_utenti_selezione:$scope.item.id_utenti,mese_selezione:$filter("date")(newValue,"MM"),anno_selezione:$filter("date")(newValue,"yyyy")}).then(function(accounts){$scope.serviziList=[];for(var i=0;i<accounts.length;i++)accounts[i].nome_volontario_completo=accounts[i].nome_volontari+" "+accounts[i].cognome_volontari,$scope.serviziList.push(accounts[i])})}),$scope.$watch("item.id_utenti",function(newValue,oldValue){var volontariList=Restangular.all("volontariAll");volontariList.getList({id_volontari_utenti:newValue}).then(function(accounts){$scope.volontariList=accounts})})}]).controller("LoginController",["$scope","$rootScope","AUTH_EVENTS","AuthService",function($scope,$rootScope,AUTH_EVENTS,AuthService){$scope.credentials={username:"",password:""},$scope.login=function(credentials){AuthService.login(credentials).then(function(){$rootScope.$broadcast(AUTH_EVENTS.loginSuccess)},function(){$rootScope.$broadcast(AUTH_EVENTS.loginFailed)})},$scope.logout=function(credentials){AuthService.logout(credentials).then(function(){$rootScope.$broadcast(AUTH_EVENTS.loginSuccess)},function(){$rootScope.$broadcast(AUTH_EVENTS.loginFailed)})}}]).controller("TestController",["$scope","Session","Restangular","$rootScope","$modal","$filter","$location",function($scope,Session,Restangular,$rootScope,$modal,$filter,$location){$scope.totalPages=0,$scope.itemsCount=0,$scope.currentPage=1,$scope.totalItems=0,$scope.pageSize=3,$scope.startPage=0,$scope.openedPopupDate=!1,$scope.utentiList=[],$scope.filterCriteria={pageNumber:1,count:0,limit:$scope.pageSize,start:0,sortDir:"asc",sortedBy:"id",id_utenti_selezione:0,mese_selezione:0,anno_selezione:0};var volontariList=Restangular.all("utentiAll");volontariList.getList().then(function(accounts){Session.isAdmin?($scope.utentiList=accounts,$scope.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"}),$scope.id_utenti_selezione=0):($scope.id_utenti_selezione=Session.id_utenti,$scope.utentiList=[],$scope.utentiList.push({id_utenti:Session.id_utenti,nome_breve_utenti:Session.nome_breve_utenti}))}),$scope.fetchResult=function(){var serviziList=Restangular.all("serviziAll");$scope.filterCriteria.count=1,serviziList.getList($scope.filterCriteria).then(function(data){$scope.totalItems=data.length>0?data[0].totalItems:0},function(){$scope.totalItems=0});var offset_page=($scope.currentPage-1)*$scope.pageSize;return $scope.filterCriteria.count=0,$scope.filterCriteria.start=offset_page,serviziList.getList($scope.filterCriteria).then(function(data){$scope.items=data},function(){$scope.items=[]})},$scope.selectPage=function(){var page=$scope.currentPage;$scope.currentPage=page,$scope.filterCriteria.pageNumber=page,$scope.fetchResult()},$scope.selectPage(1),$scope.$watch("id_utenti_selezione",function(newValue,oldValue){Session.isAdmin&&($scope.filterCriteria.id_utenti_selezione=newValue,$scope.currentPage=1,$scope.filterCriteria.pageNumber=$scope.currentPage,$scope.fetchResult())}),$scope.$watch("data_servizi_selezione",function(newValue,oldValue){newValue?($scope.filterCriteria.mese_selezione=$filter("date")(newValue,"MM"),$scope.filterCriteria.anno_selezione=$filter("date")(newValue,"yyyy")):($scope.filterCriteria.mese_selezione=0,$scope.filterCriteria.anno_selezione=0),$scope.currentPage=1,$scope.filterCriteria.pageNumber=$scope.currentPage,$scope.fetchResult()}),$scope.popupDate=function($event){$event.preventDefault(),$event.stopPropagation(),$scope.openedPopupDate=$scope.openedPopupDate?!1:!0},$scope.editItem=function(itemId){$location.path("/edit/"+itemId)},$scope.items=["item1","item2","item3"];var ModalInstanceCtrl=function($scope,$modalInstance,items){$scope.items=items,$scope.selected={item:$scope.items[0]},$scope.ok=function(){$modalInstance.close($scope.selected.item)},$scope.cancel=function(){$modalInstance.dismiss("cancel")}};$scope.open=function(size){var modalInstance=$modal.open({templateUrl:"myModalContent.html",controller:ModalInstanceCtrl,size:size,resolve:{items:function(){return $scope.items}}});modalInstance.result.then(function(selectedItem){$scope.selected=selectedItem},function(){})}}]);