YUI.add("gallery-log-filter",function(e,t){"use strict";e.LogFilter={addLevelFilter:function(t){var n=e.config.logFn;e.config.logFn=function(r,i,s){e.Array.indexOf(t,i)>=0&&n.apply(this,arguments)}},addFilter:function(t){var n=e.config.logFn;e.config.logFn=function(e,r,i){t.call(this,e,r,i)&&n.apply(this,arguments)}}}},"@VERSION@",{requires:[""]});
