(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"09a1":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"input-group"},[n("v-uni-view",{staticClass:"input-row border"},[n("v-uni-text",{staticClass:"title"},[t._v("账号：")]),n("m-input",{staticClass:"m-input",attrs:{type:"text",clearable:"",focus:"",placeholder:"请输入账号"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),n("v-uni-view",{staticClass:"input-row"},[n("v-uni-text",{staticClass:"title"},[t._v("密码：")]),n("m-input",{attrs:{type:"password",displayable:"",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),n("v-uni-view",{staticClass:"btn-row"},[n("v-uni-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(e){e=t.$handleEvent(e),t.bindLogin(e)}}},[t._v("登录")])],1),n("v-uni-view",{staticClass:"action-row"},[n("v-uni-navigator",{attrs:{url:"../reg/reg"}},[t._v("注册账号")]),n("v-uni-text",[t._v("|")]),n("v-uni-navigator",{attrs:{url:"../pwd/pwd"}},[t._v("忘记密码")])],1),t.hasProvider?n("v-uni-view",{staticClass:"oauth-row",style:{top:t.positionTop+"px"}},t._l(t.providerList,function(e){return n("v-uni-view",{key:e.value,staticClass:"oauth-image"},[n("v-uni-image",{attrs:{src:e.image},on:{click:function(n){n=t.$handleEvent(n),t.oauth(e.value)}}})],1)})):t._e()],1)},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"247a":function(t,e,n){"use strict";var o=n("57d8"),a=n.n(o);a.a},"271b":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={props:{type:String,color:String,size:{type:[Number,String],default:24}},computed:{fontSize:function(){var t=Number(this.size);return t=isNaN(t)?24:t,"".concat(t,"px")}},methods:{onClick:function(){this.$emit("click")}}};e.default=o},"2b65":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o="USERS_KEY",a=function(){var t="";return t=uni.getStorageSync(o),t||(t="[]"),JSON.parse(t)},i=function(t){var e=a();e.push({account:t.account,password:t.password}),uni.setStorageSync(o,JSON.stringify(e))},c={getUsers:a,addUser:i};e.default=c},3749:function(t,e,n){"use strict";n.r(e);var o=n("9dde"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},4537:function(t,e,n){var o=n("522e");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=n("4f06").default;a("a916aecc",o,!0,{sourceMap:!1,shadowMode:!1})},"522e":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'@font-face{font-family:uniicons;font-weight:400;font-style:normal;src:url(https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf?t=1536565627510) format("truetype")}.m-icon[data-v-6f0896a0]{font-family:uniicons;font-size:%?48?%;font-weight:400;font-style:normal;line-height:1;display:inline-block;text-decoration:none;-webkit-font-smoothing:antialiased}.m-icon.uni-active[data-v-6f0896a0]{color:#007aff}.m-icon-contact[data-v-6f0896a0]:before{content:"\\E100"}.m-icon-person[data-v-6f0896a0]:before{content:"\\E101"}.m-icon-personadd[data-v-6f0896a0]:before{content:"\\E102"}.m-icon-contact-filled[data-v-6f0896a0]:before{content:"\\E130"}.m-icon-person-filled[data-v-6f0896a0]:before{content:"\\E131"}.m-icon-personadd-filled[data-v-6f0896a0]:before{content:"\\E132"}.m-icon-phone[data-v-6f0896a0]:before{content:"\\E200"}.m-icon-email[data-v-6f0896a0]:before{content:"\\E201"}.m-icon-chatbubble[data-v-6f0896a0]:before{content:"\\E202"}.m-icon-chatboxes[data-v-6f0896a0]:before{content:"\\E203"}.m-icon-phone-filled[data-v-6f0896a0]:before{content:"\\E230"}.m-icon-email-filled[data-v-6f0896a0]:before{content:"\\E231"}.m-icon-chatbubble-filled[data-v-6f0896a0]:before{content:"\\E232"}.m-icon-chatboxes-filled[data-v-6f0896a0]:before{content:"\\E233"}.m-icon-weibo[data-v-6f0896a0]:before{content:"\\E260"}.m-icon-weixin[data-v-6f0896a0]:before{content:"\\E261"}.m-icon-pengyouquan[data-v-6f0896a0]:before{content:"\\E262"}.m-icon-chat[data-v-6f0896a0]:before{content:"\\E263"}.m-icon-qq[data-v-6f0896a0]:before{content:"\\E264"}.m-icon-videocam[data-v-6f0896a0]:before{content:"\\E300"}.m-icon-camera[data-v-6f0896a0]:before{content:"\\E301"}.m-icon-mic[data-v-6f0896a0]:before{content:"\\E302"}.m-icon-location[data-v-6f0896a0]:before{content:"\\E303"}.m-icon-mic-filled[data-v-6f0896a0]:before,.m-icon-speech[data-v-6f0896a0]:before{content:"\\E332"}.m-icon-location-filled[data-v-6f0896a0]:before{content:"\\E333"}.m-icon-micoff[data-v-6f0896a0]:before{content:"\\E360"}.m-icon-image[data-v-6f0896a0]:before{content:"\\E363"}.m-icon-map[data-v-6f0896a0]:before{content:"\\E364"}.m-icon-compose[data-v-6f0896a0]:before{content:"\\E400"}.m-icon-trash[data-v-6f0896a0]:before{content:"\\E401"}.m-icon-upload[data-v-6f0896a0]:before{content:"\\E402"}.m-icon-download[data-v-6f0896a0]:before{content:"\\E403"}.m-icon-close[data-v-6f0896a0]:before{content:"\\E404"}.m-icon-redo[data-v-6f0896a0]:before{content:"\\E405"}.m-icon-undo[data-v-6f0896a0]:before{content:"\\E406"}.m-icon-refresh[data-v-6f0896a0]:before{content:"\\E407"}.m-icon-star[data-v-6f0896a0]:before{content:"\\E408"}.m-icon-plus[data-v-6f0896a0]:before{content:"\\E409"}.m-icon-minus[data-v-6f0896a0]:before{content:"\\E410"}.m-icon-checkbox[data-v-6f0896a0]:before,.m-icon-circle[data-v-6f0896a0]:before{content:"\\E411"}.m-icon-clear[data-v-6f0896a0]:before,.m-icon-close-filled[data-v-6f0896a0]:before{content:"\\E434"}.m-icon-refresh-filled[data-v-6f0896a0]:before{content:"\\E437"}.m-icon-star-filled[data-v-6f0896a0]:before{content:"\\E438"}.m-icon-plus-filled[data-v-6f0896a0]:before{content:"\\E439"}.m-icon-minus-filled[data-v-6f0896a0]:before{content:"\\E440"}.m-icon-circle-filled[data-v-6f0896a0]:before{content:"\\E441"}.m-icon-checkbox-filled[data-v-6f0896a0]:before{content:"\\E442"}.m-icon-closeempty[data-v-6f0896a0]:before{content:"\\E460"}.m-icon-refreshempty[data-v-6f0896a0]:before{content:"\\E461"}.m-icon-reload[data-v-6f0896a0]:before{content:"\\E462"}.m-icon-starhalf[data-v-6f0896a0]:before{content:"\\E463"}.m-icon-spinner[data-v-6f0896a0]:before{content:"\\E464"}.m-icon-spinner-cycle[data-v-6f0896a0]:before{content:"\\E465"}.m-icon-search[data-v-6f0896a0]:before{content:"\\E466"}.m-icon-plusempty[data-v-6f0896a0]:before{content:"\\E468"}.m-icon-forward[data-v-6f0896a0]:before{content:"\\E470"}.m-icon-back[data-v-6f0896a0]:before,.m-icon-left-nav[data-v-6f0896a0]:before{content:"\\E471"}.m-icon-checkmarkempty[data-v-6f0896a0]:before{content:"\\E472"}.m-icon-home[data-v-6f0896a0]:before{content:"\\E500"}.m-icon-navigate[data-v-6f0896a0]:before{content:"\\E501"}.m-icon-gear[data-v-6f0896a0]:before{content:"\\E502"}.m-icon-paperplane[data-v-6f0896a0]:before{content:"\\E503"}.m-icon-info[data-v-6f0896a0]:before{content:"\\E504"}.m-icon-help[data-v-6f0896a0]:before{content:"\\E505"}.m-icon-locked[data-v-6f0896a0]:before{content:"\\E506"}.m-icon-more[data-v-6f0896a0]:before{content:"\\E507"}.m-icon-flag[data-v-6f0896a0]:before{content:"\\E508"}.m-icon-home-filled[data-v-6f0896a0]:before{content:"\\E530"}.m-icon-gear-filled[data-v-6f0896a0]:before{content:"\\E532"}.m-icon-info-filled[data-v-6f0896a0]:before{content:"\\E534"}.m-icon-help-filled[data-v-6f0896a0]:before{content:"\\E535"}.m-icon-more-filled[data-v-6f0896a0]:before{content:"\\E537"}.m-icon-settings[data-v-6f0896a0]:before{content:"\\E560"}.m-icon-list[data-v-6f0896a0]:before{content:"\\E562"}.m-icon-bars[data-v-6f0896a0]:before{content:"\\E563"}.m-icon-loop[data-v-6f0896a0]:before{content:"\\E565"}.m-icon-paperclip[data-v-6f0896a0]:before{content:"\\E567"}.m-icon-eye[data-v-6f0896a0]:before{content:"\\E568"}.m-icon-arrowup[data-v-6f0896a0]:before{content:"\\E580"}.m-icon-arrowdown[data-v-6f0896a0]:before{content:"\\E581"}.m-icon-arrowleft[data-v-6f0896a0]:before{content:"\\E582"}.m-icon-arrowright[data-v-6f0896a0]:before{content:"\\E583"}.m-icon-arrowthinup[data-v-6f0896a0]:before{content:"\\E584"}.m-icon-arrowthindown[data-v-6f0896a0]:before{content:"\\E585"}.m-icon-arrowthinleft[data-v-6f0896a0]:before{content:"\\E586"}.m-icon-arrowthinright[data-v-6f0896a0]:before{content:"\\E587"}.m-icon-pulldown[data-v-6f0896a0]:before{content:"\\E588"}.m-icon-scan[data-v-6f0896a0]:before{content:"\\E612"}',""])},"57d8":function(t,e,n){var o=n("6e98");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=n("4f06").default;a("6fa3d041",o,!0,{sourceMap:!1,shadowMode:!1})},"5b9c":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"m-input-view"},[n("v-uni-input",{staticClass:"m-input-input",attrs:{focus:t.focus_,type:t.inputType,value:t.value,placeholder:t.placeholder,password:"password"===t.type&&!t.showPassword},on:{input:function(e){e=t.$handleEvent(e),t.onInput(e)},focus:function(e){e=t.$handleEvent(e),t.onFocus(e)},blur:function(e){e=t.$handleEvent(e),t.onBlur(e)}}}),t.clearable_&&!t.displayable_&&t.value.length?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:"#666666",type:"clear",size:"20"},on:{click:function(e){e=t.$handleEvent(e),t.clear(e)}}})],1):t._e(),t.displayable_?n("v-uni-view",{staticClass:"m-input-icon"},[n("m-icon",{attrs:{color:t.showPassword?"#666666":"#cccccc",type:"eye",size:"20"},on:{click:function(e){e=t.$handleEvent(e),t.display(e)}}})],1):t._e()],1)},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},"5c23":function(t,e,n){"use strict";n.r(e);var o=n("caf3"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},"6e98":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".m-input-view[data-v-2fd1e8ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:0 %?10?%}.m-input-input[data-v-2fd1e8ba]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%}.m-input-icon[data-v-2fd1e8ba]{width:20px}",""])},"80a9":function(t,e,n){var o=n("ac20");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=n("4f06").default;a("63202c1c",o,!0,{sourceMap:!1,shadowMode:!1})},"9dde":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("b1a7"));function a(t){return t&&t.__esModule?t:{default:t}}var i={components:{mIcon:o.default},props:{type:String,value:String,placeholder:String,clearable:{type:[Boolean,String],default:!1},displayable:{type:[Boolean,String],default:!1},focus:{type:[Boolean,String],default:!1}},model:{prop:"value",event:"input"},data:function(){return{showPassword:!1,isFocus:!1}},computed:{inputType:function(){var t=this.type;return"password"===t?"text":t},clearable_:function(){return"false"!==String(this.clearable)},displayable_:function(){return"false"!==String(this.displayable)},focus_:function(){return"false"!==String(this.focus)}},methods:{clear:function(){this.value=""},display:function(){this.showPassword=!this.showPassword},onFocus:function(){this.isFocus=!0},onBlur:function(){var t=this;this.$nextTick(function(){t.isFocus=!1})},onInput:function(t){this.$emit("input",t.target.value)}}};e.default=i},a185:function(t,e,n){"use strict";n.r(e);var o=n("09a1"),a=n("5c23");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("d5b1");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"3729e7a2",null);e["default"]=r.exports},a238:function(t,e,n){"use strict";n.r(e);var o=n("271b"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},a536:function(t,e,n){"use strict";var o=n("4537"),a=n.n(o);a.a},ac20:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,".action-row[data-v-3729e7a2]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.action-row uni-navigator[data-v-3729e7a2]{color:#007aff;padding:0 %?20?%}.oauth-row[data-v-3729e7a2]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:0;left:0;width:100%}.oauth-image[data-v-3729e7a2]{width:%?100?%;height:%?100?%;border:%?1?% solid #ddd;border-radius:%?100?%;margin:0 %?40?%;background-color:#fff}.oauth-image uni-image[data-v-3729e7a2]{width:%?60?%;height:%?60?%;margin:%?20?%}",""])},b1a7:function(t,e,n){"use strict";n.r(e);var o=n("cd74"),a=n("a238");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("a536");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"6f0896a0",null);e["default"]=r.exports},caf3:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=c(n("2b65")),a=n("2f62"),i=c(n("d962"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){f(t,e,n[e])})}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s={components:{mInput:i.default},data:function(){return{providerList:[],hasProvider:!1,account:"",password:"",positionTop:0}},computed:(0,a.mapState)(["forcedLogin"]),methods:r({},(0,a.mapMutations)(["login"]),{initProvider:function(){var t=this,e=["weixin","qq","sinaweibo"];uni.getProvider({service:"oauth",success:function(n){if(n.provider&&n.provider.length){for(var o=0;o<n.provider.length;o++)~e.indexOf(n.provider[o])&&t.providerList.push({value:n.provider[o],image:"../../static/img/"+n.provider[o]+".png"});t.hasProvider=!0}},fail:function(t){console.error("获取服务供应商失败："+JSON.stringify(t))}})},initPosition:function(){this.positionTop=uni.getSystemInfoSync().windowHeight-100},bindLogin:function(){if(this.account.length<5)uni.showToast({icon:"none",title:"账号最短为 5 个字符"});else if(this.password.length<6)uni.showToast({icon:"none",title:"密码最短为 6 个字符"});else{var t={account:this.account,password:this.password};o.default.getUsers().some(function(e){return t.account===e.account&&t.password===e.password});this.toMain(this.account)}},oauth:function(t){var e=this;uni.login({provider:t,success:function(n){uni.getUserInfo({provider:t,success:function(t){e.toMain(t.userInfo.nickName)}})},fail:function(t){console.error("授权登录失败："+JSON.stringify(t))}})},toMain:function(t){this.login(t),this.forcedLogin?uni.reLaunch({url:"../main/main"}):uni.navigateBack()}}),onLoad:function(){this.initPosition(),this.initProvider()}};e.default=s},cd74:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"m-icon",class:["m-icon-"+t.type],style:{color:t.color,"font-size":t.fontSize},on:{click:function(e){e=t.$handleEvent(e),t.onClick()}}})},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},d5b1:function(t,e,n){"use strict";var o=n("80a9"),a=n.n(o);a.a},d962:function(t,e,n){"use strict";n.r(e);var o=n("5b9c"),a=n("3749");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("247a");var c=n("2877"),r=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"2fd1e8ba",null);e["default"]=r.exports}}]);