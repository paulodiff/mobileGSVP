window.PRELOADER = function(a){var b;return b=function(){function b(a){var b,c;for(b in a)c=a[b],this.options[b]=c}return b.prototype.options={complete:function(){},progress:function(){},threads:1},b.prototype.getFile=function(b,c){var d,e,f,g,h,i,j,k;for(null==c&&(c=""),g=b.split("/"),e="",h=a,k=g.slice(0,g.length-1),i=0,j=k.length;j>i;i++){if(f=k[i],!(h=h[f]))return c;e+=f+"/"}return(d=h[g[g.length-1]])?e+d:c},b.prototype.load=function(){var b,c,d,e,f,g,h,i,j,k=this;for(this.startLoading=new Date,h=function(a){var b,c;return b=[],(c=function(a,d){var e,f,g;for(f in d)e=d[f],"string"==typeof e?b.push(a+e):(g=a+f+"/",c(g,e));return b})("",a)}(a),e={index:0,procent:0,getPersent:function(){return this.procent+=1,100*this.procent/h.length},next:function(){var a;return h.length<=this.index?null:(a=h[this.index],this.index+=1,a)}},f=this.options.threads-1,b=0,c=function(){return b>=f&&k.options.complete(),b+=1},this.startLoading=new Date,j=[],d=g=0,i=this.options.threads-1;i>=0?i>=g:g>=i;d=i>=0?++g:--g)j.push(this.loadImage(d,e,c));return j},b.prototype.getImageObject=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;if(null==this._getImageObject&&(this._getImageObject={}),e=this._getImageObject[a]||(this._getImageObject[a]={img:new Image,fn:null}),d=["load","error"],null!=e.fn)if(e.img.removeEventListener)for(f=0,j=d.length;j>f;f++)c=d[f],e.img.removeEventListener(c,e.fn,!1);else if(img.detachEvent)for(g=0,k=d.length;k>g;g++)c=d[g],e.img.detachEvent("on"+c,e.fn);if(e.fn=b,e.img.addEventListener)for(h=0,l=d.length;l>h;h++)c=d[h],e.img.addEventListener(c,e.fn,!1);else if(e.img.attachEvent)for(i=0,m=d.length;m>i;i++)c=d[i],e.img.attachEvent("on"+c,e.fn);return e.img},b.prototype.loadImage=function(a,b,c){var d,e,f=this;return(e=b.next())?(d=this.getImageObject(a,function(e){var g;return g=null!=e?e.type:void 0,f.options.progress(b.getPersent(),d.src,g,new Date-f.startLoading),f.loadImage(a,b,c)}),d.src=e):c()},b}()};; window.PRELOADER=window.PRELOADER({"D:":{"tmp001":{"SENCHA":{"MobileV_IONIC":{"myApp2":{"www":{"img":{"ionic.png":"ionic.png","logo.png":"logo.png","zenbg-1.png":"zenbg-1.png","zenbg-2.png":"zenbg-2.png","cocca.jpg":"cocca.jpg","cocca10k.jpg":"cocca10k.jpg","cocca15k.jpg":"cocca15k.jpg","cocca2.jpg":"cocca2.jpg","cocca2logo.jpg":"cocca2logo.jpg","guida1.jpg":"guida1.jpg","guida1ok.jpg":"guida1ok.jpg","guida2.jpg":"guida2.jpg","guida2ok.jpg":"guida2ok.jpg","guida3.jpg":"guida3.jpg","guida3ok.jpg":"guida3ok.jpg","logo2.jpg":"logo2.jpg"}}}}}}}});