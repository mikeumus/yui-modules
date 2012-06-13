YUI.add("gallery-input-calendar-sync",function(e){function d(f){d.superclass.constructor.call(this,f);}d.NAME="InputCalendarSyncPlugin";d.NS="calendarSync";d.ATTRS={calendar:{validator:function(f){return(f instanceof e.Calendar);}}};function c(){var h=this.get("host"),j=this.get("calendar"),i=e.Lang.trim(h.get("value"));if(i){try{this.ignore_selection_change=true;var f=e.DateTimeUtils.normalize(e.DateTimeUtils.parseDate(i),{hour:0,minute:0});j.deselectDates();j.selectDates(f.date);j.set("date",f.date);}catch(g){}finally{this.ignore_selection_change=false;}}b.call(this);}function a(){if(!this.ignore_selection_change){this.get("host").focus();b.call(this);}}function b(){var f=this.get("calendar").get("selectedDates")[0];this.get("host").set("value",e.DateTimeUtils.formatDate(f));}e.extend(d,e.Plugin.Base,{initializer:function(f){var g=this.get("host");this.change_handle=g.on("change",c,this);this.cal_handle=this.get("calendar").on("selectionChange",a,this);this.get("calendar").set("selectionMode","single");c.call(this);},destructor:function(){this.change_handle.detach();this.cal_handle.detach();}});e.namespace("Plugin");e.Plugin.InputCalendarSync=d;},"@VERSION@",{requires:["node-pluginhost","plugin","gallery-datetime-utils","calendar"]});