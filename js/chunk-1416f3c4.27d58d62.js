(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1416f3c4","chunk-117b5258"],{"07ac":function(e,t,a){var n=a("23e7"),r=a("6f53").values;n({target:"Object",stat:!0},{values:function(e){return r(e)}})},"244d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"drop-image"},[e.label?a("span",{staticClass:"g-label"},[e._v(e._s(e.label))]):e._e(),e.image?a("div",{staticClass:"drop-image--dropped"},[a("img",{staticClass:"drop-image__img",attrs:{src:e.image,alt:"dropped-image"}}),a("button",{staticClass:"drop-image__remove",on:{click:e.removeFile}},[a("svg",{attrs:{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M30.688 4H22V.687a.694.694 0 00-.688-.688H10.687a.694.694 0 00-.688.688V4H1.311c-.375 0-.625.313-.625.688s.25.625.625.625h3.375v26c0 .375.25.688.625.688h21.375c.375 0 .625-.313.625-.688v-26h3.375c.375 0 .625-.25.625-.625S31.061 4 30.686 4zM11.313 1.313h9.375v2.688h-9.375zM26 30.688H6V5.313h20zM10.688 9.313a.694.694 0 00-.688.688v15.313c0 .375.313.688.688.688s.625-.313.625-.688V10.001c0-.375-.25-.688-.625-.688zm5.312 0a.694.694 0 00-.688.688v15.313c0 .375.313.688.688.688s.688-.313.688-.688V10.001A.694.694 0 0016 9.313zm4.688.687v15.313c0 .375.25.688.625.688s.688-.313.688-.688V10c0-.375-.313-.688-.688-.688s-.625.313-.625.688z"}})])])]):a("div",{staticClass:"drop-image--no-image",on:{click:function(t){return t.stopPropagation(),e.$refs.dropImage.click()}}},[a("button",{staticClass:"drop-image__upload"},[e._v(" "+e._s(e.placeholder)+" ")])]),a("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"dropImage",attrs:{type:"file",accept:"image/*"},on:{change:e.onChange}})])},r=[],o=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),{name:"DropImage",props:{label:{type:String,default:"Image"},placeholder:{type:String,default:"Upload"},imgSrc:{type:String}},data:function(){return{image:null}},watch:{imgSrc:{immediate:!0,handler:function(){this.image=this.imgSrc}}},methods:{removeFile:function(){this.image=null,this.$emit("set",{file:"",src:""}),this.$emit("set-image",""),this.$emit("set-image-src","")},onChange:function(e){var t=e.target.files[0];t&&(this.image=URL.createObjectURL(t),this.$emit("set",{file:t,src:this.image}),this.$emit("set-image",t),this.$emit("set-image-src",this.image))}}}),s=o,i=(a("2ce4"),a("2877")),c=Object(i["a"])(s,n,r,!1,null,null,null);t["default"]=c.exports},"25f0":function(e,t,a){"use strict";var n=a("6eeb"),r=a("825a"),o=a("d039"),s=a("ad6d"),i="toString",c=RegExp.prototype,l=c[i],u=o((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=i;(u||d)&&n(RegExp.prototype,i,(function(){var e=r(this),t=String(e.source),a=e.flags,n=String(void 0===a&&e instanceof RegExp&&!("flags"in c)?s.call(e):a);return"/"+t+"/"+n}),{unsafe:!0})},"2ce4":function(e,t,a){"use strict";a("f75e")},3666:function(e,t,a){(function(t,a,n){e.exports=n(),e.exports["default"]=n()})(0,0,(function(){var e=JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}'),t=JSON.parse('{"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"}}');function a(a,n){if("string"!==typeof a)throw new Error("slugify: string argument expected");n="string"===typeof n?{replacement:n}:n||{};var r=t[n.locale]||{},o=void 0===n.replacement?"-":n.replacement,s=void 0===n.trim||n.trim,i=a.normalize().split("").reduce((function(t,a){return t+(r[a]||e[a]||(a===o?" ":a)).replace(n.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")}),"");return n.strict&&(i=i.replace(/[^A-Za-z0-9\s]/g,"")),s&&(i=i.trim()),i=i.replace(/\s+/g,o),n.lower&&(i=i.toLowerCase()),i}return a.extend=function(t){Object.assign(e,t)},a}))},4351:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"add-edit-page"},[a("loading",{attrs:{active:e.loading,"can-cancel":!1,"is-full-page":!0},on:{"update:active":function(t){e.loading=t}}}),a("page-header",{attrs:{title:e.pageTitle}},[a("router-link",{staticClass:"g-button g-button--danger",attrs:{to:"/products"}},[a("font-awesome-icon",{attrs:{icon:"ban"}}),a("span",[e._v("Cancel")])],1)],1),a("page-tabs",{attrs:{value:e.activeLang,options:e.filteredLangs},on:{input:e.setActiveLang}}),a("page-box",{staticClass:"mb-20",attrs:{double:!0},scopedSlots:e._u([{key:"outer-content",fn:function(){return[a("page-header",{staticClass:"mb-20",scopedSlots:e._u([{key:"content",fn:function(){return[a("h2",{staticClass:"g-title"},[e._v("General Product Info")])]},proxy:!0}])},[a("button",{staticClass:"g-button",class:{"g-button--blinking":e.dataUpdatedGeneral},attrs:{disabled:e.waitGeneral},on:{click:e.onProductSave}},[a("font-awesome-icon",{attrs:{icon:"save"}}),a("span",[e._v("Save")])],1)])]},proxy:!0},{key:"bottom-content",fn:function(){return[a("h2",{staticClass:"g-subtitle mt-20"},[e._v("Youtube videos")]),a("custom-multi-input",{attrs:{"value-template":[{label:"Title",name:"title",prop:"title",placeholder:"Enter the title",isAllLang:!1},{label:"Poster url (all langs)",name:"url",prop:"poster",placeholder:"Enter the poster url",isAllLang:!0},{label:"Youtube link (all langs)",name:"url",prop:"url",placeholder:"e.g. https://youtu.be/UxpRVIRsgh8",isAllLang:!0}],placeholder:"Enter a YouTube video link"},model:{value:e.youtubeVideos,callback:function(t){e.youtubeVideos=t},expression:"youtubeVideos"}})]},proxy:!0}])},[a("div",{staticClass:"add-edit-page__left"},["ru"===e.activeLang?a("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter name",label:"Name"},on:{input:e.onNameInput},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}):"az"===e.activeLang?a("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter name",label:"Name"},on:{input:e.onNameInput},model:{value:e.nameAz,callback:function(t){e.nameAz=t},expression:"nameAz"}}):e._e(),"ru"===e.activeLang?a("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter description","is-textarea":!0,label:"Description"},on:{input:e.onDescriptionInput},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}):"az"===e.activeLang?a("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter description","is-textarea":!0,label:"Description"},on:{input:e.onDescriptionInput},model:{value:e.descriptionAz,callback:function(t){e.descriptionAz=t},expression:"descriptionAz"}}):e._e(),"ru"===e.activeLang?a("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter slug (based on the name by default)",label:"Slug"},on:{input:e.onSlugInput},model:{value:e.slug,callback:function(t){e.slug=t},expression:"slug"}}):"az"===e.activeLang?a("custom-input",{staticClass:"mb-20",attrs:{placeholder:"Enter slug (based on the name by default)",label:"Slug"},on:{input:e.onSlugInput},model:{value:e.slugAz,callback:function(t){e.slugAz=t},expression:"slugAz"}}):e._e(),a("custom-cascader",{staticClass:"mb-20",attrs:{value:e.category,options:e.cascaderCategories,label:"Category (all languages)",placeholder:"Select category (or leave it empty)"},on:{"set-value":e.onCategorySelect}}),a("custom-select",{attrs:{value:e.devices,multiple:!0,options:e.allDevices,label:"Devices (all languages)",placeholder:"Select devices (or leave it empty)"},on:{"set-value":function(t){e.devices=t}}})],1),a("div",{staticClass:"add-edit-page__right"},[a("custom-input",{staticClass:"mb-20",attrs:{type:"number",placeholder:"Enter price",label:"Price (all languages)"},model:{value:e.price,callback:function(t){e.price=t},expression:"price"}}),a("custom-input",{staticClass:"mb-20",attrs:{type:"number",placeholder:"Enter stock",label:"Stock (all languages)"},model:{value:e.stock,callback:function(t){e.stock=t},expression:"stock"}}),a("custom-input",{staticClass:"mb-20",attrs:{type:"number",placeholder:"Enter discount",label:"Discount (all languages)"},model:{value:e.discount,callback:function(t){e.discount=t},expression:"discount"}}),a("custom-select",{attrs:{value:e.brand,options:e.allBrands,label:"Brand (all languages)",placeholder:"Select brand"},on:{"set-value":function(t){e.brand=t}}}),a("custom-checkbox",{staticStyle:{"margin-top":"40px"},attrs:{label:"Show on main page"},model:{value:e.showOnMainPage,callback:function(t){e.showOnMainPage=t},expression:"showOnMainPage"}}),a("custom-checkbox",{attrs:{label:"Hit"},model:{value:e.isHit,callback:function(t){e.isHit=t},expression:"isHit"}}),a("custom-checkbox",{attrs:{label:"Credit"},model:{value:e.canCredit,callback:function(t){e.canCredit=t},expression:"canCredit"}})],1)]),a("page-box",{staticClass:"mb-20",attrs:{title:"Colors and Images","side-title":"(all languages)"}},[a("div",{staticClass:"g-flex-wrap"},[e._l(e.colorsValues,(function(t,n){return[!t&&e.filteredColors.length?a("custom-select",{key:n,attrs:{value:t?t.id:null,options:e.filteredColors,round:!0},on:{input:e.onColorAdd}}):t?a("div",{key:n,staticClass:"g-color-wrapper g-color-wrapper--clickable",class:{"g-color-wrapper--not-saved":!!t&&!t.saved,"g-color-wrapper--active":t.id===e.currentColorId},on:{click:function(a){e.currentColorId=t.id}}},[a("div",{staticClass:"g-color",style:{background:"#"+t.hex}})]):e._e()]}))],2),e.currentColor?a("div",{staticClass:"mt-20"},[a("page-header",{staticClass:"mb-20 w-100",scopedSlots:e._u([{key:"content",fn:function(){return[a("h2",{staticClass:"g-subtitle mb-0"},[e._v("("+e._s(e.currentColor.id)+") "+e._s(e.currentColor.name)+" #"+e._s(e.currentColor.hex)+" ")])]},proxy:!0}],null,!1,1549999593)},[a("button",{staticClass:"g-button",class:{"g-button--blinking":!e.currentColor.saved},attrs:{disabled:e.waitColor},on:{click:e.onColorSave}},[a("font-awesome-icon",{attrs:{icon:"save"}}),a("span",[e._v("Save")])],1),a("button",{staticClass:"g-button g-button--danger",on:{click:e.onColorRemove}},[a("font-awesome-icon",{attrs:{icon:"trash"}}),a("span",[e._v("Remove")])],1)]),a("div",{staticClass:"g-flex-wrap w-100 m--10"},[e._l(e.currentColorImages,(function(t,n){return[a("drop-image",{key:n,staticClass:"add-edit-page__drop-image--md-triple",attrs:{"img-src":t?t.src:null,placeholder:"Add image",label:"Image #"+(n+1)},on:{set:function(t){return e.onImageSet(t,n)}}})]}))],2)],1):e._e()]),a("meta-form",{staticClass:"mb-20",attrs:{"data-updated":e.metaDataUpdated,"initial-data":e.meta,loading:e.metaLoading,url:"https://proximart.az"+("az"===e.activeLang?"/az":"")+"/product/"+("ru"===e.activeLang?e.slug:"az"===e.activeLang&&e.slugAz?e.slugAz:"")},on:{submit:e.onMetaSubmit,"set-updated":function(t){e.metaDataUpdated=t}}}),a("banner-box",{attrs:{loading:e.bannerLoading,"initial-data":e.banner,"data-updated":e.dataUpdatedBanner,"product-id":e.productId},on:{"set-loading":function(t){e.bannerLoading=t},"set-updated":function(t){e.dataUpdatedBanner=t},"set-banner":function(t){e.banner=t}}}),e.category&&e.parameters.items&&e.parameters.items.length?a("parameters-box",{staticClass:"mt-20",attrs:{"initial-data":e.parameters.items||[],"data-updated":e.dataUpdatedParameters,loading:e.parametersLoading},on:{submit:e.onParametersSubmit,"set-updated":function(t){e.dataUpdatedParameters=t}}}):e._e()],1)},r=[],o=a("5530"),s=a("1da1"),i=(a("96cf"),a("d3b7"),a("3ca3"),a("ddb0"),a("b0c0"),a("a4d3"),a("e01a"),a("d81d"),a("159b"),a("7db0"),a("07ac"),a("4de4"),a("25f0"),a("a434"),a("a15b"),a("fb6a"),a("2f62")),c=a("244d"),l=a("3666"),u={name:"ProductsAddEdit",components:{DropImage:c["default"],PageHeader:function(){return a.e("chunk-aefa6f68").then(a.bind(null,"36ad"))},PageTabs:function(){return a.e("chunk-e85c4fcc").then(a.bind(null,"f83a"))},PageBox:function(){return a.e("chunk-6977128a").then(a.bind(null,"e235"))},CustomInput:function(){return a.e("chunk-7fa08c76").then(a.bind(null,"ffcc"))},CustomCheckbox:function(){return a.e("chunk-b7571d42").then(a.bind(null,"4832"))},CustomMultiInput:function(){return a.e("chunk-2d0c1043").then(a.bind(null,"43f4"))},CustomCascader:function(){return a.e("chunk-dc370b10").then(a.bind(null,"2676"))},CustomSelect:function(){return a.e("chunk-439eeb4f").then(a.bind(null,"b8bb"))},MetaForm:function(){return Promise.all([a.e("chunk-418baf32"),a.e("chunk-1eb745b8")]).then(a.bind(null,"c5a9"))},ParametersBox:function(){return a.e("chunk-4ecd64c5").then(a.bind(null,"940b"))},BannerBox:function(){return a.e("chunk-5571476e").then(a.bind(null,"2167"))}},data:function(){return{name:"",nameAz:"",description:"",descriptionAz:"",slug:"",slugAz:"",price:"",stock:"",discount:"",category:null,brand:null,devices:null,youtubeVideos:null,isHit:!1,showOnMainPage:!1,canCredit:!1,banner:null,bannerLoading:!1,parameters:{},parametersLoading:!1,colors:{},currentColorId:null,image:null,alt:"",imageFile:null,meta:null,metaLoading:!1,nameError:"",nameAzError:"",descriptionError:"",descriptionAzError:"",slugError:"",imageError:"",altError:"",slugBasedOnName:!0,slugBasedOnNameAz:!0,waitGeneral:!1,waitColor:!1,waitParameters:!1,loading:!1,dataUpdatedGeneral:!1,dataUpdatedColors:!1,dataUpdatedParameters:!1,dataUpdatedBanner:!1,metaDataUpdated:!1,dontSendData:!1}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.fetchCascaderCategories();case 2:return t.next=4,e.fetchAllBrands();case 4:return t.next=6,e.fetchAllColors();case 6:return t.next=8,e.fetchAllDevices();case 8:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.productId){t.next=7;break}return e.loading=!0,t.next=4,e.fetchProduct(e.productId).then((function(t){var a,n,r,s,i,c,l,u,d,p,m,g,h,f,v,b,C=t.data;if(e.name=null!==(a=C.name)&&void 0!==a?a:"",e.nameAz=null!==(n=null!==(r=C.name__az)&&void 0!==r?r:C.nameAz)&&void 0!==n?n:"",e.description=null!==(s=C.description)&&void 0!==s?s:"",e.descriptionAz=null!==(i=null!==(c=C.description__az)&&void 0!==c?c:C.descriptionAz)&&void 0!==i?i:"",e.slug=null!==(l=C.slug)&&void 0!==l?l:"",e.slugAz=null!==(u=null!==(d=C.slug__az)&&void 0!==d?d:C.slugAz)&&void 0!==u?u:"",e.price=C.price,e.stock=C.stock,e.discount=C.discount,e.category=null!==(p=null===(m=C.category)||void 0===m?void 0:m.id)&&void 0!==p?p:null,e.brand=(null===(g=C.brand)||void 0===g?void 0:g.id)||null,e.devices=null!==(h=null===(f=C.devices)||void 0===f?void 0:f.map((function(e){return e.id})))&&void 0!==h?h:null,e.meta=C.meta,e.banner=(null===(v=C.banners)||void 0===v?void 0:v[0])||null,e.isHit=C.hit,e.showOnMainPage=C.main_page,e.canCredit=C.credit,e.parameters={id:(null===(b=C.parameters)||void 0===b?void 0:b.id)||null},C.youtube&&(e.youtubeVideos=C.youtube),C.colors){var w,k,y={};C.colors.forEach((function(e){var t=e.images.map((function(e){return{src:e.url}}));t.push(null),y[e.color.id]=Object(o["a"])(Object(o["a"])({},e.color),{},{relationId:e.id,saved:!0,new:!1,images:t})})),e.$set(e,"colors",y),e.currentColorId=null!==(w=null===(k=e.colorsValues.find((function(e){return null!==e})))||void 0===k?void 0:k.id)&&void 0!==w?w:null}e.slugBasedOnName=!e.slug,e.slugBasedOnNameAz=!e.slugAz})).catch((function(t){console.error(t),e.$toasted.error(t.response.data.message),e.$router.push("/products")}));case 4:return t.next=6,e.getParameters();case 6:e.loading=!1;case 7:e.$watch((function(e){return[e.name,e.nameAz,e.description,e.descriptionAz,e.slug,e.slugAz,e.price,e.stock,e.discount,e.category,e.brand,e.youtubeVideos,e.isHit,e.showOnMainPage]}),(function(){e.dataUpdateGeneral()})),e.$watch((function(e){return[e.dataUpdatedGeneral,e.metaDataUpdated,e.dataUpdatedColors,e.dataUpdatedParameters]}),(function(){e.checkDataUpdated()}));case 9:case"end":return t.stop()}}),t)})))()},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(i["d"])(["activeLang","langs"])),Object(i["d"])("categories",["cascaderCategories"])),Object(i["d"])("products",["allBrands","allColors","allDevices"])),{},{colorsValues:function(){var e=Object.values(this.colors);return e.push(null),e},filteredColors:function(){var e=this;return this.allColors?this.allColors.filter((function(t){return!e.colors[t.id.toString()]})):[]},currentColor:function(){var e;return null!==(e=this.currentColorId)&&void 0!==e&&e.toString()&&this.colors[this.currentColorId.toString()]?this.colors[this.currentColorId.toString()]:null},currentColorImages:function(){var e,t;return null!==(e=null===(t=this.currentColor)||void 0===t?void 0:t.images)&&void 0!==e?e:null},pageTitle:function(){var e;return this.productId?"Editing product ".concat(null!==(e=this.name)&&void 0!==e?e:"with id "+this.productId):"Something went wrong"},productId:function(){return this.$route.params.id},defaultLangError:function(){return this.nameError&&this.descriptionError&&this.slugError&&this.altError&&this.imageError},azLangError:function(){return this.nameError&&this.descriptionError&&this.slugError&&this.altError&&this.imageError},filteredLangs:function(){var e=this;return this.langs.map((function(t){return Object(o["a"])(Object(o["a"])({},t),{},{error:"ru"===t.title?e.defaultLangError:"az"===t.title&&e.azLangError})}))}}),methods:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(i["c"])(["setActiveLang"])),Object(i["b"])("categories",["fetchCascaderCategories"])),Object(i["b"])("banners",["fetchBanner"])),Object(i["b"])("products",["updateProduct","fetchProduct","fetchAllBrands","fetchAllColors","saveParameters","fetchAllDevices","fetchAllParameters","updateProductColor","createProductColor","deleteProductColor","saveMeta"])),{},{dataUpdateGeneral:function(){this.dataUpdatedGeneral=!0},checkDataUpdated:function(){return this.dataUpdatedGeneral||this.metaDataUpdated||this.dataUpdatedColors||this.dataUpdatedParameters||this.dataUpdatedBanner?(window.onbeforeunload=function(e){e.preventDefault(),e.returnValue=""},!0):(window.onbeforeunload=null,!1)},onColorAdd:function(e){var t=this.allColors.find((function(t){return t.id===e}));this.$set(this.colors,e.toString(),Object(o["a"])(Object(o["a"])({},t),{},{saved:!1,new:!0,images:[null]})),this.currentColorId=e,this.dataUpdatedColors=!0},onImageSet:function(e,t){var a=this.currentColor;a.saved=!1,""===e.file?t===a.images.length-1?a.images[t]=null:a.images.splice(t,1):a.images[t]=e;var n=a.images;null!==n[n.length-1]&&n.push(null),this.$set(this.colors,a.id.toString(),a),this.dataUpdatedColors=!0},onColorSave:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.waitColor){t.next=12;break}if(e.waitColor=!0,a={id:e.currentColor.relationId,product:parseInt(e.productId),color:e.currentColorId,files:e.currentColor.images.map((function(e){var t,a;return null!==(t=null!==(a=null===e||void 0===e?void 0:e.file)&&void 0!==a?a:null===e||void 0===e?void 0:e.src)&&void 0!==t?t:null})).filter((function(e){return e}))},n=e.currentColor,!e.currentColor.new){t.next=9;break}return t.next=7,e.createProductColor(a).then((function(t){e.$toasted.success("The product color was successfully created"),n.new=!1,n.saved=!0,n.relationId=t.data.id,e.$set(e.colors,n.id.toString(),n),e.checkColorsUpdated()})).catch((function(t){console.error(t),e.$toasted.error(t.response.data.message)}));case 7:t.next=11;break;case 9:return t.next=11,e.updateProductColor(a).then((function(){e.$toasted.success("The product color was successfully updated"),n.saved=!0,e.$set(e.colors,n.id.toString(),n),e.checkColorsUpdated()})).catch((function(t){console.error(t),e.$toasted.error(t.response.data.message)}));case 11:e.waitColor=!1;case 12:case"end":return t.stop()}}),t)})))()},onColorRemove:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$confirm("This will permanently delete the color of the product and its images. Continue?","Confirmation",{confirmButtonText:"Remove",cancelButtonText:"Cancel",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n,r,o,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.waitColor){t.next=9;break}if(e.waitColor=!0,a=!1,n=e.currentColorId.toString(),r=Object.assign({},e.colors),e.currentColor.new){t.next=7;break}return t.next=7,e.deleteProductColor({id:e.currentColor.relationId}).then((function(){e.$toasted.success("The color with id ".concat(n," was removed"))})).catch((function(t){a=!0,console.error(t),e.$toasted.error(t.response.data.message)}));case 7:a||(delete r[n],e.$set(e,"colors",r),e.currentColorId=null!==(o=null===(s=e.colorsValues[0])||void 0===s?void 0:s.id)&&void 0!==o?o:null,e.checkColorsUpdated()),e.waitColor=!1;case 9:case"end":return t.stop()}}),t)})))).catch((function(){}));case 1:case"end":return t.stop()}}),t)})))()},checkColorsUpdated:function(){this.dataUpdatedColors=this.colorsValues.some((function(e){return null!==e&&!e.saved}))},onCategorySelect:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t.category=e,t.parameters={};case 2:case"end":return a.stop()}}),a)})))()},onProductSave:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.waitGeneral){t.next=18;break}return e.waitGeneral=!0,n={name:e.name,name__az:e.nameAz,description:e.description,description__az:e.descriptionAz,slug:e.slug,slug__az:e.slugAz,hit:e.isHit,main_page:e.showOnMainPage,price:parseFloat(e.price?e.price:"0"),stock:parseInt(e.stock?e.stock:"0"),discount:parseFloat(e.discount?e.discount:"0"),brand:e.brand,id:parseInt(e.productId),category:e.category,devices:null!==(a=e.devices)&&void 0!==a&&a.length?e.devices.join(","):"",youtube:e.youtubeVideos||null,credit:e.canCredit},e.imageFile&&(n.file=e.imageFile),r=!0,t.next=7,e.updateProduct(n).catch((function(t){r="no-product",console.error(t),e.$toasted.error(t.response.data.message)}));case 7:if(!0===r&&e.$toasted.success("The product was successfully updated"),e.dataUpdatedGeneral=!1,e.waitGeneral=!1,!e.category||e.parameters.items){t.next=17;break}return e.parametersLoading=!0,t.next=14,e.getParameters();case 14:e.parametersLoading=!1,t.next=18;break;case 17:e.$set(e,"parameters",{});case 18:case"end":return t.stop()}}),t)})))()},onMetaSubmit:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.metaLoading){a.next=5;break}return t.metaLoading=!0,a.next=4,t.saveMeta({meta:Object(o["a"])(Object(o["a"])({},e),{},{product:t.productId}),metaId:null===(n=t.meta)||void 0===n?void 0:n.id}).then((function(e){t.meta=null===e||void 0===e?void 0:e.data,t.$toasted.success("Product's meta was successfully saved"),t.metaDataUpdated=!1})).catch((function(e){console.error(e),t.$toasted.error(e.response.data.message)}));case 4:t.metaLoading=!1;case 5:case"end":return a.stop()}}),a)})))()},onNameInput:function(){this.slugError="","ru"===this.activeLang?this.nameError="":"az"===this.activeLang&&(this.nameAzError=""),this.slugBasedOnName&&(this.slug=l(this.name).toLowerCase()),this.slugBasedOnNameAz&&(this.slugAz=l(this.nameAz).toLowerCase())},onDescriptionInput:function(){"ru"===this.activeLang?this.descriptionError="":"az"===this.activeLang&&(this.descriptionAzError="")},onSlugInput:function(){this.slugError="",this.slugBasedOnName=!this.slug,this.slugBasedOnNameAz=!this.slugAz,this.slug=l(this.slug).toLowerCase(),this.slugAz=l(this.slugAz).toLowerCase()},getParameters:function(){return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},onParametersSubmit:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.waitParameters){a.next=5;break}return t.waitParameters=!0,a.next=4,t.saveParameters({values:e.map((function(e){return Object(o["a"])(Object(o["a"])({},e),{},{product:parseInt(t.productId)})}))}).then((function(e){var a;if(t.$toasted.success("Product's parameters were successfully saved"),t.dataUpdatedParameters=!1,null!==e&&void 0!==e&&null!==(a=e.data)&&void 0!==a&&a.length){var n,r,o=null===(n=t.parameters)||void 0===n||null===(r=n.items)||void 0===r?void 0:r.slice();e.data.forEach((function(e){var t=o.find((function(t){return t.id===e.parameter.id}));t&&(t.relationId=e.id,t.value=e.value,t.value__az=e.value__az)})),t.$set(t.parameters,"items",o)}})).catch((function(e){console.error(e),t.$toasted.error(e.response.data.message)}));case 4:t.waitParameters=!1;case 5:case"end":return a.stop()}}),a)})))()}}),beforeRouteLeave:function(e,t,a){this.checkDataUpdated()?confirm("Changes you made may not be saved.")&&(window.onbeforeunload=null,a()):a()}},d=u,p=(a("a884"),a("2877")),m=Object(p["a"])(d,n,r,!1,null,null,null);t["default"]=m.exports},a884:function(e,t,a){"use strict";a("b12c")},b12c:function(e,t,a){},d81d:function(e,t,a){"use strict";var n=a("23e7"),r=a("b727").map,o=a("1dde"),s=o("map");n({target:"Array",proto:!0,forced:!s},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},f75e:function(e,t,a){}}]);
//# sourceMappingURL=chunk-1416f3c4.27d58d62.js.map