YUI.add("gallery-mru-cache",function(e,t){function n(t){this._metric_fn=t.metric,this._limit=t.limit,this._meta=t.meta,this._stats=t.stats?r():null,e.Lang.isFunction(t.stats)&&(this._stats_key_meta=t.stats),this.clear()}function r(){return{gets:0,keys:{}}}function i(e,t){e[t]||(e[t]={puts:0,gets:0})}n.prototype={get:function(e){var t=this._store[e];if(t)return this._mru.prepend(t.mru),this._stats&&(this._stats.gets++,i(this._stats.keys,e),this._stats.keys[e].gets++),t.data},put:function(t,n){var r=!e.Lang.isUndefined(this._store[t]);if(r)return!1;var s={data:n,mru:this._mru.prepend(t)};this._meta&&(s.meta=this._meta(n)),this._store[t]=s,this._metric+=this._metric_fn(n);while(this._metric>this._limit)this.remove(this._mru.tail().value);return this._stats&&(i(this._stats.keys,t),this._stats.keys[t].puts++,this._stats_key_meta&&this._stats_key_meta(t,n,this._stats.keys[t])),!0},replace:function(e,t){var n=this.remove(e);return this.put(e,t),n},remove:function(e){var t=this._store[e];delete this._store[e];if(t)return this._mru.remove(t.mru),this._metric-=this._metric_fn(t.data),t.data},clear:function(){this._store={},this._mru=new e.LinkedList,this._metric=0},dumpStats:function(){var e=this._stats;return this._stats=r(),e}},e.MRUCache=n},"@VERSION@",{requires:["gallery-linkedlist"]});
