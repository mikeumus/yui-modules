YUI.add("gallery-layout-datatable",function(e,t){"use strict";function n(e){n.superclass.constructor.call(this,e)}n.NAME="PageLayoutDataTableModulePlugin",n.NS="layout",n.ATTRS={layout:{value:null,writeonce:!0}},e.extend(n,e.Plugin.Base,{initializer:function(t){this.afterHostMethod("render",function(){var t=this.get("host"),n=this.get("layout"),r=t.get("boundingBox").ancestor("."+e.PageLayout.module_body_class);r.generateID(),n.on("beforeResizeModule",function(e){e.bd.get("id")==r.get("id")&&e.height=="auto"&&(t.set("height","auto"),t.set("scrollable","x"))}),n.on("afterResizeModule",function(e){e.bd.get("id")==r.get("id")&&(t.set("height",e.height+"px"),t.set("scrollable",!0))})})}}),e.namespace("Plugin"),e.Plugin.PageLayoutDataTableModule=n},"@VERSION@",{requires:["gallery-layout","datatable-scroll","plugin"]});
