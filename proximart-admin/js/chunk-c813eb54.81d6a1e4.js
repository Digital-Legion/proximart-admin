(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c813eb54"],{"0715":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"static-page"},[n("page-header",{attrs:{title:"Static"}}),n("page-box",{attrs:{title:"Upload"}},[n("button",{staticClass:"g-button static-page__upload-btn",attrs:{disabled:e.loading},on:{click:function(t){return e.$refs.fileInput.click()}}},[e._v(" Click to upload ")]),n("vue-json-pretty",{staticClass:"static-page__json",attrs:{data:e.lastUploadResponse}}),n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileInput",attrs:{type:"file"},on:{change:e.onChange}})],1)],1)},l=[],s=n("1da1"),a=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("bc3a")),i=n.n(a),r=n("838b"),c=n.n(r),u=(n("b83f"),{name:"StaticPage",components:{PageHeader:function(){return n.e("chunk-aefa6f68").then(n.bind(null,"36ad"))},PageBox:function(){return n.e("chunk-6977128a").then(n.bind(null,"e235"))},VueJsonPretty:c.a},data:function(){return{lastUploadResponse:{},loading:!1}},methods:{onChange:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var o,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(o=e.target.files[0],!o){n.next=8;break}return t.loading=!0,l=new FormData,l.append("file",o),n.next=7,i.a.post("/upload",l).then((function(e){t.$set(t,"lastUploadResponse",e.data)})).catch((function(e){var n,o;t.$toasted.error((null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.message)||(null===e||void 0===e||null===(o=e.response)||void 0===o?void 0:o.error)||"Не получилось загрузить, обратитесь к администратору")}));case 7:t.loading=!1;case 8:case"end":return n.stop()}}),n)})))()}}}),d=u,h=(n("c1e5"),n("2877")),p=Object(h["a"])(d,o,l,!1,null,null,null);t["default"]=p.exports},"2ff7":function(e,t,n){},"838b":function(e,t,n){!function(t,n){e.exports=n()}(0,(function(){return function(){"use strict";var e={102:function(e,t,n){function o(e,t,n,o,l,s,a,i){var r,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),a?(r=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),l&&l.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=r):l&&(r=i?function(){l.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:l),r)if(c.functional){c._injectStyles=r;var u=c.render;c.render=function(e,t){return r.call(t),u(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,r):[r]}return{exports:e,options:c}}n.r(t),n.d(t,{default:function(){return u}});var l=o({props:{data:{required:!0,type:String},collapsedOnClickBrackets:Boolean},methods:{toggleBrackets(e){this.collapsedOnClickBrackets&&this.$emit("click",e)}}},(function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",{staticClass:"vjs-tree__brackets",on:{click:function(t){return t.stopPropagation(),e.toggleBrackets(t)}}},[e._v(e._s(e.data))])}),[],!1,null,null,null).exports,s=o({props:{checked:{type:Boolean,default:!1},isMultiple:Boolean},data:()=>({focus:!1}),computed:{uiType(){return this.isMultiple?"checkbox":"radio"},model:{get(){return this.checked},set(e){this.$emit("input",e)}}}},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{class:["vjs-check-controller",e.checked?"is-checked":""],on:{click:function(e){e.stopPropagation()}}},[n("span",{class:"vjs-check-controller__inner is-"+e.uiType}),"checkbox"===e.uiType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],class:"vjs-check-controller__original is-"+e.uiType,attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.model)?e._i(e.model,null)>-1:e.model},on:{change:[function(t){var n=e.model,o=t.target,l=!!o.checked;if(Array.isArray(n)){var s=e._i(n,null);o.checked?s<0&&(e.model=n.concat([null])):s>-1&&(e.model=n.slice(0,s).concat(n.slice(s+1)))}else e.model=l},function(t){return e.$emit("change",e.model)}],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}):"radio"===e.uiType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],class:"vjs-check-controller__original is-"+e.uiType,attrs:{type:"radio"},domProps:{checked:e._q(e.model,null)},on:{change:[function(t){e.model=null},function(t){return e.$emit("change",e.model)}],focus:function(t){e.focus=!0},blur:function(t){e.focus=!1}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.model,expression:"model"}],class:"vjs-check-controller__original is-"+e.uiType,attrs:{type:e.uiType},domProps:{value:e.model},on:{change:function(t){return e.$emit("change",e.model)},focus:function(t){e.focus=!0},blur:function(t){e.focus=!1},input:function(t){t.target.composing||(e.model=t.target.value)}}})])}),[],!1,null,null,null);function a(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function i(e,t="root",n=0,{key:o,index:l,type:s="content",showComma:r=!1,length:c=1}={}){const u=a(e);if("array"===u){const l=e.map((e,o,l)=>i(e,`${t}[${o}]`,n+1,{index:o,showComma:o!==l.length-1,length:c,type:s})).reduce((e,t)=>e.concat(t),[]);return[i("[",t,n,{key:o,length:e.length,type:"arrayStart"})[0]].concat(l,i("]",t,n,{showComma:r,length:e.length,type:"arrayEnd"})[0])}if("object"===u){const a=Object.keys(e),u=a.map((o,l,a)=>i(e[o],o.includes(".")?`${t}["${o}"]`:`${t}.${o}`,n+1,{key:o,showComma:l!==a.length-1,length:c,type:s})).reduce((e,t)=>e.concat(t),[]);return[i("{",t,n,{key:o,index:l,length:a.length,type:"objectStart"})[0]].concat(u,i("}",t,n,{showComma:r,length:a.length,type:"objectEnd"})[0])}const d=Object.entries({content:e,level:n,key:o,index:l,path:t,showComma:r,length:c,type:s}).reduce((e,[t,n])=>void 0!==n?{...e,[t]:n}:e,{});return"object"===a(d)?[d]:d}var r=o({components:{Brackets:l,CheckController:s.exports},props:{node:{required:!0,type:Object},collapsed:Boolean,collapsedOnClickBrackets:Boolean,showDoubleQuotes:Boolean,showLength:Boolean,checked:Boolean,selectableType:{type:String,default:""},showSelectController:{type:Boolean,default:!1},showLine:{type:Boolean,default:!0},selectOnClickNode:{type:Boolean,default:!0},pathSelectable:{type:Function,default:()=>!0},highlightSelectedNode:{type:Boolean,default:!0},customValueFormatter:{type:Function,default:null}},computed:{valueClass(){return"vjs-value vjs-value__"+this.dataType},dataType(){return a(this.node.content)},prettyKey(){return this.showDoubleQuotes?`"${this.node.key}"`:this.node.key},selectable(){return this.pathSelectable(this.node.path,this.node.content)&&(this.isMultiple||this.isSingle)},isMultiple(){return"multiple"===this.selectableType},isSingle(){return"single"===this.selectableType}},methods:{defaultFormatter(e){let t=e+"";return"string"===this.dataType&&(t=`"${t}"`),t},valueFormatter(e){return this.customValueFormatter?this.customValueFormatter(e,this.node.key,this.node.path,this.defaultFormatter(e)):this.defaultFormatter(e)},onBracketsClick(){this.$emit("brackets-click",!this.collapsed,this.node.path)},onCheckedChange(){this.$emit("selected-change",this.node)},onTreeNodeClick(){this.$emit("tree-node-click",this.node),this.selectable&&this.selectOnClickNode&&this.$emit("selected-change",this.node)}}},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"vjs-tree__node":!0,"has-selector":e.showSelectController,"is-highlight":e.highlightSelectedNode&&e.checked},on:{click:e.onTreeNodeClick}},[e.showSelectController&&e.selectable&&"objectEnd"!==e.node.type&&"arrayEnd"!==e.node.type?[n("check-controller",{attrs:{"is-multiple":e.isMultiple,checked:e.checked},on:{change:e.onCheckedChange}})]:e._e(),e._l(e.node.level,(function(t,o){return n("div",{key:o,class:{"vjs-tree__indent":!0,"has-line":e.showLine}})})),e.node.key?n("span",{staticClass:"vjs-key"},[e._v(e._s(e.prettyKey)+":")]):e._e(),n("span",["content"!==e.node.type?n("brackets",{attrs:{data:e.node.content,"collapsed-on-click-brackets":e.collapsedOnClickBrackets},on:{click:e.onBracketsClick}}):e.customValueFormatter?n("span",{class:e.valueClass,domProps:{innerHTML:e._s(e.valueFormatter(e.node.content))}}):n("span",{class:e.valueClass,domProps:{textContent:e._s(e.valueFormatter(e.node.content))}}),e.node.showComma?n("span",[e._v(",")]):e._e(),e.showLength&&e.collapsed?n("span",{staticClass:"vjs-comment"},[e._v(" // "+e._s(e.node.length)+" items ")]):e._e()],1)],2)}),[],!1,null,null,null),c=o({name:"VueJsonPretty",components:{TreeNode:r.exports},props:{data:{type:[String,Number,Boolean,Array,Object],default:null},deep:{type:Number,default:1/0},deepCollapseChildren:{type:Boolean,default:!1},path:{type:String,default:"root"},virtual:{type:Boolean,default:!1},itemHeight:{type:Number,default:20},showLength:{type:Boolean,default:!1},showDoubleQuotes:{type:Boolean,default:!0},selectableType:{type:String,default:""},showSelectController:{type:Boolean,default:!1},showLine:{type:Boolean,default:!0},selectOnClickNode:{type:Boolean,default:!0},value:{type:[Array,String],default:()=>""},pathSelectable:{type:Function,default:()=>!0},highlightSelectedNode:{type:Boolean,default:!0},collapsedOnClickBrackets:{type:Boolean,default:!0},customValueFormatter:{type:Function,default:null},virtualLines:{type:Number,default:10}},data(){return{translateY:0,visibleData:null,hiddenPaths:i(this.data,this.path).reduce((e,t)=>{const n=this.deepCollapseChildren?t.level>=this.deep:t.level===this.deep;return"objectStart"!==t.type&&"arrayStart"!==t.type||!n?e:{...e,[t.path]:1}},{})}},computed:{flatData(){let e=null;return i(this.data,this.path).reduce((t,n,o)=>{const l={...n,id:o},s=this.hiddenPaths[l.path];if(e&&e.path===l.path){const n="objectStart"===e.type,o={...e,...l,content:n?"{...}":"[...]",type:n?"objectCollapsed":"arrayCollapsed"};return e=null,t.concat(o)}return s&&!e?(e=l,t):e?t:t.concat(l)},[])},selectedPaths:{get(){return this.value&&"single"===this.selectableType?[this.value]:this.value||[]},set(e){this.$emit("input",e)}},propsError(){return!this.selectableType||this.selectOnClickNode||this.showSelectController?"":"When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail."}},watch:{propsError:{handler(e){if(e)throw new Error("[VueJsonPretty] "+e)},immediate:!0},flatData:{handler(){this.onTreeScroll()},immediate:!0}},methods:{onTreeScroll(){if(this.virtual){const e=this.virtualLines,t=this.$refs.tree&&this.$refs.tree.scrollTop||0,n=Math.floor(t/this.itemHeight);let o=n<0?0:n+e>this.flatData.length?this.flatData.length-e:n;o<0&&(o=0);const l=o+e;this.translateY=o*this.itemHeight,this.visibleData=this.flatData.filter((e,t)=>t>=o&&t<l)}else this.visibleData=this.flatData},onSelectedChange({path:e}){const t=this.selectableType;if("multiple"===t){const t=this.selectedPaths.findIndex(t=>t===e),n=[...this.selectedPaths];-1!==t?this.selectedPaths.splice(t,1):this.selectedPaths.push(e),this.$emit("change",this.selectedPaths,n)}else if("single"===t&&this.selectedPaths!==e){const t=this.selectedPaths,n=e;this.selectedPaths=n,this.$emit("change",n,t)}},onTreeNodeClick({content:e,path:t}){this.$emit("click",t,e)},onBracketsClick(e,t){if(e)this.hiddenPaths={...this.hiddenPaths,[t]:1};else{const e={...this.hiddenPaths};delete e[t],this.hiddenPaths=e}}}},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"tree",class:{"vjs-tree":!0,"is-virtual":e.virtual},on:{scroll:e.onTreeScroll}},[n("div",{style:e.virtual&&{height:e.flatData.length*e.itemHeight+"px"}},[n("div",{style:e.virtual&&{transform:"translateY("+e.translateY+"px)"}},e._l(e.visibleData,(function(t){return n("tree-node",{key:t.id,attrs:{node:t,collapsed:!!e.hiddenPaths[t.path],"custom-value-formatter":e.customValueFormatter,"show-double-quotes":e.showDoubleQuotes,"show-length":e.showLength,"collapsed-on-click-brackets":e.collapsedOnClickBrackets,checked:e.selectedPaths.includes(t.path),"selectable-type":e.selectableType,"show-line":e.showLine,"show-select-controller":e.showSelectController,"select-on-click-node":e.selectOnClickNode,"path-selectable":e.pathSelectable,"highlight-selected-node":e.highlightSelectedNode},on:{"tree-node-click":e.onTreeNodeClick,"brackets-click":e.onBracketsClick,"selected-change":e.onSelectedChange}})})),1)])])}),[],!1,null,null,null).exports,u=Object.assign({},c,{version:"1.8.3"})}},t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}return n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(102)}()}))},b83f:function(e,t,n){},c1e5:function(e,t,n){"use strict";n("2ff7")}}]);
//# sourceMappingURL=chunk-c813eb54.81d6a1e4.js.map