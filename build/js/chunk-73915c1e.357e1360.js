(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73915c1e","chunk-1eb745b8","chunk-1eb745b8","chunk-117b5258"],{"20ca":function(e,t,n){"use strict";function a(e,t,n){var a;return function(){var i=this,r=arguments,o=function(){a=null,n||e.apply(i,r)},s=n&&!a;clearTimeout(a),a=setTimeout(o,t),s&&e.apply(i,r)}}n.d(t,"a",(function(){return a}))},"244d":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"drop-image"},[e.label?n("span",{staticClass:"g-label"},[e._v(e._s(e.label))]):e._e(),e.image?n("div",{staticClass:"drop-image--dropped"},[n("img",{staticClass:"drop-image__img",attrs:{src:e.image,alt:"dropped-image"}}),n("button",{staticClass:"drop-image__remove",on:{click:e.removeFile}},[n("svg",{attrs:{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M30.688 4H22V.687a.694.694 0 00-.688-.688H10.687a.694.694 0 00-.688.688V4H1.311c-.375 0-.625.313-.625.688s.25.625.625.625h3.375v26c0 .375.25.688.625.688h21.375c.375 0 .625-.313.625-.688v-26h3.375c.375 0 .625-.25.625-.625S31.061 4 30.686 4zM11.313 1.313h9.375v2.688h-9.375zM26 30.688H6V5.313h20zM10.688 9.313a.694.694 0 00-.688.688v15.313c0 .375.313.688.688.688s.625-.313.625-.688V10.001c0-.375-.25-.688-.625-.688zm5.312 0a.694.694 0 00-.688.688v15.313c0 .375.313.688.688.688s.688-.313.688-.688V10.001A.694.694 0 0016 9.313zm4.688.687v15.313c0 .375.25.688.625.688s.688-.313.688-.688V10c0-.375-.313-.688-.688-.688s-.625.313-.625.688z"}})])])]):n("div",{staticClass:"drop-image--no-image",on:{click:function(t){return t.stopPropagation(),e.$refs.dropImage.click()}}},[n("button",{staticClass:"drop-image__upload"},[e._v(" "+e._s(e.placeholder)+" ")])]),n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"dropImage",attrs:{type:"file",accept:"image/*"},on:{change:e.onChange}})])},i=[],r=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),{name:"DropImage",props:{label:{type:String,default:"Image"},placeholder:{type:String,default:"Upload"},imgSrc:{type:String}},data:function(){return{image:null}},watch:{imgSrc:{immediate:!0,handler:function(){this.image=this.imgSrc}}},methods:{removeFile:function(){this.image=null,this.$emit("set",{file:"",src:""}),this.$emit("set-image",""),this.$emit("set-image-src","")},onChange:function(e){var t=e.target.files[0];t&&(this.image=URL.createObjectURL(t),this.$emit("set",{file:t,src:this.image}),this.$emit("set-image",t),this.$emit("set-image-src",this.image))}}}),o=r,s=(n("2ce4"),n("2877")),c=Object(s["a"])(o,a,i,!1,null,null,null);t["default"]=c.exports},"2a1e":function(e,t,n){"use strict";n("4245")},"2ce4":function(e,t,n){"use strict";n("f75e")},3666:function(e,t,n){(function(t,n,a){e.exports=a(),e.exports["default"]=a()})(0,0,(function(){var e=JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}'),t=JSON.parse('{"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"}}');function n(n,a){if("string"!==typeof n)throw new Error("slugify: string argument expected");a="string"===typeof a?{replacement:a}:a||{};var i=t[a.locale]||{},r=void 0===a.replacement?"-":a.replacement,o=void 0===a.trim||a.trim,s=n.normalize().split("").reduce((function(t,n){return t+(i[n]||e[n]||(n===r?" ":n)).replace(a.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")}),"");return a.strict&&(s=s.replace(/[^A-Za-z0-9\s]/g,"")),o&&(s=s.trim()),s=s.replace(/\s+/g,r),a.lower&&(s=s.toLowerCase()),s}return n.extend=function(t){Object.assign(e,t)},n}))},4245:function(e,t,n){},"58d3":function(e,t,n){"use strict";n("6122")},6122:function(e,t,n){},c4a9:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return i}));var a=function(){return"undefined"!==typeof window?window:e},i=function(){var e=a();return e&&e.tinymce?e.tinymce:null}}).call(this,n("c8ba"))},ceb0:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"g-text-editor"},[e.label?n("Label",[e._v(" "+e._s(e.label)+" ")]):e._e(),n("editor",{attrs:{value:e.value,"api-key":e.apiKey,init:{menubar:!1,statusbar:!1,automatic_uploads:!0,file_picker_types:"image",plugins:"link paste autolink image media autoresize",paste_as_text:!0,default_link_target:"_blank",content_css:"/mce-style.css",smart_paste:!1,file_picker_callback:this.filePickerCallback},toolbar:"bold italic underline strikethrough link image",block_formats:"Paragraph=p; Header 2=h2; Header 3=h3",resize:!1},on:{input:function(t){return e.$emit("input",t)}}})],1)},i=[],r=n("1da1"),o=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"]),s=function(e){return-1!==o.map((function(e){return e.toLowerCase()})).indexOf(e.toLowerCase())},c=function(e,t,n){Object.keys(t).filter(s).forEach((function(a){var i=t[a];"function"===typeof i&&("onInit"===a?i(e,n):n.on(a.substring(2),(function(e){return i(e,n)})))}))},u=function(e,t){var n=e.$props.modelEvents?e.$props.modelEvents:null,a=Array.isArray(n)?n.join(" "):n;t.on(a||"change input undo redo",(function(){e.$emit("input",t.getContent({format:e.$props.outputFormat}))}))},l=function(e,t,n){var a=t.$props.value?t.$props.value:"",i=t.$props.initialValue?t.$props.initialValue:"";n.setContent(a||(t.initialized?t.cache:i)),t.$watch("value",(function(e,a){n&&"string"===typeof e&&e!==a&&e!==n.getContent({format:t.$props.outputFormat})&&n.setContent(e)})),t.$listeners.input&&u(t,n),c(e,t.$listeners,n),t.initialized=!0},d=0,p=function(e){var t=Date.now(),n=Math.floor(1e9*Math.random());return d++,e+"_"+n+d+String(t)},m=function(e){return null!==e&&"textarea"===e.tagName.toLowerCase()},g=function(e){return"undefined"===typeof e||""===e?[]:Array.isArray(e)?e:e.split(" ")},h=function(e,t){return g(e).concat(g(t))},f=function(e){return null===e||void 0===e},v=function(){return{listeners:[],scriptId:p("tiny-script"),scriptLoaded:!1}},b=function(){var e=v(),t=function(e,t,n,a){var i=t.createElement("script");i.referrerPolicy="origin",i.type="application/javascript",i.id=e,i.src=n;var r=function(){i.removeEventListener("load",r),a()};i.addEventListener("load",r),t.head&&t.head.appendChild(i)},n=function(n,a,i){e.scriptLoaded?i():(e.listeners.push(i),n.getElementById(e.scriptId)||t(e.scriptId,n,a,(function(){e.listeners.forEach((function(e){return e()})),e.scriptLoaded=!0})))},a=function(){e=v()};return{load:n,reinitialize:a}},y=b(),E=n("c4a9"),z={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],value:String,disabled:Boolean,tinymceScriptSrc:String,outputFormat:{type:String,validator:function(e){return"html"===e||"text"===e}}},A=function(){return A=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},A.apply(this,arguments)},C=function(e,t,n){return e(n||"div",{attrs:{id:t}})},w=function(e,t){return e("textarea",{attrs:{id:t},style:{visibility:"hidden"}})},O=function(e){return function(){var t=A(A({},e.$props.init),{readonly:e.$props.disabled,selector:"#"+e.elementId,plugins:h(e.$props.init&&e.$props.init.plugins,e.$props.plugins),toolbar:e.$props.toolbar||e.$props.init&&e.$props.init.toolbar,inline:e.inlineEditor,setup:function(t){e.editor=t,t.on("init",(function(n){return l(n,e,t)})),e.$props.init&&"function"===typeof e.$props.init.setup&&e.$props.init.setup(t)}});m(e.element)&&(e.element.style.visibility="",e.element.style.display=""),Object(E["a"])().init(t)}},k={props:z,created:function(){this.elementId=this.$props.id||p("tiny-vue"),this.inlineEditor=this.$props.init&&this.$props.init.inline||this.$props.inline,this.initialized=!1},watch:{disabled:function(){this.editor.setMode(this.disabled?"readonly":"design")}},mounted:function(){if(this.element=this.$el,null!==Object(E["a"])())O(this)();else if(this.element&&this.element.ownerDocument){var e=this.$props.cloudChannel?this.$props.cloudChannel:"5",t=this.$props.apiKey?this.$props.apiKey:"no-api-key",n=f(this.$props.tinymceScriptSrc)?"https://cdn.tiny.cloud/1/"+t+"/tinymce/"+e+"/tinymce.min.js":this.$props.tinymceScriptSrc;y.load(this.element.ownerDocument,n,O(this))}},beforeDestroy:function(){null!==Object(E["a"])()&&Object(E["a"])().remove(this.editor)},deactivated:function(){var e;this.inlineEditor||(this.cache=this.editor.getContent(),null===(e=Object(E["a"])())||void 0===e||e.remove(this.editor))},activated:function(){!this.inlineEditor&&this.initialized&&O(this)()},render:function(e){return this.inlineEditor?C(e,this.elementId,this.$props.tagName):w(e,this.elementId)}},S=k,L=n("bc3a"),$=n.n(L),_={name:"Editor",components:{editor:S,Label:function(){return n.e("chunk-2faa9254").then(n.bind(null,"8641"))}},props:{value:{type:String,required:!0},label:{type:String,default:null}},computed:{apiKey:function(){return"akbzyrpxiv1ousjjn5e1q0yxwu4ro65owyu6q42j6tuks176"}},methods:{filePickerCallback:function(e){var t=this,n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("accept","image/*"),n.onchange=Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!n.files[0]){a.next=5;break}return i=new FormData,i.append("file",n.files[0]),a.next=5,$.a.post("/upload",i).then((function(t){e(t.data.secure_url)})).catch((function(e){var n,a;t.$toasted.error((null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.message)||(null===e||void 0===e||null===(a=e.response)||void 0===a?void 0:a.error)||"Не получилось загрузить, обратитесь к администратору")}));case 5:case"end":return a.stop()}}),a)}))),n.click()}}},I=_,j=(n("58d3"),n("2877")),x=Object(j["a"])(I,a,i,!1,null,null,null);t["default"]=x.exports},d81d:function(e,t,n){"use strict";var a=n("23e7"),i=n("b727").map,r=n("1dde"),o=r("map");a({target:"Array",proto:!0,forced:!o},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},f75e:function(e,t,n){},f83b:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"add-edit-page"},[n("loading",{attrs:{active:e.loading,"can-cancel":!1,"is-full-page":!0},on:{"update:active":function(t){e.loading=t}}}),n("page-header",{attrs:{title:e.pageTitle}},[n("button",{staticClass:"g-button",attrs:{disabled:e.wait},on:{click:function(t){return e.submit(!0)}}},[n("font-awesome-icon",{attrs:{icon:"save"}}),n("span",[e._v("Save")]),e.dataUpdated?n("span",[e._v(" (autosave in "+e._s(e.timeLeftToUpdate)+")")]):e._e()],1),n("router-link",{staticClass:"g-button g-button--danger",attrs:{to:"/categories"}},[n("font-awesome-icon",{attrs:{icon:"ban"}}),n("span",[e._v("Cancel")])],1)],1),n("page-tabs",{attrs:{value:e.activeLang,options:e.filteredLangs},on:{input:e.setActiveLang}}),n("page-box",{staticClass:"mb-20",attrs:{double:!0}},[n("div",{staticClass:"add-edit-page__left"},["ru"===e.activeLang?n("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter name",label:"Name"},on:{input:e.onNameInput},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}):"az"===e.activeLang?n("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter name",label:"Name"},on:{input:e.onNameInput},model:{value:e.nameAz,callback:function(t){e.nameAz=t},expression:"nameAz"}}):e._e(),n("editor",{directives:[{name:"show",rawName:"v-show",value:"ru"===e.activeLang,expression:"activeLang === 'ru'"}],staticClass:"mb-20",attrs:{placeholder:"Enter description",label:"Description"},on:{input:e.onDescriptionInput},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),n("editor",{directives:[{name:"show",rawName:"v-show",value:"az"===e.activeLang,expression:"activeLang === 'az'"}],staticClass:"mb-20",attrs:{placeholder:"Enter description",label:"Description"},on:{input:e.onDescriptionInput},model:{value:e.descriptionAz,callback:function(t){e.descriptionAz=t},expression:"descriptionAz"}}),"ru"===e.activeLang?n("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter slug (based on the name by default)",label:"Slug"},on:{input:e.onSlugInput},model:{value:e.slug,callback:function(t){e.slug=t},expression:"slug"}}):"az"===e.activeLang?n("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter slug (based on the name by default)",label:"Slug"},on:{input:e.onSlugInput},model:{value:e.slugAz,callback:function(t){e.slugAz=t},expression:"slugAz"}}):e._e(),n("custom-cascader",{attrs:{value:e.parent?e.parent.id?e.parent.id.toString():e.parent.toString():null,options:e.cascaderCategories,label:"Parent category (all languages)",placeholder:"Select category (or leave it empty)"},on:{"set-value":e.onParentSelect}})],1),n("div",{staticClass:"add-edit-page__right"},[n("DropImage",{staticClass:"mb-20",attrs:{label:"Image (all languages)",placeholder:"Select image","img-src":e.image},on:{"set-image-src":function(t){e.image=t},"set-image":function(t){e.imageFile=t,e.image=""}}}),n("custom-input",{attrs:{placeholder:"Enter image's alt",label:"Alt (all languages)"},on:{input:function(t){e.altError=""}},model:{value:e.alt,callback:function(t){e.alt=t},expression:"alt"}})],1)]),n("meta-form",{staticClass:"mb-20",attrs:{"data-updated":e.metaDataUpdated,"initial-data":e.meta,loading:e.metaLoading,url:"https://proximart.az"+("az"===e.activeLang?"/az":"")+"/catalog?cat="+e.categoryId},on:{submit:e.onMetaSubmit,"set-updated":function(t){e.metaDataUpdated=t}}})],1)},i=[],r=n("5530"),o=n("1da1"),s=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("a4d3"),n("e01a"),n("d81d"),n("2f62")),c=n("244d"),u=n("20ca"),l=n("ceb0"),d=n("3666"),p={name:"CategoriesAddEdit",components:{Editor:l["default"],DropImage:c["default"],MetaForm:function(){return n.e("chunk-418baf32").then(n.bind(null,"c5a9"))},PageHeader:function(){return n.e("chunk-aefa6f68").then(n.bind(null,"36ad"))},PageTabs:function(){return n.e("chunk-e85c4fcc").then(n.bind(null,"f83a"))},PageBox:function(){return n.e("chunk-6977128a").then(n.bind(null,"e235"))},CustomInput:function(){return n.e("chunk-7fa08c76").then(n.bind(null,"ffcc"))},CustomCascader:function(){return n.e("chunk-dc370b10").then(n.bind(null,"2676"))}},data:function(){return{name:"",nameAz:"",description:"",descriptionAz:"",alt:"",slug:"",slugAz:"",parent:null,image:null,imageFile:null,slugBasedOnName:!0,slugBasedOnNameAz:!0,meta:null,metaLoading:!1,nameError:"",nameAzError:"",descriptionError:"",descriptionAzError:"",slugError:"",imageError:"",altError:"",wait:!1,loading:!1,dataUpdated:!1,timer:null,timeLeftToUpdate:0,dontSendData:!1,metaDataUpdated:!1}},created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.fetchCascaderCategories();case 2:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.categoryId){t.next=5;break}return e.loading=!0,t.next=4,e.fetchCategory(e.categoryId).then((function(t){var n,a,i,r,o,s,c,u,l,d,p,m,g,h=t.data;e.name=null!==(n=h.name)&&void 0!==n?n:"",e.nameAz=null!==(a=null!==(i=h.name__az)&&void 0!==i?i:h.nameAz)&&void 0!==a?a:"",e.description=null!==(r=h.description)&&void 0!==r?r:"",e.descriptionAz=null!==(o=null!==(s=h.description__az)&&void 0!==s?s:h.descriptionAz)&&void 0!==o?o:"",e.alt=null!==(c=null===(u=h.image)||void 0===u?void 0:u.alt)&&void 0!==c?c:"",e.slug=null!==(l=h.slug)&&void 0!==l?l:"",e.slugAz=null!==(d=null!==(p=h.slug__az)&&void 0!==p?p:h.slugAz)&&void 0!==d?d:"",e.image=null!==(m=null===(g=h.image)||void 0===g?void 0:g.url)&&void 0!==m?m:"",e.parent=h.parent,e.meta=h.meta,e.slugBasedOnName=!e.slug,e.slugBasedOnNameAz=!e.slugAz})).catch((function(t){console.error(t),e.$toasted.error(t.response.data.message),e.$router.push("/categories")}));case 4:e.loading=!1;case 5:e.$watch((function(e){return[e.name,e.nameAz,e.description,e.descriptionAz,e.slug,e.slugAz,e.alt,e.imageFile,e.parent]}),(function(){e.categoryId&&e.dataUpdate()}));case 6:case"end":return t.stop()}}),t)})))()},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(s["d"])(["activeLang","langs"])),Object(s["d"])("categories",["cascaderCategories"])),{},{pageTitle:function(){var e;return this.categoryId?"Editing category ".concat(null!==(e=this.slug)&&void 0!==e?e:"with id "+this.categoryId):"Creating a new category"},categoryId:function(){return this.$route.params.id},defaultLangError:function(){return this.nameError&&this.descriptionError&&this.slugError&&this.altError&&this.imageError},azLangError:function(){return this.nameError&&this.descriptionError&&this.slugError&&this.altError&&this.imageError},filteredLangs:function(){var e=this;return this.langs.map((function(t){return Object(r["a"])(Object(r["a"])({},t),{},{error:"ru"===t.title?e.defaultLangError:"az"===t.title&&e.azLangError})}))}}),methods:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(s["c"])(["setActiveLang"])),Object(s["b"])("categories",["fetchCascaderCategories","createCategory","fetchCategory","updateCategory","saveMeta"])),{},{dataUpdate:function(){this.dataUpdated=!0,this.startTimer(),this.onDataUpdate()},onParentSelect:function(e){this.parent=e},onDataUpdate:Object(u["a"])((function(){this.dataUpdated=!1,null===this.timer&&this.submit()}),11e3),startTimer:function(){var e=this;clearInterval(this.timer),this.timeLeftToUpdate=10,this.timer=setInterval((function(){e.timeLeftToUpdate--,e.timeLeftToUpdate<=0&&(clearInterval(e.timer),e.timer=null)}),1e3)},onMetaSubmit:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.metaLoading){n.next=5;break}return t.metaLoading=!0,n.next=4,t.saveMeta({meta:Object(r["a"])(Object(r["a"])({},e),{},{category:t.categoryId}),metaId:null===(a=t.meta)||void 0===a?void 0:a.id}).then((function(e){t.meta=null===e||void 0===e?void 0:e.data,t.$toasted.success("Categorie's meta was successfully saved"),t.metaDataUpdated=!1})).catch((function(e){console.error(e),t.$toasted.error(e.response.data.message)}));case 4:t.metaLoading=!1;case 5:case"end":return n.stop()}}),n)})))()},submit:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.wait){n.next=16;break}if(t.wait=!0,i={name:t.name,name__az:t.nameAz,description:t.description,description__az:t.descriptionAz,slug:t.slug,slug__az:t.slugAz,alt:t.alt},t.parent&&(i.parent=null!==(a=t.parent.id)&&void 0!==a?a:t.parent),t.imageFile&&(i.file=t.imageFile),t.categoryId){n.next=10;break}return n.next=8,t.createCategory(i).then((function(){e&&t.$router.push("/categories"),t.$toasted.success("The category was successfully created")})).catch((function(e){console.error(e),t.$toasted.error(e.response.data.message)}));case 8:n.next=13;break;case 10:return i.id=t.categoryId,n.next=13,t.updateCategory(i).then((function(){t.$toasted.success("The category was successfully updated")})).catch((function(e){console.error(e),t.$toasted.error(e.response.data.message)}));case 13:t.dataUpdated=!1,clearTimeout(t.timer),t.wait=!1;case 16:case"end":return n.stop()}}),n)})))()},onNameInput:function(){this.slugError="","ru"===this.activeLang?this.nameError="":"az"===this.activeLang&&(this.nameAzError=""),this.slugBasedOnName&&(this.slug=d(this.name).toLowerCase()),this.slugBasedOnNameAz&&(this.slugAz=d(this.nameAz).toLowerCase())},onDescriptionInput:function(){"ru"===this.activeLang?this.descriptionError="":"az"===this.activeLang&&(this.descriptionAzError="")},onSlugInput:function(){this.slugError="",this.slugBasedOnName=!this.slug,this.slugBasedOnNameAz=!this.slugAz,this.slug=d(this.slug).toLowerCase(),this.slugAz=d(this.slugAz).toLowerCase()}}),beforeRouteLeave:function(e,t,n){this.dontSendData=!0,clearTimeout(this.timer),this.dataUpdated=!1,n()}},m=p,g=(n("2a1e"),n("2877")),h=Object(g["a"])(m,a,i,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-73915c1e.357e1360.js.map