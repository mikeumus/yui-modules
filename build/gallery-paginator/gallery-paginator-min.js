YUI.add("gallery-paginator",function(e,t){"use strict";function n(e){n.superclass.constructor.call(this,e)}e.mix(n,{NAME:"paginator",ID_BASE:"yui-pg-",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{},isNumeric:function(e){return isFinite(+e)},toNumber:function(e){return isFinite(+e)?+e:null}},!0),n.ATTRS={rowsPerPage:{value:0,validator:n.isNumeric,setter:n.toNumber},totalRecords:{value:0,validator:n.isNumeric,setter:n.toNumber},recordOffset:{value:0,validator:function(e){var t=this.get("totalRecords");return n.isNumeric(e)?(e=+e,t===n.VALUE_UNLIMITED||t>e||t===0&&e===0):!1},setter:n.toNumber},initialPage:{value:1,validator:n.isNumeric,setter:n.toNumber},template:{value:n.TEMPLATE_DEFAULT,validator:e.Lang.isString},alwaysVisible:{value:!0,validator:e.Lang.isBoolean},id:{value:e.guid(),readOnly:!0}},e.extend(n,e.Widget,{_batch:!1,_pageChanged:!1,_state:null,initializer:function(e){var t=n.VALUE_UNLIMITED,r,i,s,o;this._selfSubscribe(),r=this.get("initialPage"),i=this.get("totalRecords"),s=this.get("rowsPerPage"),r>1&&s!==t&&(o=(r-1)*s,(i===t||o<i)&&this.set("recordOffset",o))},_selfSubscribe:function(){this.after("totalRecordsChange",this.updateVisibility,this),this.after("alwaysVisibleChange",this.updateVisibility,this),this.after("totalRecordsChange",this._handleStateChange,this),this.after("recordOffsetChange",this._handleStateChange,this),this.after("rowsPerPageChange",this._handleStateChange,this),this.after("totalRecordsChange",this._syncRecordOffset,this)},renderUI:function(){this._renderTemplate(this.get("contentBox"),this.get("template"),n.ID_BASE+this.get("id"),!0),this.updateVisibility()},_renderTemplate:function(e,t,n,r){if(!e)return;e.setStyle("display","none"),e.addClass(this.getClassName());var i=this.getClassName("ui");e.set("innerHTML",t.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="'+i+" "+i+'-$1"></span>')),e.all("span."+i).each(function(e){this.renderUIComponent(e,n)},this),r||e.setStyle("display","")},renderUIComponent:function(t,r){var i=t.get("parentNode"),s=this.getClassName("ui"),o=(new RegExp(s+"-(\\w+)")).exec(t.get("className")),u=o&&n.ui[o[1]],a;e.Lang.isFunction(u)&&(a=new u(this),e.Lang.isFunction(a.render)&&i.replaceChild(a.render(r),t))},updateVisibility:function(t){var r=this.get("alwaysVisible"),i,s,o,u,a,f,l,c;if(!t||t.type==="alwaysVisibleChange"||!r){i=this.get("totalRecords"),s=!0,o=this.get("rowsPerPage"),u=this.get("rowsPerPageOptions");if(e.Lang.isArray(u))for(a=0,f=u.length;a<f;++a)l=u[a],c=e.Lang.isValue(l.value)?l.value:l,o=Math.min(o,c);i!==n.VALUE_UNLIMITED&&i<=o&&(s=!1),s=s||r,this.get("contentBox").setStyle("display",s?"":"none")}},getTotalPages:function(){var e=this.get("totalRecords"),t=this.get("rowsPerPage");return t?e===n.VALUE_UNLIMITED?n.VALUE_UNLIMITED:Math.ceil(e/t):null},hasPage:function(t){if(!e.Lang.isNumber(t)||t<1)return!1;var r=this.getTotalPages();return r===n.VALUE_UNLIMITED||r>=t},getCurrentPage:function(){var e=this.get("rowsPerPage");return!e||!this.get("totalRecords")?0:Math.floor(this.get("recordOffset")/e)+1},hasNextPage:function(){var e=this.getCurrentPage(),t=this.getTotalPages();return e&&(t===n.VALUE_UNLIMITED||e<t)},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null},hasPreviousPage:function(){return this.getCurrentPage()>1},getPreviousPage:function(){return this.hasPreviousPage()?this.getCurrentPage()-1:1},getPageRecords:function(t){e.Lang.isNumber(t)||(t=this.getCurrentPage());var r=this.get("rowsPerPage"),i=this.get("totalRecords"),s,o;if(!t||!r)return null;s=(t-1)*r;if(i!==n.VALUE_UNLIMITED){if(s>=i)return null;o=Math.min(s+r,i)-1}else o=s+r-1;return[s,o]},setPage:function(e,t){this.hasPage(e)&&e!==this.getCurrentPage()&&(t?this.set("recordOffset",(e-1)*this.get("rowsPerPage")):this.fire("changeRequest",this.getState({page:e})))},getRowsPerPage:function(){return this.get("rowsPerPage")},setRowsPerPage:function(e,t){n.isNumeric(e)&&+e>0&&+e!==this.get("rowsPerPage")&&(t?this.set("rowsPerPage",e):this.fire("changeRequest",this.getState({rowsPerPage:+e})))},getTotalRecords:function(){return this.get("totalRecords")},setTotalRecords:function(e,t){n.isNumeric(e)&&+e>=0&&+e!==this.get("totalRecords")&&(t?this.set("totalRecords",e):this.fire("changeRequest",this.getState({totalRecords:+e})))},getStartIndex:function(){return this.get("recordOffset")},setStartIndex:function(e,t){n.isNumeric(e)&&+e>=0&&+e!==this.get("recordOffset")&&(t?this.set("recordOffset",e):this.fire("changeRequest",this.getState({recordOffset:+e})))},getState:function(e){function f(e,n,r){return e<=0||n===0?0:n===t||n>e?e-e%r:n-(n%r||r)}var t=n.VALUE_UNLIMITED,r=Math,i=r.max,s=r.ceil,o,u,a;return o={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()},o.recordOffset=f(this.get("recordOffset"),o.totalRecords,o.rowsPerPage),o.page=s(o.recordOffset/o.rowsPerPage)+1,e?(u={paginator:this,before:o,rowsPerPage:e.rowsPerPage||o.rowsPerPage,totalRecords:n.isNumeric(e.totalRecords)?i(e.totalRecords,t):+o.totalRecords},u.totalRecords===0?u.recordOffset=u.page=0:(a=n.isNumeric(e.page)?(e.page-1)*u.rowsPerPage:n.isNumeric(e.recordOffset)?+e.recordOffset:o.recordOffset,u.recordOffset=f(a,u.totalRecords,u.rowsPerPage),u.page=s(u.recordOffset/u.rowsPerPage)+1),u.records=[u.recordOffset,u.recordOffset+u.rowsPerPage-1],u.totalRecords!==t&&u.recordOffset<u.totalRecords&&u.records&&u.records[1]>u.totalRecords-1&&(u.records[1]=u.totalRecords-1),u):o},setState:function(t){if(e.Lang.isObject(t)){this._state=this.getState({}),t={page:t.page,rowsPerPage:t.rowsPerPage,totalRecords:t.totalRecords,recordOffset:t.recordOffset},t.page&&t.recordOffset===undefined&&(t.recordOffset=(t.page-1)*(t.rowsPerPage||this.get("rowsPerPage"))),this._batch=!0,this._pageChanged=!1;for(var n in t)t.hasOwnProperty(n)&&this.set(n,t[n]);this._batch=!1,this._pageChanged&&(this._pageChanged=!1,this._firePageChange(this.getState(this._state)))}},_syncRecordOffset:function(e){var t=e.newVal,r,i;e.prevVal!==t&&t!==n.VALUE_UNLIMITED&&(r=this.get("rowsPerPage"),r&&this.get("recordOffset")>=t&&(i=this.getState({totalRecords:e.prevVal,recordOffset:this.get("recordOffset")}),this.set("recordOffset",i.before.recordOffset),this._firePageChange(i)))},_handleStateChange:function(e){if(e.prevVal!==e.newVal){var t=this._state||{},n;t[e.type.replace(/^.+?:/,"").replace(/Change$/,"")]=e.prevVal,n=this.getState(t),n.page!==n.before.page&&(this._batch?this._pageChanged=!0:this._firePageChange(n))}},_firePageChange:function(t){if(e.Lang.isObject(t)){var n=t.before;delete t.before,this.fire("pageChange",{type:"pageChange",prevVal:t.page,newVal:n.page,prevState:t,newState:n})}}}),e.Paginator=n,n.ui.CurrentPageInput=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("pageInputClassChange",this.update,this)},n.ATTRS.pageInputClass={value:e.ClassNameManager.getClassName(n.NAME,"page-input"),validator:e.Lang.isString},n.ATTRS.pageInputTemplate={value:"{currentPage} of {totalPages}",validator:e.Lang.isString},n.ui.CurrentPageInput.prototype={destroy:function(){this.span.remove().destroy(!0),this.span=null,this.input=null,this.page_count=null},render:function(t){return this.span&&this.span.remove().destroy(!0),this.span=e.Node.create('<span id="'+t+'-page-input">'+e.substitute(this.paginator.get("pageInputTemplate"),{currentPage:'<input class="yui-page-input"></input>',totalPages:'<span class="yui-page-count"></span>'})+"</span>"),this.span.set("className",this.paginator.get("pageInputClass")),this.input=this.span.one("input"),this.input.on("change",this._onChange,this),this.input.on("key",this._onReturnKey,"down:13",this),this.page_count=this.span.one("span.yui-page-count"),this.update(),this.span},update:function(e){if(e&&e.prevVal===e.newVal)return;this.span.set("className",this.paginator.get("pageInputClass")),this.input.set("value",this.paginator.getCurrentPage()),this.input.set("disabled",this.paginator.get("disabled")),this.page_count.set("innerHTML",this.paginator.getTotalPages())},_onChange:function(e){this.paginator.setPage(parseInt(this.input.get("value"),10))},_onReturnKey:function(e){e.halt(!0),this.paginator.setPage(parseInt(this.input.get("value"),10))}},n.ui.CurrentPageReport=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("pageReportClassChange",this.update,this),e.after("pageReportTemplateChange",this.update,this)},n.ATTRS.pageReportClass={value:e.ClassNameManager.getClassName(n.NAME,"current"),validator:e.Lang.isString},n.ATTRS.pageReportTemplate={value:"({currentPage} of {totalPages})",validator:e.Lang.isString},n.ATTRS.pageReportValueGenerator={value:function(e){var t=e.getCurrentPage(),n=e.getPageRecords();return{currentPage:n?t:0,totalPages:e.getTotalPages(),startIndex:n?n[0]:0,endIndex:n?n[1]:0,startRecord:n?n[0]+1:0,endRecord:n?n[1]+1:0,totalRecords:e.get("totalRecords")}},validator:e.Lang.isFunction},n.ui.CurrentPageReport.sprintf=function(e,t){return e.replace(/\{([\w\s\-]+)\}/g,function(e,n){return n in t?t[n]:""})},n.ui.CurrentPageReport.prototype={span:null,destroy:function(){this.span.remove(!0),this.span=null},render:function(t){return this.span&&this.span.remove(!0),this.span=e.Node.create('<span id="'+t+'-page-report"></span>'),this.span.set("className",this.paginator.get("pageReportClass")),this.update(),this.span},update:function(e){if(e&&e.prevVal===e.newVal)return;this.span.set("className",this.paginator.get("pageReportClass")),this.span.set("innerHTML",n.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator)))}},n.ui.FirstPageLink=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("firstPageLinkLabelChange",this.rebuild,this),e.after("firstPageLinkClassChange",this.rebuild,this)},n.ATTRS.firstPageLinkLabel={value:"&lt;&lt; first",validator:e.Lang.isString},n.ATTRS.firstPageLinkClass={value:e.ClassNameManager.getClassName(n.NAME,"first"),validator:e.Lang.isString},n.ui.FirstPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(!0),this.span.remove(!0),this.current=this.link=this.span=null},render:function(t){var n=this.paginator,r=n.get("firstPageLinkClass"),i=n.get("firstPageLinkLabel");return this.link&&(this.link.remove(!0),this.span.remove(!0)),this.link=e.Node.create('<a href="#" id="'+t+'-first-link">'+i+"</a>"),this.link.set("className",r),this.link.on("click",this.onClick,this),this.span=e.Node.create('<span id="'+t+'-first-span">'+i+"</span>"),this.span.set("className",r),this.current=n.getCurrentPage()>1?this.link:this.span,this.current},update:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.current?this.current.get("parentNode"):null;this.paginator.getCurrentPage()>1&&!this.paginator.get("disabled")?t&&this.current===this.span&&(t.replaceChild(this.link,this.current),this.current=this.link):t&&this.current===this.link&&(t.replaceChild(this.span,this.current),this.current=this.span)},rebuild:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.paginator,n=t.get("firstPageLinkClass"),r=t.get("firstPageLinkLabel");this.link.set("className",n),this.link.set("innerHTML",r),this.span.set("className",n),this.span.set("innerHTML",r)},onClick:function(e){e.halt(),this.paginator.setPage(1)}},n.ui.ItemRangeDropdown=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("itemRangeDropdownClassChange",this.update,this)},n.ATTRS.itemRangeDropdownClass={value:e.ClassNameManager.getClassName(n.NAME,"ir-dropdown"),validator:e.Lang.isString},n.ATTRS.itemRangeDropdownTemplate={value:"{currentRange} of {totalItems}",validator:e.Lang.isString},n.ui.ItemRangeDropdown.prototype={destroy:function(){this.span.remove().destroy(!0),this.span=null,this.menu=null,this.page_count=null},render:function(t){return this.span&&this.span.remove().destroy(!0),this.span=e.Node.create('<span id="'+t+'-item-range">'+e.substitute(this.paginator.get("itemRangeDropdownTemplate"),{currentRange:'<select class="yui-current-item-range"></select>',totalItems:'<span class="yui-item-count"></span>'})+"</span>"),this.span.set("className",this.paginator.get("itemRangeDropdownClass")),this.menu=this.span.one("select"),this.menu.on("change",this._onChange,this),this.page_count=this.span.one("span.yui-item-count"),this.prev_page_count=-1,this.prev_page_size=-1,this.prev_rec_count=-1,this.update(),this.span},update:function(t){if(t&&t.prevVal===t.newVal)return;var n=this.paginator.getCurrentPage(),r=this.paginator.getTotalPages(),i=this.paginator.getRowsPerPage(),s=this.paginator.getTotalRecords();if(r!=this.prev_page_count||i!=this.prev_page_size||s!=this.prev_rec_count){var o=e.Node.getDOMNode(this.menu).options;o.length=0;for(var u=1;u<=r;u++){var a=this.paginator.getPageRecords(u);o[u-1]=new Option(a[0]+1+" - "+(a[1]+1),u)}this.page_count.set("innerHTML",s),this.prev_page_count=r,this.prev_page_size=i,this.prev_rec_count=s}this.span.set("className",this.paginator.get("itemRangeDropdownClass")),this.menu.set("selectedIndex",n-1),this.menu.set("disabled",this.paginator.get("disabled"))},_onChange:function(e){this.paginator.setPage(parseInt(this.menu.get("value"),10))}},n.ui.LastPageLink=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("lastPageLinkClassChange",this.rebuild,this),e.after("lastPageLinkLabelChange",this.rebuild,this)},n.ATTRS.lastPageLinkClass={value:e.ClassNameManager.getClassName(n.NAME,"last"),validator:e.Lang.isString},n.ATTRS.lastPageLinkLabel={value:"last &gt;&gt;",validator:e.Lang.isString},n.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,destroy:function(){this.link.remove(!0),this.span.remove(!0),this.na.remove(!0),this.current=this.link=this.span=this.na=null},render:function(t){var r=this.paginator,i=r.get("lastPageLinkClass"),s=r.get("lastPageLinkLabel"),o=r.getTotalPages();this.link&&(this.link.remove(!0),this.span.remove(!0),this.na.remove(!0)),this.link=e.Node.create('<a href="#" id="'+t+'-last-link">'+s+"</a>"),this.link.set("className",i),this.link.on("click",this.onClick,this),this.span=e.Node.create('<span id="'+t+'-last-span">'+s+"</span>"),this.span.set("className",i),this.na=e.Node.create('<span id="'+t+'-last-na"></span>');switch(o){case n.VALUE_UNLIMITED:this.current=this.na;break;case r.getCurrentPage():this.current=this.span;break;default:this.current=this.link}return this.current},update:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.current?this.current.get("parentNode"):null,r=this.link,i=this.paginator.getTotalPages();if(t){if(i===n.VALUE_UNLIMITED)r=this.na;else if(i===this.paginator.getCurrentPage()||this.paginator.get("disabled"))r=this.span;this.current!==r&&(t.replaceChild(r,this.current),this.current=r)}},rebuild:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.paginator,n=t.get("lastPageLinkClass"),r=t.get("lastPageLinkLabel");this.link.set("className",n),this.link.set("innerHTML",r),this.span.set("className",n),this.span.set("innerHTML",r)},onClick:function(e){e.halt(),this.paginator.setPage(this.paginator.getTotalPages())}},n.ui.NextPageLink=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("nextPageLinkClassChange",this.rebuild,this),e.after("nextPageLinkLabelChange",this.rebuild,this)},n.ATTRS.nextPageLinkClass={value:e.ClassNameManager.getClassName(n.NAME,"next"),validator:e.Lang.isString},n.ATTRS.nextPageLinkLabel={value:"next &gt;",validator:e.Lang.isString},n.ui.NextPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(!0),this.span.remove(!0),this.current=this.link=this.span=null},render:function(t){var n=this.paginator,r=n.get("nextPageLinkClass"),i=n.get("nextPageLinkLabel"),s=n.getTotalPages();return this.link&&(this.link.remove(!0),this.span.remove(!0)),this.link=e.Node.create('<a href="#" id="'+t+'-next-link">'+i+"</a>"),this.link.set("className",r),this.link.on("click",this.onClick,this),this.span=e.Node.create('<span id="'+t+'-next-span">'+i+"</span>"),this.span.set("className",r),this.current=n.getCurrentPage()===s?this.span:this.link,this.current},update:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.paginator.getTotalPages(),n=this.current?this.current.get("parentNode"):null;this.paginator.getCurrentPage()!==t&&!this.paginator.get("disabled")?n&&this.current===this.span&&(n.replaceChild(this.link,this.current),this.current=this.link):this.current===this.link&&n&&(n.replaceChild(this.span,this.current),this.current=this.span)},rebuild:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.paginator,n=t.get("nextPageLinkClass"),r=t.get("nextPageLinkLabel");this.link.set("className",n),this.link.set("innerHTML",r),this.span.set("className",n),this.span.set("innerHTML",r)},onClick:function(e){e.halt(),this.paginator.setPage(this.paginator.getNextPage())}},n.ui.PageLinks=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("pageLinksContainerClassChange",this.rebuild,this),e.after("pageLinkClassChange",this.rebuild,this),e.after("currentPageClassChange",this.rebuild,this),e.after("pageLinksChange",this.rebuild,this)},n.ATTRS.pageLinksContainerClass={value:e.ClassNameManager.getClassName(n.NAME,"pages"),validator:e.Lang.isString},n.ATTRS.pageLinkClass={value:e.ClassNameManager.getClassName(n.NAME,"page"),validator:e.Lang.isString},n.ATTRS.currentPageClass={value:e.ClassNameManager.getClassName(n.NAME,"current-page"),validator:e.Lang.isString},n.ATTRS.pageLinks={value:10,validator:n.isNumeric},n.ATTRS.pageLabelBuilder={value:function(e,t){return e},validator:e.Lang.isFunction},n.ui.PageLinks.calculateRange=function(e,t,r){var i=n.VALUE_UNLIMITED,s,o,u;return!e||r===0||t===0||t===i&&r===i?[0,-1]:(t!==i&&(r=r===i?t:Math.min(r,t)),s=Math.max(1,Math.ceil(e-r/2)),t===i?o=s+r-1:o=Math.min(t,s+r-1),u=r-(o-s+1),s=Math.max(1,s-u),[s,o])},n.ui.PageLinks.prototype={current:0,container:null,destroy:function(){this.container.remove(!0),this.container=null},render:function(t){return this.container&&this.container.remove(!0),this.container=e.Node.create('<span id="'+t+'-pages"></span>'),this.container.on("click",this.onClick,this),this.update({newVal:null,rebuild:!0}),this.container},update:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.paginator,r=t.getCurrentPage();if(this.current!==r||!r||e.rebuild){var i=t.get("pageLabelBuilder"),s=n.ui.PageLinks.calculateRange(r,t.getTotalPages(),t.get("pageLinks")),o=s[0],u=s[1],a="",f=t.get("disabled"),l;for(l=o;l<=u;++l)l===r?a+='<span class="'+t.get("currentPageClass")+" "+t.get("pageLinkClass")+'">'+i(l,t)+"</span>":f?a+='<span class="'+t.get("pageLinkClass")+' disabled" page="'+l+'">'+i(l,t)+"</span>":a+='<a href="#" class="'+t.get("pageLinkClass")+'" page="'+l+'">'+i(l,t)+"</a>";this.container.set("className",t.get("pageLinksContainerClass")),this.container.set("innerHTML",a)}},rebuild:function(e){e.rebuild=!0,this.update(e)},onClick:function(e){var t=e.target;t&&t.hasClass(this.paginator.get("pageLinkClass"))&&(e.halt(),this.paginator.setPage(parseInt(t.getAttribute("page"),10)))}},n.ui.PreviousPageLink=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("recordOffsetChange",this.update,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this.update,this),e.after("disabledChange",this.update,this),e.after("previousPageLinkLabelChange",this.update,this),e.after("previousPageLinkClassChange",this.update,this)},n.ATTRS.previousPageLinkClass={value:e.ClassNameManager.getClassName(n.NAME,"previous"),validator:e.Lang.isString},n.ATTRS.previousPageLinkLabel={value:"&lt; prev",validator:e.Lang.isString},n.ui.PreviousPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(!0),this.span.remove(!0),this.current=this.link=this.span=null},render:function(t){var n=this.paginator,r=n.get("previousPageLinkClass"),i=n.get("previousPageLinkLabel");return this.link&&(this.link.remove(!0),this.span.remove(!0)),this.link=e.Node.create('<a href="#" id="'+t+'-prev-link">'+i+"</a>"),this.link.set("className",r),this.link.on("click",this.onClick,this),this.span=e.Node.create('<span id="'+t+'-prev-span">'+i+"</span>"),this.span.set("className",r),this.current=n.getCurrentPage()>1?this.link:this.span,this.current},update:function(e){if(e&&e.prevVal===e.newVal)return;var t=this.current?this.current.get("parentNode"):null;this.paginator.getCurrentPage()>1&&!this.paginator.get("disabled")?t&&this.current===this.span&&(t.replaceChild(this.link,this.current),this.current=this.link):t&&this.current===this.link&&(t.replaceChild(this.span,this.current),this.current=this.span)},onClick:function(e){e.halt(),this.paginator.setPage(this.paginator.getPreviousPage())}},n.ui.RowsPerPageDropdown=function(e){this.paginator=e,e.on("destroy",this.destroy,this),e.after("rowsPerPageChange",this.update,this),e.after("totalRecordsChange",this._handleTotalRecordsChange,this),e.after("disabledChange",this.update,this),e.after("rowsPerPageDropdownClassChange",this.rebuild,this),e.after("rowsPerPageDropdownTitleChange",this.rebuild,this),e.after("rowsPerPageOptionsChange",this.rebuild,this)},n.ATTRS.rowsPerPageDropdownClass={value:e.ClassNameManager.getClassName(n.NAME,"rpp-options"),validator:e.Lang.isString},n.ATTRS.rowsPerPageDropdownTitle={value:"Rows per page",validator:e.Lang.isString},n.ATTRS.rowsPerPageOptions={value:[],validator:e.Lang.isArray},n.ui.RowsPerPageDropdown.prototype={select:null,all:null,destroy:function(){this.select.remove().destroy(!0),this.all=this.select=null},render:function(t){return this.select&&this.select.remove().destroy(!0),this.select=e.Node.create('<select id="'+t+'-rpp"></select>'),this.select.on("change",this.onChange,this),this.rebuild(),this.select},rebuild:function(t){var n=this.paginator,r=this.select,i=n.get("rowsPerPageOptions"),s=e.Node.getDOMNode(r).options,o,u,a,f,l;this.all=null,r.set("className",this.paginator.get("rowsPerPageDropdownClass")),r.set("title",this.paginator.get("rowsPerPageDropdownTitle"));for(f=0,l=i.length;f<l;++f)u=i[f],o=s[f]||r.appendChild(e.Node.create("<option/>")),a=e.Lang.isValue(u.value)?u.value:u,o.set("innerHTML",e.Lang.isValue(u.text)?u.text:u),e.Lang.isString(a)&&a.toLowerCase()==="all"?(this.all=o,o.set("value",n.get("totalRecords"))):o.set("value",a);while(s.length>i.length)r.get("lastChild").remove(!0);this.update()},update:function(t){if(t&&t.prevVal===t.newVal)return;var n=this.paginator.get("rowsPerPage")+"",r=e.Node.getDOMNode(this.select).options,i,s;for(i=0,s=r.length;i<s;++i)if(r[i].value===n){r[i].selected=!0;break}this.select.set("disabled",this.paginator.get("disabled"))},onChange:function(t){this.paginator.setRowsPerPage(parseInt(e.Node.getDOMNode(this.select).options[this.select.get("selectedIndex")].value,10))},_handleTotalRecordsChange:function(e){if(!this.all||e&&e.prevVal===e.newVal)return;this.all.set("value",e.newVal),this.all.get("selected")&&this.paginator.set("rowsPerPage",e.newVal)}},n.ui.ValidationPageLinks=function(e){n.ui.ValidationPageLinks.superclass.constructor.call(this,e),e.after("pageStatusChange",this.rebuild,this)};var r="yui3-has";n.ATTRS.pageStatus={value:[],validator:e.Lang.isArray},e.extend(n.ui.ValidationPageLinks,n.ui.PageLinks,{update:function(t){if(t&&t.prevVal===t.newVal)return;var i=this.paginator.getCurrentPage(),s='<span class="{link} {curr} {status}">{label}</span>',o='<a href="#" class="{link} {status}" page="{page}">{label}</a>',u='<span class="{link} disabled {status}" page="{page}">{label}</span>';if(this.current!==i||!i||t.rebuild){var a=this.paginator.get("pageLinkClass"),f=this.paginator.get("pageStatus"),l=this.paginator.get("pageLabelBuilder"),c=this.paginator.get("disabled"),h=n.ui.PageLinks.calculateRange(i,this.paginator.getTotalPages(),this.paginator.get("pageLinks")),p="";for(var d=h[0];d<=h[1];d++)p+=e.Lang.sub(d===i?s:c?u:o,{link:a,curr:d===i?this.paginator.get("currentPageClass"):"",status:f[d-1]?r+f[d-1]:"",page:d,label:l(d,this.paginator)});this.container.set("innerHTML",p)}}})},"@VERSION@",{skinnable:"true",requires:["widget","event-key","substitute"]});
