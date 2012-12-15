YUI.add("gallery-neon",function(e,t){"use strict";function n(e){n.superclass.constructor.call(this,e)}function r(){e.later(Math.round(Math.random()*1e3/(this.flicker_max-this.flicker_count)),this,i),this.node.setStyle("display","none")}function i(){this.flicker_count--;if(this.flicker_count>0){var t=this.get("easing"),n={r:t(this.flicker_count,parseInt(this.end_color[1],10),this.start_color[1]-this.end_color[1],this.flicker_max),g:t(this.flicker_count,parseInt(this.end_color[2],10),this.start_color[2]-this.end_color[2],this.flicker_max),b:t(this.flicker_count,parseInt(this.end_color[3],10),this.start_color[3]-this.end_color[3],this.flicker_max)};e.later(Math.round(Math.random()*1e3/this.flicker_count),this,r)}else var n={r:this.end_color[1],g:this.end_color[2],b:this.end_color[3]};n="rgb("+Math.round(n.r)+","+Math.round(n.g)+","+Math.round(n.b)+")",this.node.setStyle("color",n);var i=this.get("textShadow");i&&this.node.setStyle("textShadow",e.Lang.sub(i,{color:e.Color.toHex(n)})),this.node.setStyle("display",""),this.flicker_count===0&&this.node.fire("neon:finished")}function s(){if(!this._isHidden())return;var t=this.neon;t.node=this,t.flicker_max=Math.max(0,t.get("flickerCount")),t.flicker_count=t.flicker_max,t.start_color=e.Color.re_RGB.exec(e.Color.toRGB(t.get("backgroundColor"))),t.end_color=e.Color.re_RGB.exec(e.Color.toRGB(t.get("textColor"))),i.call(t)}n.NAME="NeonPlugin",n.NS="neon",n.ATTRS={backgroundColor:{validator:e.Lang.isString},textColor:{validator:e.Lang.isString},textShadow:{validator:e.Lang.isString},flickerCount:{value:10,validator:e.Lang.isNumber},easing:{value:e.Easing.easeIn,validator:e.Lang.isFunction}},e.extend(n,e.Plugin.Base,{initializer:function(e){var t=this.get("host");this.orig_show=t.show,t.show=s},destructor:function(){this.get("host").show=this.orig_show}}),e.namespace("Plugin"),e.Plugin.Neon=n},"@VERSION@",{requires:["node-style","node-pluginhost","anim-easing","plugin"]});
