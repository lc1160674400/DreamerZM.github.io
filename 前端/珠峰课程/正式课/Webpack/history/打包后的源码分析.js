(function(modules) { // webpackBootstrap
	// 构建模块的缓存
	var installedModules = {};
	// 生成了一个require方法，模拟common.js
	function __webpack_require__(moduleId) {
		// 如果缓存里已经有了，表示模块加载过了，直接返回
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// 如果模块没有加载过，创建一个新的模块，并且放到缓存里
		var module = installedModules[moduleId] = {
			//1.模块id
			i: moduleId,
			//2.加载状态 loaded
			l: false,
			//3.默认空导入对象
			exports: {}
		};
		// 执行模块方法（初始化）
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// 标记模块已加载状态
		module.l = true;
		// 返回模块的导出对象
		return module.exports;
	}
	// 向外暴露模块对象
	__webpack_require__.m = modules;
	// 向外暴露模块的缓存
	__webpack_require__.c = installedModules;
	// 定义getter方法，为了兼容exports 	getter：获取器，如果直接调用export name会直接调用get方法
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// 在导出对象上定义es-module ，兼容写法，一种是commonjs的写法，这个是esmodule的形式的写法
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__	公开路径
	__webpack_require__.p = "";
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('hello');\r\ndocument.getElementById('app').innerHTML = 'zfpx'\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

});