(function(t){function e(e){for(var s,a,o=e[0],c=e[1],u=e[2],l=0,d=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);p&&p(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],s=!0,a=1;a<n.length;a++){var o=n[a];0!==i[o]&&(s=!1)}s&&(r.splice(e--,1),t=c(c.s=n[0]))}return t}var s={},a={app:0},i={app:0},r=[];function o(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-2d2176e8":"6760ed39","chunk-378af9f8":"5a854569","chunk-da56411a":"fc01cb9f"}[t]+".js"}function c(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-378af9f8":1,"chunk-da56411a":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var s="css/"+({}[t]||t)+"."+{"chunk-2d2176e8":"31d6cfe0","chunk-378af9f8":"cebc69d9","chunk-da56411a":"d258df2b"}[t]+".css",i=c.p+s,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var u=r[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===s||l===i))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){u=d[o],l=u.getAttribute("data-href");if(l===s||l===i)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var s=e&&e.target&&e.target.src||i,r=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=s,delete a[t],p.parentNode.removeChild(p),n(r)},p.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){a[t]=0})));var s=i[t];if(0!==s)if(s)e.push(s[2]);else{var r=new Promise((function(e,n){s=i[t]=[e,n]}));e.push(s[2]=r);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=o(t);var d=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=i[t];if(0!==n){if(n){var s=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+s+": "+a+")",d.name="ChunkLoadError",d.type=s,d.request=a,n[1](d)}i[t]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=s,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)c.d(n,s,function(e){return t[e]}.bind(null,s));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var p=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2395:function(t,e,n){},"298c":function(t,e,n){"use strict";n("bb94")},"480e":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],r=n("5530"),o=(n("ac1f"),n("5319"),n("2f62")),c={created:function(){this.SET_AUTHENTICATED(),0==this.isAuthenticated&&this.$router.replace("/login")},computed:Object(r["a"])({},Object(o["c"])(["isAuthenticated"])),methods:Object(r["a"])({},Object(o["d"])(["SET_AUTHENTICATED"])),beforeDestroy:function(){window.onunload((function(){localStorage.clear()}))}},u=c,l=(n("7c55"),n("2877")),d=Object(l["a"])(u,a,i,!1,null,null,null),p=d.exports,m=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticClass:"success-alert"},[t._v("Access Successful!")]),n("Sidebar",{staticClass:"sidebar"}),n("keep-alive",[n("router-view",{staticClass:"display"})],1)],1)},h=[],g=(n("e9c4"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[n("div",{staticClass:"sidebar-container"},[n("div",{staticClass:"sidebar-header"},[n("div",{staticClass:"user-name-tag sidebar-item-text"},[t._v(t._s(t.userName))]),n("div",{staticClass:"sidebar-item",attrs:{id:"menu-button"},on:{click:function(e){return t.toggleSidebar()}}},[n("unicon",{attrs:{name:"bars",width:"35",height:"35"}})],1)]),n("div",{staticClass:"sidebar-body"},[n("ul",[n("li",t._l(t.sidebarItems,(function(e){return n("router-link",{key:e.text,staticClass:"sidebar-item",attrs:{to:{name:e.name}}},[n("unicon",{attrs:{name:e.icon}}),n("span",{staticClass:"sidebar-item-text"},[t._v(t._s(e.title))]),e.sub?n("span",{staticClass:"notification-bubble sidebar-item-text"},[t._v(t._s(e.sub))]):t._e()],1)})),1)])]),n("div",{staticClass:"sidebar-footer"},[n("router-link",{staticClass:"router-link",attrs:{to:"/login"}},[n("div",{staticClass:"sidebar-item",attrs:{id:"sign-out-button"},on:{click:function(e){return t.SIGN_OUT()}}},[n("unicon",{attrs:{name:"signout"}}),n("span",{staticClass:"sidebar-item-text"},[t._v("Sign out")])],1)])],1)])])}),b=[],v=(n("159b"),{data:function(){return{sidebarItems:[{title:"Trang chủ",icon:"estate",name:"Dashboard"},{title:"Thông tin cá nhân",icon:"user",name:"Info"},{title:"Thông báo",icon:"envelope-alt",sub:20,name:"Message"},{title:"Xuất hóa đơn",icon:"bill",name:"Receipt"},{title:"Kho",icon:"inbox",name:"Storage"},{title:"Cài đặt",icon:"setting",name:"Setting"}]}},computed:Object(r["a"])(Object(r["a"])({},Object(o["c"])(["userName","isManager"])),Object(o["e"])(["isAuthenticated"])),methods:Object(r["a"])({toggleSidebar:function(){var t=document.querySelector(".sidebar"),e=t.querySelector("ul"),n=t.querySelector(".sidebar-header"),s=t.querySelectorAll(".sidebar-item-text");t.classList.toggle("close"),n.classList.toggle("close"),e.classList.toggle("close"),s.forEach((function(t){t.classList.toggle("close")}))}},Object(o["d"])(["SIGN_OUT"]))}),_=v,y=(n("f2f8"),Object(l["a"])(_,g,b,!1,null,"57dd9fe0",null)),E=y.exports,S={components:{Sidebar:E},computed:Object(r["a"])({},Object(o["c"])(["componentName","isAuthenticated"])),methods:{successAlert:function(){var t=document.querySelector(".success-alert");this.isAuthenticated&&(t.classList.toggle("show"),setTimeout((function(){t.classList.remove("show")}),3e3),t.remove,sessionStorage.setItem("loaded",JSON.stringify("false")))}},mounted:function(){null===sessionStorage.getItem("loaded")&&this.successAlert()}},C=S,O=(n("90c1"),Object(l["a"])(C,f,h,!1,null,"730794b8",null)),j=O.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[t.isManager?n("div",{staticClass:"home-container",class:t.isSingleDisplay?"disable":""},[n("h1",[t._v("Trang chủ")]),n("div",{staticClass:"search-form"},[n("button",{on:{click:t.bindingData}},[t._v("Show All")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.filter()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.empName,expression:"empName"}],attrs:{type:"text",placeholder:"Search by name"},domProps:{value:t.empName},on:{input:function(e){e.target.composing||(t.empName=e.target.value)}}})])]),n("table",[n("tr",t._l(t.titles,(function(e){return n("th",{key:e},[t._v(t._s(e))])})),0),t._l(t.empList,(function(e){return n("router-link",{key:e.id,staticClass:"employee-row",attrs:{tag:"tr",to:{name:"User",params:{id:e.id}}}},[n("td",[t._v(t._s(e.id))]),n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.age))]),n("td",[t._v(t._s(e.gender))]),n("td",[t._v(t._s(e.contact))]),n("td",{class:"Online"==e.status?"is-online":"is-offline"},[t._v(" "+t._s(e.status)+" ")])])}))],2)]):n("div",{staticClass:"manager-only"},[n("h1",[t._v("Manager Only!")])]),n("router-view",{staticClass:"singleUser",on:{changeDisplay:t.singleDisplay}})],1)},x=[],A=(n("4de4"),n("caad"),n("2532"),n("b0c0"),{data:function(){return{empName:"",titles:["ID","Name","Age","Gender","Contact","Status"],isSingleDisplay:!1,empList:[]}},computed:Object(r["a"])({},Object(o["c"])(["isManager","getListEmp"])),created:function(){this.fetchEmpList(),this.empList=this.getListEmp},methods:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["fetchEmpList"])),{},{filter:function(){var t=this;this.bindingData(),this.empList=this.empList.filter((function(e){return t.removeAccents(e.name).toLowerCase().includes(t.removeAccents(t.empName).toLowerCase())}))},removeAccents:function(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D")},singleDisplay:function(t){this.isSingleDisplay=t},bindingData:function(){this.empList=this.getListEmp}})}),I=A,N=(n("b9c9"),Object(l["a"])(I,w,x,!1,null,"5b48e11f",null)),T=N.exports,k=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},L=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"info"},[n("h1",[t._v("User Infomation")])])}],P={},D=P,M=Object(l["a"])(D,k,L,!1,null,null,null),$=M.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"user"},[n("div",{staticClass:"header"},[n("div",{staticClass:"header-img-box"},[n("img",{attrs:{src:t.emp.avatar,alt:""}})]),n("div",{staticClass:"header-name-box"},[n("p",{staticClass:"header-name"},[t._v(t._s(t.emp.name))]),n("p",{staticClass:"header-role"},[t._v(t._s(t.role))])])]),n("div",{staticClass:"body"},[n("div",{staticClass:"body-info-box"},[n("form",[n("div",{staticClass:"input-box"},[n("label",{attrs:{for:"input"}},[t._v("Name: ")]),n("input",{class:t.isInputting?"":"input-toggle",attrs:{type:"text",name:"input",disabled:t.isInputting},domProps:{value:t.emp.name}})]),n("div",{staticClass:"input-box"},[n("label",{attrs:{for:"input"}},[t._v("Age: ")]),n("input",{class:t.isInputting?"":"input-toggle",attrs:{type:"text",name:"input",disabled:t.isInputting},domProps:{value:t.emp.age}})]),n("div",{staticClass:"input-box"},[n("label",{attrs:{for:"input"}},[t._v("Gender: ")]),n("input",{class:t.isInputting?"":"input-toggle",attrs:{type:"text",name:"input",disabled:t.isInputting},domProps:{value:t.emp.name?"Male":"Female"}})]),n("div",{staticClass:"input-box"},[n("label",{attrs:{for:"input"}},[t._v("Contact: ")]),n("input",{class:t.isInputting?"":"input-toggle",attrs:{type:"text",name:"input",disabled:t.isInputting},domProps:{value:t.emp.contact}})]),n("div",{staticClass:"input-box"},[n("label",{attrs:{for:"input"}},[t._v("Account: ")]),n("input",{class:t.isInputting?"":"input-toggle",attrs:{type:"text",name:"input",disabled:t.isInputting},domProps:{value:t.emp.account}})]),n("div",{staticClass:"input-box"},[n("label",{attrs:{for:"input"}},[t._v("Password: ")]),n("input",{class:t.isInputting?"":"input-toggle",attrs:{type:"text",name:"input",disabled:t.isInputting},domProps:{value:t.emp.password}})])])])])])},G=[],q={data:function(){return{id:this.$route.params.id,emp:{},role:"",isInputting:!0}},created:function(){this.setEmp(this.id)},mounted:function(){this.$emit("changeDisplay",!0),this.emp=this.getEmp,this.emp.level.isManager?this.role="Manager":this.role="Employee"},destroyed:function(){this.$emit("changeDisplay",!1)},computed:Object(r["a"])({},Object(o["c"])(["getEmp"])),methods:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["fetchEmpList"])),{},{setEmp:function(t){this.$store.commit("SET_SINGLE_EMP",t)}})},J=q,H=(n("298c"),Object(l["a"])(J,U,G,!1,null,"0a65bee1",null)),R=H.exports,F=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},B=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message"},[n("h1",[t._v("User Message")])])}],K={},z=K,X=Object(l["a"])(z,F,B,!1,null,null,null),Q=X.exports,V=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},W=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"receipt"},[n("h1",[t._v("User Receipt")])])}],Y={},Z=Y,tt=Object(l["a"])(Z,V,W,!1,null,null,null),et=tt.exports,nt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},st=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"storage"},[n("h1",[t._v("Storage")])])}],at={},it=at,rt=Object(l["a"])(it,nt,st,!1,null,null,null),ot=rt.exports,ct=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},ut=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"setting"},[n("h1",[t._v("Setting")])])}],lt={},dt=lt,pt=Object(l["a"])(dt,ct,ut,!1,null,null,null),mt=pt.exports;s["a"].use(m["a"]);var ft=[{path:"/",name:"Display",component:j,children:[{path:"dashboard",name:"Dashboard",component:T,children:[{path:"user/:id",name:"User",component:R}]},{path:"info",name:"Info",component:$},{path:"message",name:"Message",component:Q},{path:"receipt",name:"Receipt",component:et},{path:"storage",name:"Storage",component:ot},{path:"setting",name:"Setting",component:mt}]},{path:"/login",name:"Login",component:function(){return n.e("chunk-da56411a").then(n.bind(null,"a55b"))},children:[]},{path:"/forgotPassword",name:"ForgotPassword",component:function(){return n.e("chunk-2d2176e8").then(n.bind(null,"c764"))}},{path:"/signup",name:"Signup",component:function(){return n.e("chunk-378af9f8").then(n.bind(null,"4733"))}}],ht=new m["a"]({mode:"history",base:"/",routes:ft}),gt=ht,bt=n("1da1"),vt=(n("96cf"),n("bc3a")),_t=n.n(vt),yt={state:{auth:{isAuthenticated:!1},user:{id:1,name:"Nguyễn Thành Huy",level:{isManager:!0},account:"huyhehe",password:"123456"},listEmp:{},singleEmp:{}},mutations:{SIGN_IN:function(t,e){var n=e.userAccount,s=e.userPassword;n==t.user.account&&s==t.user.password&&(t.auth.isAuthenticated=!0),sessionStorage.setItem("isAuthenticated",JSON.stringify(t.auth.isAuthenticated)),t.auth.isAuthenticated&&gt.push("/")},SIGN_OUT:function(t){t.auth.isAuthenticated=!1,sessionStorage.setItem("isAuthenticated",JSON.stringify(t.auth.isAuthenticated)),sessionStorage.removeItem("loaded")},SET_AUTHENTICATED:function(t){null!=sessionStorage.getItem("isAuthenticated")&&(t.auth.isAuthenticated=JSON.parse(sessionStorage.getItem("isAuthenticated")))},SET_EMP_LIST:function(t,e){for(var n in t.listEmp=e,e)if(e[n].account==t.user.account){e[n].status="Online";break}},SET_SINGLE_EMP:function(t,e){for(var n in t.listEmp)e-1==n&&(t.singleEmp=t.listEmp[n])}},getters:{isAuthenticated:function(t){return t.auth.isAuthenticated},isManager:function(t){return t.user.level.isManager},userName:function(t){return t.user.name},getListEmp:function(t){return t.listEmp},getEmp:function(t){return t.singleEmp}},actions:{checkLogin:function(t,e){var n=t.commit,s=e.userAccount,a=e.userPassword;n("SIGN_IN",{userAccount:s,userPassword:a})},fetchEmpList:function(t){return Object(bt["a"])(regeneratorRuntime.mark((function e(){var n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.prev=1,e.next=4,_t.a.get("http://localhost:3000/users");case 4:s=e.sent,n("SET_EMP_LIST",s.data),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()}}},Et=n("0e44");s["a"].use(o["a"]);var St=new o["a"].Store({state:{},mutations:{},actions:{},modules:{auth:yt},plugins:[Object(Et["a"])({storage:window.sessionStorage})]}),Ct=n("cb81"),Ot=n.n(Ct),jt=n("d327");Ot.a.add([jt["a"],jt["e"],jt["f"],jt["i"],jt["g"],jt["d"],jt["b"],jt["h"],jt["c"]]),s["a"].use(Ot.a),s["a"].config.productionTip=!1,new s["a"]({router:gt,store:St,render:function(t){return t(p)}}).$mount("#app")},"612a":function(t,e,n){},"7c55":function(t,e,n){"use strict";n("2395")},"7ef7":function(t,e,n){},"90c1":function(t,e,n){"use strict";n("7ef7")},b9c9:function(t,e,n){"use strict";n("612a")},bb94:function(t,e,n){},f2f8:function(t,e,n){"use strict";n("480e")}});
//# sourceMappingURL=app.4753c9bf.js.map