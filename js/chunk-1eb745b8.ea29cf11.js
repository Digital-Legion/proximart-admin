(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eb745b8","chunk-1eb745b8"],{"58d3":function(t,e,n){"use strict";n("6122")},6122:function(t,e,n){},c4a9:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return o}));var i=function(){return"undefined"!==typeof window?window:t},o=function(){var t=i();return t&&t.tinymce?t.tinymce:null}}).call(this,n("c8ba"))},ceb0:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"g-text-editor"},[t.label?n("Label",[t._v(" "+t._s(t.label)+" ")]):t._e(),n("editor",{attrs:{value:t.value,"api-key":t.apiKey,init:{menubar:!1,statusbar:!1,automatic_uploads:!0,file_picker_types:"image",plugins:"link paste autolink image media autoresize",paste_as_text:!0,default_link_target:"_blank",content_css:"/mce-style.css",smart_paste:!1,file_picker_callback:this.filePickerCallback},toolbar:"bold italic underline strikethrough link image",block_formats:"Paragraph=p; Header 2=h2; Header 3=h3",resize:!1},on:{input:function(e){return t.$emit("input",e)}}})],1)},o=[],r=n("1da1"),a=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"]),s=function(t){return-1!==a.map((function(t){return t.toLowerCase()})).indexOf(t.toLowerCase())},u=function(t,e,n){Object.keys(e).filter(s).forEach((function(i){var o=e[i];"function"===typeof o&&("onInit"===i?o(t,n):n.on(i.substring(2),(function(t){return o(t,n)})))}))},c=function(t,e){var n=t.$props.modelEvents?t.$props.modelEvents:null,i=Array.isArray(n)?n.join(" "):n;e.on(i||"change input undo redo",(function(){t.$emit("input",e.getContent({format:t.$props.outputFormat}))}))},l=function(t,e,n){var i=e.$props.value?e.$props.value:"",o=e.$props.initialValue?e.$props.initialValue:"";n.setContent(i||(e.initialized?e.cache:o)),e.$watch("value",(function(t,i){n&&"string"===typeof t&&t!==i&&t!==n.getContent({format:e.$props.outputFormat})&&n.setContent(t)})),e.$listeners.input&&c(e,n),u(t,e.$listeners,n),e.initialized=!0},p=0,d=function(t){var e=Date.now(),n=Math.floor(1e9*Math.random());return p++,t+"_"+n+p+String(e)},f=function(t){return null!==t&&"textarea"===t.tagName.toLowerCase()},h=function(t){return"undefined"===typeof t||""===t?[]:Array.isArray(t)?t:t.split(" ")},m=function(t,e){return h(t).concat(h(e))},v=function(t){return null===t||void 0===t},b=function(){return{listeners:[],scriptId:d("tiny-script"),scriptLoaded:!1}},y=function(){var t=b(),e=function(t,e,n,i){var o=e.createElement("script");o.referrerPolicy="origin",o.type="application/javascript",o.id=t,o.src=n;var r=function(){o.removeEventListener("load",r),i()};o.addEventListener("load",r),e.head&&e.head.appendChild(o)},n=function(n,i,o){t.scriptLoaded?o():(t.listeners.push(o),n.getElementById(t.scriptId)||e(t.scriptId,n,i,(function(){t.listeners.forEach((function(t){return t()})),t.scriptLoaded=!0})))},i=function(){t=b()};return{load:n,reinitialize:i}},g=y(),$=n("c4a9"),C={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean,tinymceScriptSrc:String,outputFormat:{type:String,validator:function(t){return"html"===t||"text"===t}}},S=function(){return S=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},S.apply(this,arguments)},k=function(t,e,n){return t(n||"div",{attrs:{id:e}})},w=function(t,e){return t("textarea",{attrs:{id:e},style:{visibility:"hidden"}})},E=function(t){return function(){var e=S(S({},t.$props.init),{readonly:t.$props.disabled,selector:"#"+t.elementId,plugins:m(t.$props.init&&t.$props.init.plugins,t.$props.plugins),toolbar:t.$props.toolbar||t.$props.init&&t.$props.init.toolbar,inline:t.inlineEditor,setup:function(e){t.editor=e,e.on("init",(function(n){return l(n,t,e)})),t.$props.init&&"function"===typeof t.$props.init.setup&&t.$props.init.setup(e)}});f(t.element)&&(t.element.style.visibility="",t.element.style.display=""),Object($["a"])().init(e)}},j={props:C,created:function(){this.elementId=this.$props.id||d("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline,this.initialized=!1},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object($["a"])())E(this)();else if(this.element&&this.element.ownerDocument){var t=this.$props.cloudChannel?this.$props.cloudChannel:"5",e=this.$props.apiKey?this.$props.apiKey:"no-api-key",n=v(this.$props.tinymceScriptSrc)?"https://cdn.tiny.cloud/1/"+e+"/tinymce/"+t+"/tinymce.min.js":this.$props.tinymceScriptSrc;g.load(this.element.ownerDocument,n,E(this))}},beforeDestroy:function(){null!==Object($["a"])()&&Object($["a"])().remove(this.editor)},deactivated:function(){var t;this.inlineEditor||(this.cache=this.editor.getContent(),null===(t=Object($["a"])())||void 0===t||t.remove(this.editor))},activated:function(){!this.inlineEditor&&this.initialized&&E(this)()},render:function(t){return this.inlineEditor?k(t,this.elementId,this.$props.tagName):w(t,this.elementId)}},O=j,_=n("bc3a"),D=n.n(_),x={name:"Editor",components:{editor:O,Label:function(){return n.e("chunk-2faa9254").then(n.bind(null,"8641"))}},props:{value:{type:String,required:!0},label:{type:String,default:null}},computed:{apiKey:function(){return"akbzyrpxiv1ousjjn5e1q0yxwu4ro65owyu6q42j6tuks176"}},methods:{filePickerCallback:function(t){var e=this,n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("accept","image/*"),n.onchange=Object(r["a"])(regeneratorRuntime.mark((function i(){var o;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(!n.files[0]){i.next=5;break}return o=new FormData,o.append("file",n.files[0]),i.next=5,D.a.post("/upload",o).then((function(e){t(e.data.secure_url)})).catch((function(t){var n,i;e.$toasted.error((null===t||void 0===t||null===(n=t.response)||void 0===n?void 0:n.message)||(null===t||void 0===t||null===(i=t.response)||void 0===i?void 0:i.error)||"Не получилось загрузить, обратитесь к администратору")}));case 5:case"end":return i.stop()}}),i)}))),n.click()}}},A=x,P=(n("58d3"),n("2877")),I=Object(P["a"])(A,i,o,!1,null,null,null);e["default"]=I.exports}}]);
//# sourceMappingURL=chunk-1eb745b8.ea29cf11.js.map