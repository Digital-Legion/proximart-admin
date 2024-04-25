(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04824016"],{"1ab2":function(e,t,r){"use strict";r("bf82")},bf82:function(e,t,r){},f513:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"add-edit-page"},[r("loading",{attrs:{active:e.loading,"can-cancel":!1,"is-full-page":!0},on:{"update:active":function(t){e.loading=t}}}),r("page-header",{attrs:{title:e.pageTitle}},[r("button",{staticClass:"g-button g-button--danger",attrs:{disabled:e.wait},on:{click:e.onRemove}},[r("font-awesome-icon",{attrs:{icon:"trash"}}),r("span",[e._v("Remove")])],1)]),e.order?r("page-box",{attrs:{double:!0},scopedSlots:e._u([{key:"bottom-content",fn:function(){return[r("div",{staticClass:"order-product-list"},e._l(e.order.products,(function(e){return r("OrderProduct",{key:e.id,attrs:{product:e}})})),1)]},proxy:!0}],null,!1,3351261014)},[r("div",{staticClass:"add-edit-page__left"},[e.order.name?r("custom-input",{staticClass:"mb-20",attrs:{value:e.order.name,label:"Client",readonly:!0}}):e._e(),e.order.phone?r("custom-input",{staticClass:"mb-20",attrs:{value:e.order.phone,label:"Phone",readonly:!0}}):e._e(),e.order.address?r("custom-input",{staticClass:"mb-20",attrs:{value:e.order.address,label:"Address",readonly:!0}}):e._e(),e.order.entrance?r("custom-input",{staticClass:"mb-20",attrs:{value:e.order.entrance,label:"Entrance",readonly:!0}}):e._e()],1),r("div",{staticClass:"add-edit-page__right"},[e.orderType?r("custom-input",{staticClass:"mb-20",attrs:{value:e.orderType,placeholder:"Order Type",label:"Order type",readonly:!0}}):e._e(),e.paymentMethod?r("custom-input",{staticClass:"mb-20",attrs:{value:e.paymentMethod,label:"Payment Method",readonly:!0}}):e._e(),e.order.total?r("custom-input",{staticClass:"mb-20",attrs:{value:e.order.total+" AZN",label:"Total",readonly:!0}}):e._e(),e.order.floor?r("custom-input",{staticClass:"mb-20",attrs:{value:e.order.floor,label:"Floor",readonly:!0}}):e._e()],1)]):e._e()],1)},a=[],o=r("5530"),d=r("1da1"),s=(r("96cf"),r("d3b7"),r("3ca3"),r("ddb0"),r("2f62")),i={name:"Order",components:{PageHeader:function(){return r.e("chunk-aefa6f68").then(r.bind(null,"36ad"))},PageBox:function(){return r.e("chunk-6977128a").then(r.bind(null,"e235"))},CustomInput:function(){return r.e("chunk-7fa08c76").then(r.bind(null,"ffcc"))},OrderProduct:function(){return r.e("chunk-ca1e8d12").then(r.bind(null,"c368"))}},data:function(){return{order:null,loading:!1,wait:!1}},mounted:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.fetchOrder(e.orderId).then((function(t){e.order=t.data})).catch((function(t){console.error(t),e.$toasted.error(t.response.data.message)}));case 3:e.loading=!1;case 4:case"end":return t.stop()}}),t)})))()},computed:{orderId:function(){return this.$route.params.id},pageTitle:function(){return"Order #".concat(this.orderId)},orderType:function(){var e,t,r,n;return"order"===(null===(e=this.order)||void 0===e?void 0:e.order_type)?n="Order":"pre-order"===(null===(t=this.order)||void 0===t?void 0:t.order_type)?n="Preorder":"buy_in_one_click"===(null===(r=this.order)||void 0===r?void 0:r.order_type)&&(n="Buy in one click"),n},paymentMethod:function(){var e,t,r;return"card"===(null===(e=this.order)||void 0===e?void 0:e.by_with)?r="Card":"cash"===(null===(t=this.order)||void 0===t?void 0:t.by_with)&&(r="Cash"),r}},methods:Object(o["a"])(Object(o["a"])({},Object(s["b"])("orders",["fetchOrder","removeOrder"])),{},{onRemove:function(){var e=this;this.$confirm("This will permanently delete the order. Continue?","Confirmation",{confirmButtonText:"Remove",cancelButtonText:"Cancel",type:"warning"}).then(Object(d["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.wait=!0,t.next=3,e.removeOrder(e.orderId).then((function(){var t;e.$message({type:"success",message:"Order with id ".concat(e.orderId," was removed")}),null===(t=e.$router.push("/orders"))||void 0===t||t.catch((function(){}))})).catch((function(t){console.error(t),e.$message({type:"error",message:t.response.data.message})}));case 3:e.wait=!1;case 4:case"end":return t.stop()}}),t)})))).catch((function(){}))}})},c=i,u=(r("1ab2"),r("2877")),l=Object(u["a"])(c,n,a,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-04824016.57b92682.js.map