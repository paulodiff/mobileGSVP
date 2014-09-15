#Gestione Servizi Volontari Provincia di Rimini - Versione Mobile

##Descrizione

Versione Mobile della gestione dei servizi dei volontari.
E' stato usato il Ionic Framework.
La versione mobile utilizza lo stesso ambiente della versione Desktop.

Come metterlo in produzione:

// ottimizziazioni

* gulp template2  : prepare il file template.js che precarica tutti i template html
* gulp compress : comprime tutti *.js che compongono l'applicazione
                : esegue il preprocess e sostituisce alcuni valori per la produzione
                  elimina il login automatico 
                  cambia url di produzione


- *NO* OLD Modificare la base_url/login in loginControllers.js (NON SERVE)
- Lanciare gulp production
- Copiare le cartelle dist/js e dist/partials
- *NO* Modificare index.html 
- GIT-UPDATE.BAT (upload to GITHUB)

##Informazioni ed articoli di riferimento

IONIC Framework
http://ionicframework.com/

TICK LIST - Ionic tick list controller
http://www.bjoernacker.de/javascript/ionic-tick-list-controller/
http://codepen.io/BMA73/pen/HAaqF/

Cool select Ionic
http://codepen.io/mhartington/pen/CImqy

Page Preloading Effect | Codrops
http://tympanus.net/codrops/2014/08/05/page-preloading-effect/

Best practice build app - Ionic
http://modernweb.com/2014/07/28/best-practices-building-angular-js-apps/

AngulaJs show case
http://angular-js.in/

Background Generator
http://mudcu.be/

Full Screen
http://www.html5rocks.com/en/mobile/fullscreen/

Preload images
http://forum.ionicframework.com/t/how-can-i-preload-content-and-images/4023/5

Preload partials
http://stackoverflow.com/questions/12346690/is-there-a-way-to-make-angularjs-load-partials-in-the-beginning-and-not-at-when
http://brainoverflow.net/preloading-images-with-angularjs-directives/

Framework gulp
http://netengine.com.au/blog/gulp-and-angularjs-a-love-story-or-the-old-wheel-was-terrible-check-out-my-new-wheel/

AngularForm
http://www.yearofmoo.com/2014/09/taming-forms-in-angularjs-1-3.html#rendering-error-messages

Javascript API for OAuth2 authentication and REST services
http://adodson.com/hello.js/#core-methods

Gulp 
http://jb.demonte.fr/blog/production-package-with-gulp-js/

## Uso di GIT
http://rogerdudler.github.io/git-guide/index.it.html

```bash
git init
git remote add origin https://USERNAME:PASSWORD@github.com/USERNAME/PROJECTNAME.git
.gitignore (contiene le cartelle e file che devono essere esclusi)
git add .
git commit -m "commento"
git push origin
```

## How to use this template

This template does not work on its own*. It is missing the Ionic library, and AngularJS.
To use this, either create a new ionic project using the ionic node.js utility, or copy and paste this into an existing Cordova project and download a release of Ionic separately.

### With the Ionic tool:

Take the name after `ionic-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myApp sidemenu
```

Then, to run it, cd into `myApp` and run:

```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

Substitute ios for android if not on a Mac, but if you can, the ios development toolchain is a lot easier to work with until you need to do anything custom to Android.

## Demo
http://plnkr.co/edit/0RXSDB?p=preview


