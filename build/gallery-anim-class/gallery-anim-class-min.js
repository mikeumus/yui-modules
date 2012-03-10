YUI.add("gallery-anim-class",function(b){var i=["top","bottom","left","right","width","height","maxHeight","maxWidth","minHeight","minWidth","color","fontSize","fontSizeAdjust","fontWeight","textIndent","textShadow","wordSpacing","backgroundColor","backgroundPosition","backgroundOrigin","backgroundSize","outlineColor","outlineWidth","marginTop","marginRight","marginBottom","marginLeft","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","borderSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","zIndex","opacity","boxShadow","letterSpacing","lineHeight","markerOffset","orphans","widows","size","fillOpacity","outlineOffset","floodColor","floodOpacity","lightingColor","stopColor","stopOpacity","stroke","strokeDashoffset","strokeMiterlimit","strokeOpacity","strokeWidth"];function d(){if(!b.Anim.behaviors.outlineColor){b.Anim.behaviors.outlineColor=b.Anim.behaviors.color;}}function g(k){return b.map(i,function(l){return k.getStyle(l);});}function e(k){return/[#0-9]/.test(k);}function c(k,m,l){if(l.cssClass){k.removeClass(l.cssClass);}if(m.cssClass){k.addClass(m.cssClass);}}function f(k,m,l){if(m.cssClass){k.removeClass(m.cssClass);}if(l.cssClass){k.addClass(l.cssClass);}}var a=b.Anim.prototype._start;b.Anim.prototype._start=function(){var l=this.get("node"),o=this.get("from")||{},n=this.get("to")||{};d();delete this._class_diff_attr;if(o.cssClass||n.cssClass){f(l,o,n);var k=g(l);c(l,o,n);var m=g(l);if(this.get("reverse")){f(l,o,n);}this._class_diff_attr={fromClass:o.cssClass,from:[],toClass:n.cssClass,to:[]};b.each(k,function(r,q){var s=m[q];if(r!==s){var p=i[q];if(!o[p]&&e(s)){this._class_diff_attr.from.push(p);o[p]=s;}if(!n[p]&&e(r)){this._class_diff_attr.to.push(p);n[p]=r;}}},this);delete o.cssClass;this.set("from",o);delete n.cssClass;this.set("to",n);}a.apply(this,arguments);};var h=b.Anim.prototype._runFrame;b.Anim.prototype._runFrame=function(){var k=this.get("reverse");if(!k&&this._class_diff_attr&&this._class_diff_attr.fromClass){this.get("node").removeClass(this._class_diff_attr.fromClass);}else{if(k&&this._class_diff_attr&&this._class_diff_attr.toClass){this.get("node").removeClass(this._class_diff_attr.toClass);}}h.apply(this,arguments);};var j=b.Anim.prototype._end;b.Anim.prototype._end=function(){if(this._class_diff_attr){var k=this.get("node"),m=this.get("from")||{},l=this.get("to")||{};b.each(this._class_diff_attr.from,function(n){delete m[n];});m.cssClass=this._class_diff_attr.fromClass;this.set("from",m);b.each(this._class_diff_attr.to,function(n){delete l[n];k.setStyle(n,"");});l.cssClass=this._class_diff_attr.toClass;this.set("to",l);if(this.get("reverse")){c(k,m,l);}else{f(k,m,l);}}j.apply(this,arguments);};},"@VERSION@",{requires:["anim-base","node-style","gallery-funcprog"]});