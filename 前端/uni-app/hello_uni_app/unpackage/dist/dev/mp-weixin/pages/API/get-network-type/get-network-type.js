(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/API/get-network-type/get-network-type"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/pages/API/get-network-type/get-network-type.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =





















{
  data: function data() {
    return {
      title: 'getNetworkType',
      hasNetworkType: false,
      networkType: '' };

  },
  onUnload: function onUnload() {
    this.networkType = '', this.hasNetworkType = false;
  },
  methods: {
    getNetworkType: function getNetworkType() {var _this = this;
      uni.getNetworkType({
        success: function success(res) {
          console.log(res);
          _this.hasNetworkType = true, _this.networkType = res.subtype || res.networkType;
        },
        fail: function fail() {
          uni.showModal({
            content: '获取失败！',
            showCancel: false });

        } });

    },
    clear: function clear() {
      this.hasNetworkType = false,
      this.networkType = '';
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=template&id=09cca1ec&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/pages/API/get-network-type/get-network-type.vue?vue&type=template&id=09cca1ec& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    [
      _c("page-head", { attrs: { title: _vm.title, mpcomid: "0acd4c54-0" } }),
      _c("view", { staticClass: "uni-padding-wrap uni-common-mt" }, [
        _c(
          "view",
          { staticStyle: { background: "#FFFFFF", padding: "40rpx" } },
          [
            _c("view", { staticClass: "uni-hello-text uni-center" }, [
              _vm._v("网络状态")
            ]),
            _vm.hasNetworkType === false
              ? _c("block", [
                  _c(
                    "view",
                    { staticClass: "uni-h2 uni-center uni-common-mt" },
                    [_vm._v("未获取")]
                  ),
                  _c(
                    "view",
                    { staticClass: "uni-hello-text uni-center uni-common-mt" },
                    [_vm._v("请点击下面按钮获取网络状态")]
                  )
                ])
              : _vm._e(),
            _vm.hasNetworkType === true
              ? _c("block", [
                  _c(
                    "view",
                    { staticClass: "uni-h2 uni-center uni-common-mt" },
                    [_vm._v(_vm._s(_vm.networkType))]
                  )
                ])
              : _vm._e()
          ],
          1
        ),
        _c(
          "view",
          { staticClass: "uni-btn-v uni-common-mt" },
          [
            _c(
              "button",
              {
                attrs: { type: "primary", eventid: "0acd4c54-0" },
                on: { tap: _vm.getNetworkType }
              },
              [_vm._v("获取手机网络状态")]
            ),
            _c(
              "button",
              { attrs: { eventid: "0acd4c54-1" }, on: { tap: _vm.clear } },
              [_vm._v("清空")]
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\main.js?{\"page\":\"pages%2FAPI%2Fget-network-type%2Fget-network-type\"}":
/*!**************************************************************************************************************************************!*\
  !*** E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/main.js?{"page":"pages%2FAPI%2Fget-network-type%2Fget-network-type"} ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _getNetworkType = _interopRequireDefault(__webpack_require__(/*! ./pages/API/get-network-type/get-network-type.vue */ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_getNetworkType.default));

/***/ }),

/***/ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue":
/*!*****************************************************************************************************************!*\
  !*** E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/pages/API/get-network-type/get-network-type.vue ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_network_type_vue_vue_type_template_id_09cca1ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-network-type.vue?vue&type=template&id=09cca1ec& */ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=template&id=09cca1ec&");
/* harmony import */ var _get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-network-type.vue?vue&type=script&lang=js& */ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _get_network_type_vue_vue_type_template_id_09cca1ec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _get_network_type_vue_vue_type_template_id_09cca1ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/pages/API/get-network-type/get-network-type.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************!*\
  !*** E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/pages/API/get-network-type/get-network-type.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./get-network-type.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=template&id=09cca1ec&":
/*!************************************************************************************************************************************************!*\
  !*** E:/workspace/DreamerZM.github.io/前端/uni-app/hello_uni_app/pages/API/get-network-type/get-network-type.vue?vue&type=template&id=09cca1ec& ***!
  \************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_template_id_09cca1ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./get-network-type.vue?vue&type=template&id=09cca1ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\pages\\API\\get-network-type\\get-network-type.vue?vue&type=template&id=09cca1ec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_template_id_09cca1ec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_MySoft_HBuilderX_1_6_2_20190220_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_get_network_type_vue_vue_type_template_id_09cca1ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["E:\\workspace\\DreamerZM.github.io\\前端\\uni-app\\hello_uni_app\\main.js?{\"page\":\"pages%2FAPI%2Fget-network-type%2Fget-network-type\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/API/get-network-type/get-network-type.js.map