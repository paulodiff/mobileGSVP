"use strict";angular.module("myApp.controllers").controller("EditItemCtrlRelazioni",["$scope","$filter","$state","$stateParams","Restangular","modalService","rService","Session","$ionicPopup",function(e,i,t,n,o,a,r,l,_){var u=t.current.configAction;if(e.configAction=u,e.item={},e.openedPopupDate=!1,"edit"==u||"view"==u)var d=o.all("rapportiAll"),m={limit:50,id_rapporti_selezione:n.id};else var d=o.all("serviziAll"),m={limit:50,id_servizi_selezione:n.id};d.getList(m).then(function(t){if("edit"==u||"view"==u?(e.item.id=n.id,e.item.id_servizi=t[0].id_servizi,e.item.id_utenti=t[0].id_utenti,e.item.nome_breve_utenti=t[0].nome_breve_utenti,e.item.elenco_id_volontari=t[0].elenco_id_volontari,e.item.elenco_volontari=t[0].elenco_volontari,e.item.lista_volontari_relazioni=t[0].elenco_id_volontari.split(","),e.item.data_relazioni=i("date")(t[0].data_relazioni,"yyyy-MM-dd"),e.item.a_ora_relazioni=i("date")(t[0].a_ora_relazioni,"HH:mm"),e.item.da_ora_relazioni=i("date")(t[0].da_ora_relazioni,"HH:mm"),e.timeCalculated=r.time_diff(e.item.da_ora_relazioni,e.item.a_ora_relazioni),e.item.auto_relazioni=t[0].auto_relazioni,e.item.note_relazioni=t[0].note_relazioni,e.item.rapporto_relazioni=t[0].rapporto_relazioni,e.item.annullato_relazioni=t[0].annullato_relazioni):(e.item.id_servizi=n.id,e.item.id_utenti=t[0].id_utenti,e.item.nome_breve_utenti=t[0].nome_breve_utenti,e.item.elenco_id_volontari=t[0].elenco_id_volontari,e.item.elenco_volontari=t[0].elenco_volontari,e.item.lista_volontari_relazioni=t[0].elenco_id_volontari.split(","),e.item.elenco_id_volontari=t[0].elenco_id_volontari,e.item.data_relazioni=i("date")(t[0].data_servizi,"yyyy-MM-dd"),e.item.a_ora_relazioni=i("date")(t[0].a_ora_servizi,"HH:mm"),e.item.da_ora_relazioni=i("date")(t[0].da_ora_servizi,"HH:mm"),e.timeCalculated=r.time_diff(e.item.da_ora_relazioni,e.item.a_ora_relazioni),e.item.auto_relazioni=" -- NEW AUTO --",e.item.note_relazioni=" -- NEW NOTE --",e.item.rapporto_relazioni=" -- NEW RAPPORTO --",e.item.annullato_relazioni=0),"undefined"!=typeof e.item.id_utenti&&null!=e.item.id_utenti){var a=o.all("volontariAll");a.getList({id_volontari_utenti:e.item.id_utenti}).then(function(i){for(var n=[],o=i.length,a=0;o>a;a++){var r={id:i[a].id,checked:t[0].elenco_id_volontari.indexOf(i[a].id)>-1?!0:!1,text:i[a].nome_completo_volontari};n.push(r)}e.volontariList=n})}if(l.isAdmin){var _=o.all("utentiAll");_.getList().then(function(i){e.utentiList=i;for(var t=[],n=i.length,o=0;n>o;o++){var a={id:i[o].id_utenti,checked:i[o].id_utenti===e.item.id_utenti?!0:!1,text:i[o].nome_breve_utenti};t.push(a)}e.utentiList=t})}else{e.utentiList=[];var d=[],m={id:l.id_utenti,checked:!0,text:l.nome_breve_utenti};d.push(m),e.utentiList=d,e.item.id_utenti=l.id_utenti,e.item.nome_breve_utenti=l.nome_breve_utenti}}),e.toggleRight=function(){t.go("menu.listRelazioni")},e.master={},e.timeCalculated=0,e.timechanged=function(){e.timeCalculated=r.time_diff(e.item.da_ora_relazioni,e.item.a_ora_relazioni),e.timeCalculated<1&&(e.timeCalculated=e.timeCalculated+24)},e.cancel_action=function(e){var i=_.confirm({title:"Messaggio",template:"Annullare il presente elemento?"});i.then(function(i){i&&o.oneUrl("relazioni","/api1/relazioni/"+e.id).get().then(function(i){i.annullato_relazioni=1,o.setBaseUrl("/api1"),i.customPUT({annullato_relazioni:1},e.id,{},{}),o.setBaseUrl("/apiQ"),t.go("menu.listRelazioni")})})},e.save_action=function(){var i="";if("undefined"==typeof e.item.elenco_id_volontari&&(i="Selezionare un volontario!"),""==e.item.elenco_id_volontari&&(i="Selezionare un volontario!"),0==e.item.lista_volontari_relazioni.length&&(i="Selezionare un volontario!"),""!=i){var n=_.alert({title:"Errori di input",template:i});n.then(function(){})}else{var a={id_utenti:e.item.id_utenti,id_servizi:e.item.id_servizi,data_relazioni:e.item.data_relazioni,da_ora_relazioni:"1900-01-01T"+e.item.da_ora_relazioni+":00.000Z",a_ora_relazioni:"1900-01-01T"+e.item.a_ora_relazioni+":00.000Z",note_relazioni:e.item.note_relazioni,auto_relazioni:e.item.auto_relazioni,rapporto_relazioni:e.item.rapporto_relazioni,lista_volontari:e.item.lista_volontari_relazioni},r=o.allUrl("relazioni","/api1/relazioni");r.post(a).then(function(e){var i=_.alert({title:"Messaggio",template:"Dato inserito con successo!"});i.then(function(){t.go("menu.editRelazioni",{id:e.id})})},function(){})}},e.popupDate=function(i){i.preventDefault(),i.stopPropagation(),e.openedPopupDate=e.openedPopupDate?!1:!0},e.debug_action=function(){},e.$watch("item.id_utenti",function(){})}]).controller("InfiniteCtrlRelazioni",["$scope","$location","Restangular","$filter","Session","$ionicPopup","$ionicPopover",function(e,i,t,n,o,a,r){e.totalPages=0,e.itemsCount=0,e.currentPage=1,e.totalItems=0,e.pageSize=8,e.startPage=0,e.openedPopupDate=!1,e.utentiList=[],e.filterCriteria={pageNumber:1,count:0,limit:e.pageSize,start:0,sortDir:"asc",sortedBy:"id",id_utenti_selezione:o.isAdmin?0:o.id_utenti,mese_selezione:0,anno_selezione:0};var l=t.all("utentiAll");l.getList().then(function(i){o.isAdmin?(e.utentiList=i,e.utentiList.push({id_utenti:0,nome_breve_utenti:"TUTTI"}),e.id_utenti_selezione=0):(e.id_utenti_selezione=o.id_utenti,e.filterCriteria.id_utenti_selezione=o.id_utenti,e.utentiList=[],e.utentiList.push({id_utenti:o.id_utenti,nome_breve_utenti:o.nome_breve_utenti}))}),e.fetchResult=function(){var i=t.all("rapportiAll");e.filterCriteria.count=1,i.getList(e.filterCriteria).then(function(i){e.totalItems=i.length>0?i[0].totalItems:0},function(){e.totalItems=0});var n=(e.currentPage-1)*e.pageSize;return e.filterCriteria.count=0,e.filterCriteria.start=n,i.getList(e.filterCriteria).then(function(i){e.items=i},function(){e.items=[]})},e.selectPage=function(){var i=e.currentPage;e.currentPage=i,e.filterCriteria.pageNumber=i,e.fetchResult()},e.selectPage(1),e.$watch("id_utenti_selezione",function(){}),e.$watch("data_servizi_selezione",function(i){i?(e.filterCriteria.mese_selezione=n("date")(i,"MM"),e.filterCriteria.anno_selezione=n("date")(i,"yyyy")):(e.filterCriteria.mese_selezione=0,e.filterCriteria.anno_selezione=0),e.currentPage=1,e.filterCriteria.pageNumber=e.currentPage,e.fetchResult()}),e.popupDate=function(i){i.preventDefault(),i.stopPropagation(),e.openedPopupDate=e.openedPopupDate?!1:!0},e.editItem=function(e){i.path("/menu/editRelazioni/"+e)},e.toggleRight=function(){var e=a.alert({title:"*TODO*",template:"TODO"});e.then(function(){})},e.OpenFilterFromPopover=function(){e.popover.hide()};var _="<ion-popover-view>";_+="<ion-content>",_+='<div class="list">',_+='<a class="item item-icon-left" ng-click="OpenFilterFromPopover()"><i class="icon ion-funnel"></i>Filtro</a>',_+="</div>",_+="</ion-content>",_+="</ion-popover-view>",e.popover=r.fromTemplate(_,{scope:e}),e.$on("$destroy",function(){e.popover.remove()})}]);