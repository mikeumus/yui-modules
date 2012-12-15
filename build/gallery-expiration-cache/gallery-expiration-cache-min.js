YUI.add("gallery-expiration-cache",function(e,t){function n(t){this._store=t.store||new e.InstanceManager,this._meta=t.meta||r,this._expire=e.Lang.isNumber(t.expire)?e.rbind(i,null,t.expire):t.expire,this._stats=t.stats?s():null,e.Lang.isFunction(t.stats)&&(this._stats_key_meta=t.stats)}function r(){return(new Date).getTime()}function i(e,t,n){var r=(new Date).getTime()-e;return r>n}function s(){return{gets:0,keys:{}}}function o(e,t){e[t]||(e[t]={puts:0,gets:0})}n.prototype={get:function(e){var t=this._store.get(e);if(t&&this._expire(t.meta,t.data))this._store.remove(e);else if(t)return this._stats&&(this._stats.gets++,o(this._stats.keys,e),this._stats.keys[e].gets++),t.data},put:function(e,t){var n={data:t,meta:this._meta(t)};return this._store.put(e,n)?(this._stats&&(o(this._stats.keys,e),this._stats.keys[e].puts++,this._stats_key_meta&&this._stats_key_meta(e,t,this._stats.keys[e])),!0):!1},replace:function(e,t){var n=this.remove(e);return this.put(e,t),n},remove:function(e){var t=this._store.remove(e);if(t)return t.data},clear:function(){this._store.clear()},clean:function(){e.each(this._store.keys(),this.get,this)},dumpStats:function(){var e=this._stats;return this._stats=s(),e}},e.ExpirationCache=n},"@VERSION@",{requires:["gallery-instancemanager"]});
