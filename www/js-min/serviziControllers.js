"use strict";angular.module("myApp.controllers").controller("EditItemCtrl",["$scope","$filter","$state","$stateParams","Restangular","modalService","rService","Session","$ionicPopup",function(e,t,i,n,o,a,r,l,s){var u=i.current.configAction;if(e.configAction=u,e.item={},e.openedPopupDate=!1,e.toggleRight=function(){i.go("menu.list")},e.rightButtons=[{type:"button-icon button-clear ion-email",tap:function(){}}],"edit"==u||"view"==u||"new"==u){"new"==u&&(n.id=0);var _=o.all("serviziAll");_.getList({limit:50,id_servizi_selezione:n.id}).then(function(i){if(e.item=i[0],e.item.data_servizi=t("date")(i[0].data_servizi,"yyyy-MM-dd"),e.item.a_ora_servizi=t("date")(i[0].a_ora_servizi,"HH:mm"),e.item.da_ora_servizi=t("date")(i[0].da_ora_servizi,"HH:mm"),e.item.id_utenti=i[0].id_utenti,e.item.lista_volontari_servizi=i[0].elenco_id_volontari.split(","),e.timeCalculated=r.time_diff(e.item.da_ora_servizi,e.item.a_ora_servizi),e.elenco_id_rapporti_servizio=i[0].elenco_id_rapporti_servizio,e.id_rapporto_valido_servizio=i[0].id_rapporto_valido_servizio,e.item.annullato_servizi=i[0].annullato_servizi,"new"==u&&(e.item=[],e.item.id_utenti=null,e.item.lista_volontari_servizi=[],e.item.data_servizi=t("date")(new Date,"yyyy-MM-dd"),e.item.a_ora_servizi=t("date")(new Date,"HH:mm"),e.item.da_ora_servizi=t("date")(new Date,"HH:mm"),e.item.annullato_servizi=0),"undefined"!=typeof e.item.id_utenti&&null!=e.item.id_utenti){var n=o.all("volontariAll");n.getList({id_volontari_utenti:e.item.id_utenti}).then(function(t){for(var n=[],o=t.length,a=0;o>a;a++){var r={id:t[a].id,checked:i[0].elenco_id_volontari.indexOf(t[a].id)>-1?!0:!1,text:t[a].nome_completo_volontari};n.push(r)}e.volontariList=n})}if(l.isAdmin){var a=o.all("utentiAll");a.getList().then(function(t){e.utentiList=t;for(var i=[],n=t.length,o=0;n>o;o++){var a={id:t[o].id_utenti,checked:t[o].id_utenti===e.item.id_utenti?!0:!1,text:t[o].nome_breve_utenti};i.push(a)}e.utentiList=i})}else{e.utentiList=[];var s=[],_={id:l.id_utenti,checked:!0,text:l.nome_breve_utenti};s.push(_),e.utentiList=s,e.item.id_utenti=l.id_utenti,e.item.nome_breve_utenti=l.nome_breve_utenti}})}e.master={},e.timeCalculated=0,e.timechanged=function(){e.timeCalculated=r.time_diff(e.item.da_ora_servizi,e.item.a_ora_servizi),e.timeCalculated<1&&(e.timeCalculated=e.timeCalculated+24)},e.cancel_action=function(e){var t=s.confirm({title:"Messaggio",template:"Annullare il presente elemento?"});t.then(function(t){t&&o.oneUrl("servizi","/api1/servizi/"+e.id).get().then(function(t){t.annullato_servizi=1,o.setBaseUrl("/api1"),t.customPUT({annullato_servizi:1},e.id,{},{}),o.setBaseUrl("/apiQ"),i.go("menu.list")})})},e.save_action=function(){var t="";if("undefined"==typeof e.item.elenco_id_volontari&&(t="Selezionare un volontario!"),""==e.item.elenco_id_volontari&&(t="Selezionare un volontario!"),!l.isAdmin&&e.item.data_servizi<new Date&&(t="Non è possibile selezionare date del servizio precedenti a quelle odierna."),""!=t){var n=s.alert({title:"Errori di input",template:t});n.then(function(){})}else{var a={id_utenti:e.item.id_utenti,data_servizi:e.item.data_servizi,da_ora_servizi:"1900-01-01T"+e.item.da_ora_servizi+":00.000Z",a_ora_servizi:"1900-01-01T"+e.item.a_ora_servizi+":00.000Z",note_servizi:e.item.note_servizi,lista_volontari:e.item.elenco_id_volontari.split(","),rapporto_servizi:e.item.rapporto_servizi},r=o.allUrl("servizi","/api1/servizi");r.post(a).then(function(e){var t=s.alert({title:"Messaggio",template:"Dato inserito con successo!"});t.then(function(){i.go("menu.edit",{id:e.id})})},function(){})}},e.new_relazione_action=function(e){i.go("menu.newRelazioni",{id:e})},e.goto_relazione_action=function(e){i.go("menu.editRelazioni",{id:e})},e.popupDate=function(t){t.preventDefault(),t.stopPropagation(),e.openedPopupDate=e.openedPopupDate?!1:!0},e.debug_action=function(){},e.$watch("item.id_utenti",function(t){if("new"==u&&"undefined"!=typeof t&&null!=t){var i=o.all("volontariAll");i.getList({id_volontari_utenti:t}).then(function(t){for(var i=[],n=t.length,o=0;n>o;o++){var a={id:t[o].id,checked:!1,text:t[o].nome_completo_volontari};i.push(a)}e.item.elenco_volontari="",e.item.elenco_id_volontari="",e.volontariList=i})}}),e.$watch("item.volontariList1",function(){})}]).controller("InfiniteCtrl",["$scope","$location","Restangular","$filter","Session","$ionicModal","$ionicSideMenuDelegate",function(e,t,i,n,o,a){e.totalPages=0,e.itemsCount=0,e.currentPage=1,e.totalItems=0,e.pageSize=1e5,e.startPage=0,e.openedPopupDate=!1,e.utentiList=[],e.id_utenti_selezione=0,a.fromTemplateUrl("partials/sortModal.html",function(t){e.sortModal=t},{scope:e,animation:"slide-in-up"}),e.openSortModal=function(){e.sortModal.show()},e.closeSortModal=function(){e.sortModal.hide()},e.saveSort=function(){e.filterCriteria.id_utenti_selezione=this.id_utenti_selezione,e.filterTerm=this.filterTerm,e.sortBy=this.sortBy,e.sortModal.hide(),e.fetchResult()},e.toggleRight=function(){e.sortModal.show()},e.filterCriteria={pageNumber:1,count:0,limit:e.pageSize,start:0,sortDir:"asc",sortedBy:"id",id_utenti_selezione:o.isAdmin?0:o.id_utenti,mese_selezione:0,anno_selezione:0};var r=i.all("utentiAll");r.getList().then(function(t){o.isAdmin?(e.utentiList=t,e.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"}),e.id_utenti_selezione=0):(e.id_utenti_selezione=o.id_utenti,e.filterCriteria.id_utenti_selezione=o.id_utenti,e.utentiList=[],e.utentiList.push({id_utenti:o.id_utenti,nome_breve_utenti:o.nome_breve_utenti}))}),e.fetchResult=function(){var t=i.all("serviziAll");e.filterCriteria.count=1,t.getList(e.filterCriteria).then(function(t){e.totalItems=t.length>0?t[0].totalItems:0},function(){e.totalItems=0});var n=(e.currentPage-1)*e.pageSize;return e.filterCriteria.count=0,e.filterCriteria.start=n,t.getList(e.filterCriteria).then(function(t){e.items=t},function(){e.items=[]})},e.selectPage=function(){var t=e.currentPage;e.currentPage=t,e.filterCriteria.pageNumber=t,e.fetchResult()},e.selectPage(1),e.editItem=function(e){t.path("/menu/edit/"+e)},e.editRelazioni=function(e){t.path("/menu/editRelazioni/"+e)},e.newRelazioni=function(){t.path("/menu/new")},e.debug_action=function(){}}]).controller("ReportCtrlMobile",["$scope","Restangular","modalService","rService","$filter","$http","$sce","Session","$ionicPopup",function(e,t,i,n,o,a,r,l,s){if(e.timeCalculated=0,e.item={},e.item.tipo_report=1,e.openedPopupDate=!1,e.showDownloadButton=!1,l.isAdmin){var u=t.all("utentiAll");u.getList().then(function(t){e.utentiList=t,e.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"})})}else e.utentiList=[],e.utentiList.push({id_utenti:l.id_utenti,nome_breve_utenti:l.nome_breve_utenti}),e.item.id_utenti=l.id_utenti;e.popupDate=function(t){t.preventDefault(),t.stopPropagation(),e.openedPopupDate=e.openedPopupDate?!1:!0},e.build_report=function(){var i="";if(i=e.item.id_utenti>=0?"":"Selezionare una Associazione",e.item.data_servizi||(i="Selezionare una data!"),""!=i){var n=s.alert({title:"Errori di input",template:i});n.then(function(){})}else{var a={id_utenti:e.item.id_utenti,tipo_report:e.item.tipo_report,data_servizi:e.item.data_servizi,relazione_servizio:e.item.relazione_servizio,utenti_controllati:e.item.utenti_controllati,dati_auto:e.item.dati_auto,giorno_servizi:o("date")(e.item.data_servizi,"dd"),mese_servizi:o("date")(e.item.data_servizi,"MM"),anno_servizi:o("date")(e.item.data_servizi,"yyyy"),nome_file:(new Date).getTime(),mobile:1},r=t.allUrl("pdf","/pdf");r.getList(a).then(function(t){if("NODATATODISPLAY"==t[0].report_filename){var i=s.alert({title:"Messaggio",template:"Nessun dato da visualizzare"});i.then(function(){})}else e.showDownloadButton=!0,e.showDownloadButtonText="Scarica la stampa pdf ("+t[0].report_filename+")",e.showDownloadUrl="/pdfget?nomefile="+t[0].report_filename},function(){})}}}]).controller("TestController",["$scope","Session","Restangular","$rootScope","$modal","$filter","$location",function(e,t,i,n,o,a,r){e.totalPages=0,e.itemsCount=0,e.currentPage=1,e.totalItems=0,e.pageSize=3,e.startPage=0,e.openedPopupDate=!1,e.utentiList=[],e.filterCriteria={pageNumber:1,count:0,limit:e.pageSize,start:0,sortDir:"asc",sortedBy:"id",id_utenti_selezione:0,mese_selezione:0,anno_selezione:0};var l=i.all("utentiAll");l.getList().then(function(i){t.isAdmin?(e.utentiList=i,e.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"}),e.id_utenti_selezione=0):(e.id_utenti_selezione=t.id_utenti,e.utentiList=[],e.utentiList.push({id_utenti:t.id_utenti,nome_breve_utenti:t.nome_breve_utenti}))}),e.fetchResult=function(){var t=i.all("serviziAll");e.filterCriteria.count=1,t.getList(e.filterCriteria).then(function(t){e.totalItems=t.length>0?t[0].totalItems:0},function(){e.totalItems=0});var n=(e.currentPage-1)*e.pageSize;return e.filterCriteria.count=0,e.filterCriteria.start=n,t.getList(e.filterCriteria).then(function(t){e.items=t},function(){e.items=[]})},e.selectPage=function(){var t=e.currentPage;e.currentPage=t,e.filterCriteria.pageNumber=t,e.fetchResult()},e.selectPage(1),e.$watch("id_utenti_selezione",function(i){t.isAdmin&&(e.filterCriteria.id_utenti_selezione=i,e.currentPage=1,e.filterCriteria.pageNumber=e.currentPage,e.fetchResult())}),e.$watch("data_servizi_selezione",function(t){t?(e.filterCriteria.mese_selezione=a("date")(t,"MM"),e.filterCriteria.anno_selezione=a("date")(t,"yyyy")):(e.filterCriteria.mese_selezione=0,e.filterCriteria.anno_selezione=0),e.currentPage=1,e.filterCriteria.pageNumber=e.currentPage,e.fetchResult()}),e.popupDate=function(t){t.preventDefault(),t.stopPropagation(),e.openedPopupDate=e.openedPopupDate?!1:!0},e.editItem=function(e){r.path("/edit/"+e)},e.items=["item1","item2","item3"];var s=function(e,t,i){e.items=i,e.selected={item:e.items[0]},e.ok=function(){t.close(e.selected.item)},e.cancel=function(){t.dismiss("cancel")}};e.open=function(t){var i=o.open({templateUrl:"myModalContent.html",controller:s,size:t,resolve:{items:function(){return e.items}}});i.result.then(function(t){e.selected=t},function(){})}}]);