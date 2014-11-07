(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/EditItemM.html',
    '<ion-view class="item-calm" title="Preventivo di servizio" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons><ion-nav-buttons side="right"><button class="button button-icon button-clear ion-search" ng-click="toggleRight()"></button></ion-nav-buttons></ion-nav-bar><ion-content has-header="true" padding="true"><div class="list"><div class="item item-calm"><div ng-show="configAction == \'edit\'"><h2><b>Preventivo di Servizio : {{item.id}} *</b></h2></div><div ng-show="configAction == \'new\'"><h2><b>Creazione nuovo Preventivo di Servizio</b></h2></div><div ng-show="configAction == \'view\'"><h2><b>Preventivo di Servizio : {{item.id}} **</b></h2></div></div><div ng-show="(configAction == \'edit\') ||  (configAction == \'new\')"><fancy-select allow-empty="false" label-text="Associazione" value="item.id_utenti" text="item.nome_breve_utenti" header-text="Seleziona utenti" items="utentiList"></fancy-select><fancy-select header-text="Selezione Volontario" label-text="Volontari" allow-empty="false" text="item.elenco_volontari" value="item.elenco_id_volontari" items="volontariList" multi-select="true"></fancy-select><label class="item item-input"><div class="input-label">Data servizio</div><input type="date" ng-model="item.data_servizi"></label> <label class="item item-input"><div class="input-label">Dalle ore</div><input type="time" ng-model="item.da_ora_servizi"></label> <label class="item item-input"><div class="input-label">Alle ore</div><input type="time" ng-model="item.a_ora_servizi"></label> <label class="item item-input"><span class="input-label">Località</span> <input type="text" ng-model="item.note_servizi"></label> <label class="item item-input"><span class="input-label">Motivazioni</span> <input type="text" ng-model="item.rapporto_servizi"></label></div><div ng-show="(configAction == \'view\')"><label class="item item-text-wrap"><b>Associazione:</b><br>{{item.nome_breve_utenti}}</label> <label class="item item-text-wrap"><b>Volontari:</b><br>{{item.elenco_volontari}}</label> <label class="item item-input"><div class="input-label"><b>Data servizio:</b></div><div class="input-label">{{item.data_servizi}}</div></label> <label class="item item-input"><div class="input-label"><b>Dalle ore:</b></div><div class="input-label">{{item.da_ora_servizi}}</div></label> <label class="item item-input"><div class="input-label"><b>Alle ore:</b></div><div class="input-label">{{item.a_ora_servizi}}</div></label> <label class="item item-text-wrap"><b>Località:</b><br>{{item.note_servizi}}</label> <label class="item item-text-wrap"><b>Motivazioni:</b><br>{{item.rapporto_servizi}}</label></div><button class="button icon-left ion-archive button-full button-positive" ng-show="configAction == \'new\'" id="salvabutton" ng-click="save_action(item)" name="singlebutton">Salva Elemento</button> <button class="button icon-left ion-close-round button-full button-assertive" ng-show="(configAction == \'view\') && (id_rapporto_valido_servizio == null) && (item.annullato_servizi == 0)" id="cancelbutton" ng-click="cancel_action(item)" name="button2id">Annulla Elemento</button> <button class="button icon-left ion-arrow-return-right button-full button-balanced" ng-show="(configAction == \'view\') && (id_rapporto_valido_servizio != null) && (item.annullato_servizi == 0)" id="cancelbutton" ng-click="goto_relazione_action(id_rapporto_valido_servizio)" name="button2id">Vai alla Relazione n. {{id_rapporto_valido_servizio}}</button> <button class="button icon-left ion-plus-circled button-full button-balanced" ng-show="(configAction == \'view\') && (id_rapporto_valido_servizio == null) && (item.annullato_servizi == 0)" id="rapportobutton" ng-click="new_relazione_action(item.id)" name="button3id">Crea nuova Relazione di Servizio</button> <button class="button  button-full button-positive" ng-show="(item.annullato_servizi == 1)" id="cancelbutton" name="button2id">Elemento ANNULLATO - nessuna operazione possibile</button> <button ng-show="false" class="button icon-left ion-star  button-full button-positive" id="debugBbutton" name="debugButton" ng-click="debug_action(item)">DEBUG</button></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/EditItemRelazioniM.html',
    '<ion-view class="" title="Relazione di servizio" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons><ion-nav-buttons side="right"><button class="button button-icon button-clear ion-search" ng-click="toggleRight()"></button></ion-nav-buttons></ion-nav-bar><ion-content has-header="true" padding="true"><div class="list"><div class="item  item-balanced"><div ng-show="configAction == \'edit\'" class="panel-heading"><h2><b>Relazione di Servizio : {{item.id}} *</b></h2></div><div ng-show="configAction == \'new\'" class="panel-heading"><h2<b>Creazione nuova Relazione di Servizio</h2<b></div><div ng-show="configAction == \'view\'" class="panel-heading"><h2><b>Relazione di Servizio : {{item.id}} **</b></h2></div></div><div ng-show="(configAction == \'edit\') ||  (configAction == \'new\')"><fancy-select allow-empty="false" label-text="Associazione" value="item.id_utenti" text="item.nome_breve_utenti" header-text="Seleziona utenti" items="utentiList"></fancy-select><fancy-select header-text="Selezione Volontario" label-text="Volontari" allow-empty="false" text="item.elenco_volontari" value="item.elenco_id_volontari" items="volontariList" multi-select="true"></fancy-select><label class="item item-input"><div class="input-label">Data Relazione</div><input type="date" ng-model="item.data_relazioni"></label> <label class="item item-input"><div class="input-label">Dalle ore</div><input type="time" ng-model="item.da_ora_relazioni"></label> <label class="item item-input"><div class="input-label">Alle ore</div><input type="time" ng-model="item.a_ora_relazioni"></label> <label class="item item-input"><span class="input-label">Rapporto</span> <input type="text" ng-model="item.rapporto_relazioni"></label> <label class="item item-input"><span class="input-label">Auto</span> <input type="text" ng-model="item.auto_relazioni"></label> <label class="item item-input"><span class="input-label">Note</span> <input type="text" ng-model="item.note_relazioni"></label></div><div ng-show="(configAction == \'view\')"><label class="item item-input"><div class="input-label"><b>Associazione:</b></div><div class="input-label">{{item.nome_breve_utenti}}</div></label> <label class="item item-text-wrap"><b>Volontari:</b><br>{{item.elenco_volontari}}</label> <label class="item item-input"><div class="input-label"><b>Data:</b></div><div class="input-label">{{item.data_relazioni}}</div></label> <label class="item item-input"><div class="input-label"><b>Dalle ore:</b></div><div class="input-label">{{item.da_ora_relazioni}}</div></label> <label class="item item-input"><div class="input-label"><b>Alle ore:</b></div><div class="input-label">{{item.a_ora_relazioni}}</div></label> <label class="item item-text-wrap"><b>Rapporto:</b><br>{{item.rapporto_relazioni}}</label> <label class="item item-text-wrap"><b>Auto:</b> {{item.auto_relazioni}}</label> <label class="item item-text-wrap"><b>Note:</b><br>{{item.note_relazioni}}</label></div><button class="button button-full button-positive" ng-show="configAction == \'new\'" id="salvabutton" ng-click="save_action(item)" name="singlebutton">Salva Elemento</button> <button class="button button-full button-assertive" ng-show="(configAction == \'view\') && (id_rapporto_valido_servizio == null) && (item.annullato_relazioni == 0)" id="cancelbutton" ng-click="cancel_action(item)" name="button2id">Annulla Elemento</button> <button class="button button-full button-positive" ng-show="(item.annullato_relazioni == 1)" id="cancelbutton" name="button2id">Elemento ANNULLATO - nessuna operazione possibile</button> <button ng-show="false" class="button button-full button-positive" id="debugBbutton" name="debugButton" ng-click="debug_action(item)">DEBUG</button></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/ListItemM.html',
    '<ion-view class="item-calm" title="Elenco relazioni preventive" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons><ion-nav-buttons side="right"><button class="button button-icon ion-more" ng-click="popover.show($event)"></button></ion-nav-buttons></ion-nav-bar><ion-content has-header="true"><div><ion-list><ion-item ng-repeat="item in items" class="item-icon-left" ng-click="openDetailModal(item)"><i ng-show="item.annullato_servizi==1" class="icon ion-close-circled"></i> <i ng-show="item.annullato_servizi==0" class="icon ion-checkmark"></i> <span class="itemTopRight">{{item.data_servizi | date:\'dd/MM/yyyy\' }}</span><p><b>({{item.id}}) {{item.nome_breve_utenti}}</b></p><span class="itemTopRight">{{item.da_ora_servizi | date:\'HH:mm\' }} {{item.a_ora_servizi | date:\'HH:mm\' }}</span><p>{{item.elenco_volontari}}</p><p>{{item.note_servizi}}</p><p>{{item.rapporto_servizi }}</p><ion-option-button class="button-positive" ng-click="editItem(item.id)">Dettagli</ion-option-button></ion-item></ion-list></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/ListItemRelazioniM.html',
    '<ion-view class="" title="Elenco relazioni di servizio" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons><ion-nav-buttons side="right"><button class="button button-icon ion-more" ng-click="popover.show($event)"></button></ion-nav-buttons></ion-nav-bar><ion-content has-header="true"><div><ion-list><ion-item ng-repeat="item in items" class="item-icon-left"><i ng-show="item.annullato_relazioni==1" class="icon ion-close-circled"></i> <i ng-show="item.annullato_relazioni==0" class="icon ion-checkmark"></i> <span class="itemTopRight">{{item.data_relazioni | date:\'dd/MM/yyyy\' }}</span><p><b>{{item.nome_breve_utenti}}</b></p><span class="itemTopRight">{{item.da_ora_relazioni | date:\'HH:mm\' }} {{item.a_ora_relazioni | date:\'HH:mm\' }}</span><p>{{item.elenco_volontari}}</p><span class="itemTopRight">{{item.id}}/{{item.id_servizi}}</span><p>Auto: {{item.auto_relazioni}}</p><p>Note: {{item.note_relazioni}}</p><ion-option-button class="button-positive" ng-click="viewItem(item.id)">Dettagli</ion-option-button></ion-item></ion-list></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/aboutM.html',
    '<ion-view class="item-dark" title="Informazioni" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons></ion-nav-bar><ion-content has-header="true" padding="true" class="bgMain"><div class="list card"><div class="item"><img src="img/cocca2logo.jpg"></div><div class="item"><h1>Provincia di Rimini</h1><h2>Gestione Servizi Volontari</h2></div><a class="item item-icon-left assertive" href="#"><i class="icon ion-code-download"></i> Ruggero Ruggeri</a><div class="item"><p>Schermo intero per migliorare la visibilità (per Chrome/Firefox/Safari)</p><div class="button-bar"><button id="btn-testconnection" class="button  button-positive" ng-click="fullscreenOn()">Abilita</button> <button id="btn-testconnection" class="button  button-positive" ng-click="fullscreenOff()">Disabilita</button></div></div><div class="item"><button id="btn-testconnection" class="button button-block button-positive" ng-click="test_connection()">Test connection</button></div><div class="item">Utente: {{navTitle}}<br>$location.protocol() = <span ng-bind="{{$location.protocol()}}"></span><br>$location.host() = <span ng-bind="$location.host()"></span><br>$location.port() = <span ng-bind="$location.port()"></span><br>$location.path() = <span ng-bind="$location.path()"></span><br>$location.search() = <span ng-bind="$location.search()"></span><br>$location.hash() = <span ng-bind="$location.hash()"></span><br>base_url = <span>{{base_url}}</span><br></div></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/detailModal.html',
    '<ion-modal-view><ion-header-bar><h1 class="title">Dettaglio preventivo di servizio</h1><button class="button  button-positive" ng-click="closeDetailModal()">Chiudi</button></ion-header-bar><ion-content has-header="true"><div class="padding"><label class="item item-text-wrap"><b>Associazione:</b><br>{{currentItemDetail.nome_breve_utenti}}</label> <label class="item item-text-wrap"><b>Volontari:</b><br>{{currentItemDetail.elenco_volontari}}</label> <label class="item item-input"><div class="input-label"><b>Data servizio:</b></div><div class="input-label">{{currentItemDetail.data_servizi}}</div></label> <label class="item item-input"><div class="input-label"><b>Dalle ore:</b></div><div class="input-label">{{currentItemDetail.da_ora_servizi}}</div></label> <label class="item item-input"><div class="input-label"><b>Alle ore:</b></div><div class="input-label">{{currentItemDetail.a_ora_servizi}}</div></label> <label class="item item-text-wrap"><b>Località:</b><br>{{currentItemDetail.note_servizi}}</label> <label class="item item-text-wrap"><b>Motivazioni:</b><br>{{currentItemDetail.rapporto_servizi}}</label></div></ion-content></ion-modal-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/dialogM.html',
    '<div class="modal-header"><h3>{{dialogOptions.headerText}}</h3></div><div class="modal-body"><p>{{dialogOptions.bodyText}}</p></div><div class="modal-footer"><button type="button" class="btn" data-ng-click="dialogOptions.close()">{{dialogOptions.closeButtonText}}</button> <button class="btn btn-primary" data-ng-click="dialogOptions.callback();">{{dialogOptions.actionButtonText}}</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/fancy-select-items.html',
    '<ion-view class="fancy-select-items modal"><ion-header-bar class="bar-positive"><button ng-click="hideItems()" class="button button-positive button-icon ion-ios7-arrow-back"></button><h1 class="title">{{headerText}}</h1><button ng-click="validate()" class="button button-positive button-icon ion-checkmark"></button></ion-header-bar><ion-content><div class="list"><ion-toggle ng-repeat="item in items" ng-if="multiSelect" ng-checked="item.checked" ng-model="item.checked" class="item item-text-wrap">{{item.text}}</ion-toggle><label ng-repeat="item in items" ng-if="!multiSelect" class="item item-text-wrap" ng-click="validateSingle(item)"><div class="fancy-select-icon" ng-if="item.icon != null"><i class="icon-{{item.text}}" style="background-image: url({{item.icon}})"></i></div>{{item.text}}</label></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/fancy-select.html',
    '<label class="item item-input item-text-wrap item-stacked-label item-icon-right" ng-click="showItems($event)"><span class="input-label">{{labelText}}</span><p>{{text}}</p><i class="icon ion-ios7-arrow-right"></i></label>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/helpM.html',
    '<ion-view class="item-dark" title="Guida" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="right"><button class="button button-icon button-clear ion-log-out" ng-click="goto_login()"></button></ion-nav-buttons></ion-nav-bar><ion-content has-header="true" padding="true" class="bgMain"><h3>Guida</h3><p>Qui di seguito si trovano un elenco delle schermate principali dell\'applicazione con la descrizione delle funzioni principali</p><h3>Schermata di accesso</h3><img style="width:100%; height:100%;" src="img/guida1ok.jpg"><h3>Visualizzazione liste</h3><img style="width:100%; height:100%;" src="img/guida2ok.jpg"><h3>Schermata inserimento dati</h3><img style="width:100%; height:100%;" src="img/guida3ok.jpg"> <button class="button button-block button-positive" ng-click="goto_login()">Vai alla pagina di inizio</button></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/loginM.html',
    '<ion-view title="{{navTitle}}" left-buttons="leftButtons" class="bgMain"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons></ion-nav-bar><ion-content><div ng-if="!currentUser"><form id="loginform" class="form-horizontal" role="form" ng-submit="login(credentials)" novalidate=""><p>&nbsp;</p><div class="list"><label class="item item-text-wrap item-thumbnail-left"><img src="img/cocca2logo.jpg"><p>Applicazione per la gestione dei servizi dei volontari della Polizia Provinciale. Versione Mobile.</p></label> <label class="item item-input"><span class="input-label">Utente:</span> <input type="text" ng-model="credentials.username" placeholder="username"></label> <label class="item item-input"><span class="input-label">Password:</span> <input type="password" ng-model="credentials.password" placeholder="password"></label></div><div class="padding"><button class="button button-block button-positive" type="submit">Accesso</button> <a href="#/menu/help" class="button button-block button-balanced">Guida</a></div></form></div><div ng-if="currentUser"><form id="loginform" class="form-horizontal" role="form" ng-submit="logout(credentials)" novalidate=""><div class="list"><label class="item item-text-wrap"><p>Utente autenticato : {{currentUser}}</p></label></div><div class="padding"><button type="submit" id="btn-login" class="button button-block button-positive">Disconnetti</button></div></form></div><div class="item"><p><b>Visualizzazione intero (per Chrome/Firefox/Safari)</b></p><div class="button-bar"><button id="btn-fullOn" class="button icon-left ion-ios7-monitor button-positive" ng-click="fullscreenOn()">Abilita</button> <button id="btn-fullOff" class="button icon-right ion-ios7-monitor-outline button-positive" ng-click="fullscreenOff()">Disabilita</button></div></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/menuM.html',
    '<ion-side-menus><fade-bar></fade-bar><ion-pane ion-side-menu-content=""><ion-nav-bar type="bar-assertive"></ion-nav-bar><ion-nav-view name="menuContent"></ion-nav-view></ion-pane><ion-side-menu side="left" class="dark-bg"><header class="bar bar-header bar-positive"><h1 class="title">GVPR</h1></header><ion-content has-header="true"><ul><a href="#/menu/home" class="item item-icon-left item-dark"><i class="icon ion-home"></i>Home</a> <a href="#/menu/home" class="item item-icon-left item-dark menu-close"><i class="icon ion-home"></i>Home</a> <a href="#/menu/list" class="item item-icon-left item-dark menu-close"><i class="icon ion-search"></i>Preventivi</a> <a href="#/menu/listRelazioni" class="item item-icon-left item-dark menu-close"><i class="icon ion-settings"></i>Relazioni</a> <a href="#/menu/report" class="item item-icon-left item-dark menu-close"><i class="icon ion-document-text"></i>Riepiloghi</a> <a href="#/menu/about" class="item item-icon-left item-dark menu-close"><i class="icon ion-information"></i>Info</a> <a href="#/menu/help" class="item item-icon-left item-dark menu-close"><i class="icon ion-help"></i>Guida</a></ul></ion-content></ion-side-menu></ion-side-menus>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/reportM.html',
    '<ion-view class="item-calm" title="Selezione Riepilogo" left-buttons="leftButtons" right-buttons="rightButtons"><ion-nav-bar class="bar-royal"><ion-nav-buttons side="left"><button class="button button-icon button-clear ion-navicon" ng-click="toggleLeft()"></button></ion-nav-buttons></ion-nav-bar><ion-content><div class="padding"><p>Filtri di ricerca:</p><div class="controls"><label class="item item-input item-select"><div class="input-label">Tipo:</div><select ng-model="item.tipo_report" class="form-control"><option value="1" selected="">Calendario preventivo - 1</option><option value="2">Relazione di servizio - 2</option><option value="4">Relazione di servizio - 4 - singola</option><option value="3">Repilogo ore di servizio - 3</option><option value="5">Stampa elenco volontari - 5</option></select></label> <label class="item item-input item-select"><div class="input-label">Associazione:</div><select ng-model="item.id_utenti" class="form-control" ng-options="i.id_utenti as i.nome_breve_utenti for i in utentiList"></select></label> <label class="item item-input"><div class="input-label">Data servizio</div><input type="date" ng-model="item.data_servizi"></label><div class="item item-input-inset"><button class="button button-positive button-full" ng-click="build_report()">Crea la stampa</button></div><div ng-show="showDownloadButton"><a class="button button-full button-energized" href="{{showDownloadUrl}}">{{showDownloadButtonText}}</a></div><div ng-show="showDownloadButton"><a class="button button-full button-energized" ng-click="view_pdf()">Visualizza PDF (nuova finestra)</a></div><p>{{showGoogleViewUrl}}</p></div></div></ion-content></ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/sortModal.html',
    '<ion-modal-view><ion-header-bar><h1 class="title">Opzioni di ricerca</h1><button class="button button-clear button-positive" ng-click="closeSortModal()">Chiudi</button></ion-header-bar><ion-content has-header="true"><div class="padding"><p>Filtri di ricerca:</p><div class="controls"><label class="item item-input item-select"><div class="input-label">Associazione:</div><select class="form-control" ng-model="id_utenti_selezione" ng-options="i.id_utenti as i.nome_breve_utenti for i in utentiList"></select></label></div><div class="item item-input-inset"><button class="button button-positive" ng-click="saveSort()">Applica filtro</button></div></div></ion-content></ion-modal-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('MyApp');
} catch (e) {
  module = angular.module('MyApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/testM.html',
    '<div class="container"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">Opzioni di ricerca</h3></div><div class="panel-body"><form class="form-inline"><div class="controls"><label class="control-label" for="textinput">Associazione:</label><select class="form-control" ng-model="id_utenti_selezione" ng-options="i.id_utenti as i.nome_breve_utenti for i in utentiList"></select><label class="control-label" for="textinput">Data:</label> <input type="text" class="form-control" datepicker-popup="dd/MM/yyyy" ng-model="data_servizi_selezione" is-open="openedPopupDate" ng-required="true" ng-click="popupDate($event)" close-text="Close"> <button type="submit" class="btn">Filtra!</button></div></form></div></div></div><div class="container"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">Elenco servizi</h3></div><div class="panel-body"><table class="table table-hover" id="dev-table"><thead><tr><th>#id</th><th class="hidden-xs hidden-sm">Associazione</th><th>Volontario</th><th>Data</th><th>Dalle ore</th><th>Alle ore</th></tr></thead><tbody><tr ng-repeat="item in items" ng-class="{\'danger\' : item.annullato_servizi == 1 }"><td ng-show="item.annullato_servizi">-</td><td ng-show="!item.annullato_servizi"><a ng-click="editItem(item.id_servizi)">{{item.id_servizi}}</a></td><td class="hidden-xs hidden-sm">{{item.nome_breve_utenti}}</td><td>{{item.cognome_volontari}} {{item.nome_volontari}}</td><td>{{item.data_servizi | date:\'dd/MM/yyyy\' }}</td><td>{{item.da_ora_servizi | date:\'HH:mm\' }}</td><td>{{item.a_ora_servizi | date:\'HH:mm\' }}</td></tr></tbody></table><div ng-show="totalItems == 0"><h3>Nessun dato trovato, cambiare i dati di ricerca.</h3></div><pagination ng-model="currentPage" total-items="totalItems" items-per-page="pageSize" ng-change="selectPage()"></pagination></div></div></div><hr><script type="text/ng-template" id="myModalContent.html"><div class="modal-header"> <h3 class="modal-title">I\'m a modal!</h3> </div> <div class="modal-body"> <ul> <li ng-repeat="item in items"> <a ng-click="selected.item = item">{{ item }}</a> </li> </ul> Selected: <b>{{ selected.item }}</b> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-click="ok()">OK</button> <button class="btn btn-warning" ng-click="cancel()">Cancel</button> </div></script><button class="btn btn-default" ng-click="open()">Open me!</button> <button class="btn btn-default" ng-click="open(\'lg\')">Large modal</button> <button class="btn btn-default" ng-click="open(\'sm\')">Small modal</button><div ng-show="selected">Selection from a modal: {{ selected }}</div>');
}]);
})();
