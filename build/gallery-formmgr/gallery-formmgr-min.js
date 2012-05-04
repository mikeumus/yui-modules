YUI.add("gallery-formmgr",function(c){function h(l,k){k=k||{};h.superclass.constructor.call(this,k);this.form_name=l;this.status_node=c.one(k.status_node);this.enabled=true;this.default_value_map=k.default_value_map;this.validation={fn:{},regex:{}};this.validation_msgs={};this.has_messages=false;this.has_errors=false;this.button_list=[];this.user_button_list=[];this.has_file_inputs=false;}h.row_marker_class="formmgr-row";h.field_marker_class="formmgr-field";h.status_marker_class="formmgr-message-text";h.status_none_class="formmgr-status-hidden";h.status_success_class="formmgr-status-success";h.status_failure_class="formmgr-status-failure";h.row_status_prefix="formmgr-has";var f;var j;var i;function a(){if(!f){f=h.status_success_class+"|"+h.status_failure_class;}return f;}function d(){if(!j){j=h.row_status_prefix+"([^\\s]+)";}return j;}function b(){if(!i){i=new RegExp(c.Node.class_re_prefix+d()+c.Node.class_re_suffix);}return i;}h.getElementStatus=function(l){var k=c.one(l).get("className").match(b());return(k&&k.length>1?k[1]:false);};function e(k){if(c.Lang.isString(k)){return k.replace(/^#/,"");}else{if(k._node){return k.get("id");}else{return k.id;}}}function g(){var o=(this.button_list.length===0);for(var n=0;n<this.form.elements.length;n++){var r=this.form.elements[n];var m=r.tagName.toLowerCase();var p=(r.type?r.type.toLowerCase():null);if(o&&(p=="submit"||p=="reset"||m=="button")){this.button_list.push(r);}if(!r.name){continue;}var k=this.default_value_map[r.name];if(m=="input"&&p=="file"){r.value="";}else{if(c.Lang.isUndefined(k)){if(m=="input"&&(p=="password"||p=="text")){this.default_value_map[r.name]=r.value;}else{if(m=="input"&&p=="checkbox"){this.default_value_map[r.name]=(r.checked?r.value:"");}else{if(m=="input"&&p=="radio"){var q=this.form[r.name];if(q&&!q.length){this.default_value_map[r.name]=q.value;}else{if(q){this.default_value_map[r.name]=q[0].value;for(var l=0;l<q.length;l++){if(q[l].checked){this.default_value_map[r.name]=q[l].value;break;}}}}}else{if((m=="select"&&p=="select-one")||m=="textarea"){this.default_value_map[r.name]=r.value;}}}}}else{if(m=="input"&&(p=="password"||p=="text")){r.value=k;}else{if(m=="input"&&(p=="checkbox"||p=="radio")){r.checked=(r.value==k);}else{if(m=="select"&&p=="select-one"){r.value=k;if(r.selectedIndex>=0&&r.options[r.selectedIndex].value!==k.toString()){r.selectedIndex=-1;}}else{if(m=="textarea"){r.value=k;}}}}}}}}h.clearMessage=function(l){var k=c.one(l).getAncestorByClassName(c.FormManager.row_marker_class);if(k&&k.hasClass(d())){k.all("."+c.FormManager.status_marker_class).set("innerHTML","");k.removeClass(d());k.all("."+c.FormManager.field_marker_class).removeClass(d());}};h.displayMessage=function(q,l,s,m,t){if(c.Lang.isUndefined(t)){t=!m;}q=c.one(q);var k=q.getAncestorByClassName(h.row_marker_class);if(k&&h.statusTakesPrecedence(h.getElementStatus(k),s)){var o=k.all("."+h.field_marker_class);if(o){o.removeClass(d());}if(l){k.one("."+h.status_marker_class).set("innerHTML",l);}var n=h.row_status_prefix+s;k.replaceClass(d(),n);o=q.getAncestorByClassName(h.field_marker_class,true);if(o){o.replaceClass(d(),n);}var u=q.getAncestorByTagName("fieldset");if(u&&h.statusTakesPrecedence(h.getElementStatus(u),s)){u.removeClass(d());u.addClass(h.row_status_prefix+s);}if(t&&q.get("offsetHeight")!==0){k.scrollIntoView();try{q.focus();}catch(r){}}return true;}return false;};c.extend(h,c.Plugin.Host,{getForm:function(){if(!this.form){this.form=c.config.doc.forms[this.form_name];}return this.form;},hasFileInputs:function(){return this.has_file_inputs;},setStatusNode:function(k){this.status_node=c.one(k);},setDefaultValues:function(k){this.default_value_map=k;},setDefaultValue:function(l,k){this.default_value_map[l]=k;},saveCurrentValuesAsDefault:function(){this.default_value_map={};this.button_list=[];g.call(this);},setFunction:function(l,k){this.validation.fn[e(l)]=k;},setRegex:function(m,l,k){m=e(m);if(c.Lang.isString(l)){this.validation.regex[m]=new RegExp(l,k);}else{this.validation.regex[m]=l;}if(!this.validation_msgs[m]||!this.validation_msgs[m].regex){c.error(c.substitute("No error message provided for regex validation of {id}!",{id:m}),null,"FormManager");}},setErrorMessages:function(l,k){this.validation_msgs[e(l)]=k;},addErrorMessage:function(m,k,l){m=e(m);if(!this.validation_msgs[m]){this.validation_msgs[m]={};}this.validation_msgs[m][k]=l;},clearForm:function(){this.clearMessages();this.form.reset();this.postPopulateForm();},populateForm:function(){if(!this.default_value_map){this.default_value_map={};}this.clearMessages();g.call(this);this.postPopulateForm();},postPopulateForm:function(){},isChanged:function(){for(var m=0;m<this.form.elements.length;m++){var p=this.form.elements[m];if(!p.name){continue;}var n=(p.type?p.type.toLowerCase():null);var l=p.tagName.toLowerCase();var k=this.default_value_map[p.name];if(k===null||typeof k==="undefined"){k="";}if(l=="input"&&n=="file"){if(p.value){return true;}}else{if(l=="input"&&(n=="password"||n=="text"||n=="file")){if(p.value!=k){return true;}}else{if(l=="input"&&(n=="checkbox"||n=="radio")){var o=(p.value==k);if((o&&!p.checked)||(!o&&p.checked)){return true;}}else{if((l=="select"&&n=="select-one")||l=="textarea"){if(p.value!=k){return true;}}}}}}return false;},prepareForm:function(){this.getForm();if(!this.prePrepareForm.apply(this,arguments)){return false;}this.populateForm();return this.postPrepareForm.apply(this,arguments);},prePrepareForm:function(){return true;},postPrepareForm:function(){return true;},initFocus:function(){for(var m=0;m<this.form.elements.length;m++){var o=this.form.elements[m];if(o.disabled||o.offsetHeight===0){continue;}var k=o.tagName.toLowerCase();var n=(o.type?o.type.toLowerCase():null);if((k=="input"&&(n=="file"||n=="password"||n=="text"))||k=="textarea"){try{o.focus();}catch(l){}o.select();break;}}},validateForm:function(){this.clearMessages();var l=true;var q=this.form.elements;this.has_file_inputs=h.cleanValues(q);for(var m=0;m<q.length;m++){var r=q[m].id;
var k=this.validation_msgs[r];var p=h.validateFromCSSData(q[m],k);if(p.error){this.displayMessage(q[m],p.error,"error");l=false;continue;}if(p.keepGoing){if(this.validation.regex[r]&&!this.validation.regex[r].test(q[m].value)){this.displayMessage(q[m],k?k.regex:null,"error");l=false;continue;}}var o=this.validation.fn[r];var n=this;if(c.Lang.isFunction(o)){}else{if(c.Lang.isString(o)){o=n[o];}else{if(o&&o.scope){n=o.scope;o=(c.Lang.isString(o.fn)?n[o.fn]:o.fn);}else{o=null;}}}if(o&&!o.call(n,this.form,c.one(q[m]))){l=false;continue;}}if(!this.postValidateForm(this.form)){l=false;}if(!l){this.notifyErrors();}return l;},postValidateForm:function(k){return true;},registerButton:function(k){var l={e:c.Lang.isString(k)||k.tagName?c.one(k):k};this.user_button_list.push(l);},isFormEnabled:function(){return this.enabled;},enableForm:function(){this.setFormEnabled(true);},disableForm:function(){this.setFormEnabled(false);},setFormEnabled:function(k){this.enabled=k;var m=!k;for(var l=0;l<this.button_list.length;l++){this.button_list[l].disabled=m;}for(l=0;l<this.user_button_list.length;l++){var n=this.user_button_list[l];n.e.set("disabled",m);}},hasMessages:function(){return this.has_messages;},hasErrors:function(){return this.has_errors;},getRowStatus:function(l){var k=c.one(l).getAncestorByClassName(h.row_marker_class,true);return h.getElementStatus(k);},clearMessages:function(){this.has_messages=false;this.has_errors=false;if(this.status_node){this.status_node.set("innerHTML","");this.status_node.replaceClass(a(),h.status_none_class);}c.Array.each(this.form.elements,function(m){var k=m.tagName.toLowerCase();var l=(m.type?m.type.toLowerCase():null);if(k!="button"&&l!="submit"&&l!="reset"){h.clearMessage(m);}});c.one(this.form).all("fieldset").removeClass(d());},displayMessage:function(m,n,l,k){if(h.displayMessage(m,n,l,this.has_messages,k)){this.has_messages=true;if(l=="error"){this.has_errors=true;}return true;}else{return false;}},notifyErrors:function(){this.displayFormMessage(h.Strings.validation_error,true,false);},displayFormMessage:function(m,l,k){if(c.Lang.isUndefined(k)){k=true;}if(this.status_node){if(!this.status_node.innerHTML){this.status_node.replaceClass(h.status_none_class,(l?h.status_failure_class:h.status_success_class));this.status_node.set("innerHTML",m);}if(k){this.status_node.scrollIntoView();}}else{}}});c.aggregate(h,c.FormManager);c.FormManager=h;},"@VERSION@",{requires:["pluginhost-base","gallery-node-optimizations","gallery-formmgr-css-validation"],optional:["gallery-scrollintoview"]});