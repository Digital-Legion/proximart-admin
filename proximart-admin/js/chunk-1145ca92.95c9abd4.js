(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1145ca92"],{"08c4":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"parameters-page"},[t("page-header",{attrs:{title:"Parameters of "+(e.category?e.category.name:"")}},[t("button",{staticClass:"g-button g-button--icon",on:{click:e.onCreateDialog}},[t("font-awesome-icon",{attrs:{icon:"plus"}})],1)]),t("page-box",[t("parameters-table",{attrs:{page:e.page},on:{"set-page":function(a){e.page=a},"edit-parameter":e.onEditDialog}})],1),t("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("page-tabs",{attrs:{value:e.activeLang,options:e.filteredLangs},on:{input:e.setActiveLang}}),"ru"===e.activeLang?t("custom-input",{staticClass:"mb-20",attrs:{label:"Name",placeholder:"Enter placeholder's name"},model:{value:e.name,callback:function(a){e.name=a},expression:"name"}}):"az"===e.activeLang?t("custom-input",{staticClass:"mb-20",attrs:{label:"Name",placeholder:"Enter placeholder's name"},model:{value:e.nameAz,callback:function(a){e.nameAz=a},expression:"nameAz"}}):e._e(),"create"===e.dialogType?t("button",{staticClass:"g-button",on:{click:e.onCreate}},[e._v("Create")]):"edit"===e.dialogType?t("button",{staticClass:"g-button",on:{click:e.onEdit}},[e._v("Update")]):e._e()],1)],1)},r=[],i=t("5530"),c=t("1da1"),o=(t("96cf"),t("d3b7"),t("3ca3"),t("ddb0"),t("d81d"),t("b0c0"),t("2f62")),s={name:"Categories",components:{PageHeader:function(){return t.e("chunk-aefa6f68").then(t.bind(null,"36ad"))},PageTabs:function(){return t.e("chunk-e85c4fcc").then(t.bind(null,"f83a"))},PageBox:function(){return t.e("chunk-6977128a").then(t.bind(null,"e235"))},ParametersTable:function(){return t.e("chunk-cf621416").then(t.bind(null,"aab9"))},CustomInput:function(){return t.e("chunk-7fa08c76").then(t.bind(null,"ffcc"))}},data:function(){return{category:null,dialogVisible:!1,page:1,name:"",nameAz:"",dialogTitle:"",dialogType:""}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.fetchCategory(e.$route.params.id).then((function(a){e.category=a.data})).catch((function(a){console.error(a),e.$router.push("/categories")}));case 2:case"end":return a.stop()}}),a)})))()},computed:Object(i["a"])(Object(i["a"])({},Object(o["d"])(["activeLang","langs"])),{},{filteredLangs:function(){var e=this;return this.langs.map((function(a){return Object(i["a"])(Object(i["a"])({},a),{},{error:"ru"===a.title?e.defaultLangError:"az"===a.title&&e.azLangError})}))}}),methods:Object(i["a"])(Object(i["a"])(Object(i["a"])(Object(i["a"])({},Object(o["c"])(["setActiveLang"])),Object(o["b"])("categories",["fetchCategory"])),Object(o["b"])("parameters",["createParameter","fetchParameters","updateParameter"])),{},{onCreateDialog:function(){this.dialogTitle="Creating a new parameter",this.dialogType="create",this.dialogVisible=!0},onEditDialog:function(e){this.dialogTitle="Updating the parameter ".concat(e.name),this.dialogType="edit",this.name=e.name,this.nameAz=e.name__az,this.dialogVisible=!0},onCreate:function(){var e=this,a={name:this.name,name__az:this.nameAz,category:this.category.id};this.createParameter(a).then((function(){e.$toasted.success("The new parameter ".concat(e.name," was created")),e.name="",e.nameAz="",1!==e.page?e.page=1:e.fetchParameters({page:e.page,categoryId:e.category.id})})).catch((function(a){console.error(a),e.$toasted.error(a.response.data.message)}))},onEdit:function(){var e=this,a={name:this.name,name__az:this.nameAz,category:this.category.id};this.updateParameter({data:a,id:this.category.id}).then((function(){e.$toasted.success("The parameter ".concat(e.name," was updated")),e.name="",e.nameAz="",1!==e.page?e.page=1:e.fetchParameters({page:e.page,categoryId:e.category.id})})).catch((function(a){console.error(a),e.$toasted.error(a.response.data.message)}))}})},l=s,u=t("2877"),d=Object(u["a"])(l,n,r,!1,null,null,null);a["default"]=d.exports},d81d:function(e,a,t){"use strict";var n=t("23e7"),r=t("b727").map,i=t("1dde"),c=i("map");n({target:"Array",proto:!0,forced:!c},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-1145ca92.95c9abd4.js.map