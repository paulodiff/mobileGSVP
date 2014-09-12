"use strict";angular.module("myApp.controllers").controller("EditItemCtrl",["$scope","$filter","$state","$stateParams","Restangular","rService","Session","$ionicPopup",function(e,i,t,n,o,a,r,l){var s=t.current.configAction;if(e.configAction=s,e.item={},e.openedPopupDate=!1,e.toggleRight=function(){t.go("menu.list")},e.rightButtons=[{type:"button-icon button-clear ion-email",tap:function(){}}],"edit"==s||"view"==s||"new"==s){"new"==s&&(n.id=0);var u=o.all("serviziAll");u.getList({limit:50,id_servizi_selezione:n.id}).then(function(t){if(e.item=t[0],e.item.data_servizi=i("date")(t[0].data_servizi,"yyyy-MM-dd"),e.item.a_ora_servizi=t[0].a_ora_servizi.substr(11,5),e.item.da_ora_servizi=t[0].da_ora_servizi.substr(11,5),e.item.id_utenti=t[0].id_utenti,e.item.lista_volontari_servizi=t[0].elenco_id_volontari.split(","),e.timeCalculated=a.time_diff(e.item.da_ora_servizi,e.item.a_ora_servizi),e.elenco_id_rapporti_servizio=t[0].elenco_id_rapporti_servizio,e.id_rapporto_valido_servizio=t[0].id_rapporto_valido_servizio,e.item.annullato_servizi=t[0].annullato_servizi,"new"==s&&(e.item=[],e.item.id_utenti=null,e.item.lista_volontari_servizi=[],e.item.data_servizi=i("date")(new Date,"yyyy-MM-dd"),e.item.a_ora_servizi=i("date")(new Date,"HH:mm"),e.item.da_ora_servizi=i("date")(new Date,"HH:mm"),e.item.annullato_servizi=0),"undefined"!=typeof e.item.id_utenti&&null!=e.item.id_utenti){var n=o.all("volontariAll");n.getList({id_volontari_utenti:e.item.id_utenti}).then(function(i){for(var n=[],o=i.length,a=0;o>a;a++){var r={id:i[a].id,checked:t[0].elenco_id_volontari.indexOf(i[a].id)>-1?!0:!1,text:i[a].nome_completo_volontari};n.push(r)}e.volontariList=n})}if(r.isAdmin){var l=o.all("utentiAll");l.getList().then(function(i){e.utentiList=i;for(var t=[],n=i.length,o=0;n>o;o++){var a={id:i[o].id_utenti,checked:i[o].id_utenti===e.item.id_utenti?!0:!1,text:i[o].nome_breve_utenti};t.push(a)}e.utentiList=t})}else{e.utentiList=[];var u=[],d={id:r.id_utenti,checked:!0,text:r.nome_breve_utenti};u.push(d),e.utentiList=u,e.item.id_utenti=r.id_utenti,e.item.nome_breve_utenti=r.nome_breve_utenti}})}e.master={},e.timeCalculated=0,e.timechanged=function(){e.timeCalculated=a.time_diff(e.item.da_ora_servizi,e.item.a_ora_servizi),e.timeCalculated<1&&(e.timeCalculated=e.timeCalculated+24)},e.cancel_action=function(e){var i=l.confirm({title:"Messaggio",template:"Annullare il presente elemento?"});i.then(function(i){i&&o.oneUrl("servizi","/api1/servizi/"+e.id).get().then(function(i){i.annullato_servizi=1,o.setBaseUrl("/api1"),i.customPUT({annullato_servizi:1},e.id,{},{}),o.setBaseUrl("/apiQ"),t.go("menu.list")})})},e.save_action=function(){var i="";if("undefined"==typeof e.item.elenco_id_volontari&&(i="Selezionare un volontario!"),""==e.item.elenco_id_volontari&&(i="Selezionare un volontario!"),!r.isAdmin&&e.item.data_servizi<new Date&&(i="Non è possibile selezionare date del servizio precedenti a quelle odierna."),""!=i){var n=l.alert({title:"Errori di input",template:i});n.then(function(){})}else{var a={id_utenti:e.item.id_utenti,data_servizi:e.item.data_servizi,da_ora_servizi:"1900-01-01T"+e.item.da_ora_servizi+":00.000Z",a_ora_servizi:"1900-01-01T"+e.item.a_ora_servizi+":00.000Z",note_servizi:e.item.note_servizi,lista_volontari:e.item.elenco_id_volontari.split(","),rapporto_servizi:e.item.rapporto_servizi},s=o.allUrl("servizi","/api1/servizi");s.post(a).then(function(e){var i=l.alert({title:"Messaggio",template:"Dato inserito con successo!"});i.then(function(){t.go("menu.edit",{id:e.id})})},function(){})}},e.new_relazione_action=function(e){t.go("menu.newRelazioni",{id:e})},e.goto_relazione_action=function(e){t.go("menu.editRelazioni",{id:e})},e.popupDate=function(i){i.preventDefault(),i.stopPropagation(),e.openedPopupDate=e.openedPopupDate?!1:!0},e.debug_action=function(){},e.$watch("item.id_utenti",function(i){if("new"==s&&"undefined"!=typeof i&&null!=i){var t=o.all("volontariAll");t.getList({id_volontari_utenti:i}).then(function(i){for(var t=[],n=i.length,o=0;n>o;o++){var a={id:i[o].id,checked:!1,text:i[o].nome_completo_volontari};t.push(a)}e.item.elenco_volontari="",e.item.elenco_id_volontari="",e.volontariList=t})}}),e.$watch("item.volontariList1",function(){})}]).controller("InfiniteCtrl",["$scope","$location","Restangular","$filter","Session","$ionicModal","$ionicSideMenuDelegate","$ionicPopover",function(e,i,t,n,o,a,r,l){e.totalPages=0,e.itemsCount=0,e.currentPage=1,e.totalItems=0,e.pageSize=1e5,e.startPage=0,e.openedPopupDate=!1,e.utentiList=[],e.id_utenti_selezione=0,a.fromTemplateUrl("partials/sortModal.html",function(i){e.sortModal=i},{scope:e,animation:"slide-in-up"}),e.openSortModal=function(){e.sortModal.show()},e.closeSortModal=function(){e.sortModal.hide()},e.saveSort=function(){e.filterCriteria.id_utenti_selezione=this.id_utenti_selezione,e.filterTerm=this.filterTerm,e.sortBy=this.sortBy,e.sortModal.hide(),e.fetchResult()},e.OpenFilter=function(){e.sortModal.show()},e.filterCriteria={pageNumber:1,count:0,limit:e.pageSize,start:0,sortDir:"asc",sortedBy:"id",id_utenti_selezione:o.isAdmin?0:o.id_utenti,mese_selezione:0,anno_selezione:0};var s=t.all("utentiAll");s.getList().then(function(i){o.isAdmin?(e.utentiList=i,e.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"}),e.id_utenti_selezione=0):(e.id_utenti_selezione=o.id_utenti,e.filterCriteria.id_utenti_selezione=o.id_utenti,e.utentiList=[],e.utentiList.push({id_utenti:o.id_utenti,nome_breve_utenti:o.nome_breve_utenti}))}),e.fetchResult=function(){var i=t.all("serviziAll");e.filterCriteria.count=1,i.getList(e.filterCriteria).then(function(i){e.totalItems=i.length>0?i[0].totalItems:0},function(){e.totalItems=0});var n=(e.currentPage-1)*e.pageSize;return e.filterCriteria.count=0,e.filterCriteria.start=n,i.getList(e.filterCriteria).then(function(i){e.items=i},function(){e.items=[]})},e.selectPage=function(){var i=e.currentPage;e.currentPage=i,e.filterCriteria.pageNumber=i,e.fetchResult()},e.selectPage(1),e.editItem=function(e){i.path("/menu/edit/"+e)},e.editRelazioni=function(e){i.path("/menu/editRelazioni/"+e)},e.newRelazioni=function(){i.path("/menu/new")},e.debug_action=function(){},e.newRelazioniFromPopover=function(){e.popover.remove(),i.path("/menu/new")},e.OpenFilterFromPopover=function(){e.popover.hide(),e.sortModal.show()};var u="<ion-popover-view>";u+="<ion-content>",u+='<div class="list">',u+='<a class="item item-icon-left" ng-click="newRelazioniFromPopover()" ><i class="icon ion-plus-circled"></i> Nuovo elemento</a>',u+='<a class="item item-icon-left" ng-click="OpenFilterFromPopover()"><i class="icon ion-funnel"></i>Filtro</a>',u+="</div>",u+="</ion-content>",u+="</ion-popover-view>",e.popover=l.fromTemplate(u,{scope:e}),e.$on("$destroy",function(){e.popover.remove()})}]);