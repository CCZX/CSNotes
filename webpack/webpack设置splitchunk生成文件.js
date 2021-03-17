//  https://juejin.cn/post/6844903685407916039#heading-5
 //@file: dist/common/runtime.js
 // 当配置了splitChunk之后，此时IIFE的形参modules就成了摆设，
 // 真正的module还有chunk都被存放在了一个挂载在window上的全局数组`webpackJsonp`上了
 (function(modules) { // webpackBootstrap
  // install a JSONP callback for chunk loading
  /**
   * webpackJsonpCallback 处理chunk数据
   * @param {Array} data  [[chunkId(chunk名称)], modules(Object), [...other chunks(所有需要的chunk)]]
   */
  function webpackJsonpCallback(data) {
       // chunk的名称，如果是entry chunk也就是我们entry的key
    var chunkIds = data[0];
       // 依赖模块
    var moreModules = data[1];
    var executeModules = data[2];

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [];
    for(;i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if(installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for(moduleId in moreModules) {
      if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if(parentJsonpFunction) parentJsonpFunction(data);

    while(resolves.length) {
      resolves.shift()();
    }

    // add entry modules from loaded chunk to deferred list
    deferredModules.push.apply(deferredModules, executeModules || []);

    // run deferred modules when all chunks ready
    return checkDeferredModules();
  };
  function checkDeferredModules() {
    var result;
    for(var i = 0; i < deferredModules.length; i++) {
      var deferredModule = deferredModules[i];
      var fulfilled = true;
      for(var j = 1; j < deferredModule.length; j++) {
        var depId = deferredModule[j];
        if(installedChunks[depId] !== 0) fulfilled = false;
      }
      if(fulfilled) {
        deferredModules.splice(i--, 1);
        result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
      }
    }
    return result;
  }

  // The module cache
  var installedModules = {};

 // 缓存chunk，同理module
  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  var installedChunks = {
    "common/runtime": 0
  };

  var deferredModules = [];

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }


  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // __webpack_public_path__
  __webpack_require__.p = "";

  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;


  // run deferred modules from other chunks
  checkDeferredModules();
})([]);
//@file: dist/common/utils.js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common/utils"], {
  "./src/index.js": function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module.js */ \"./src/module.js\");\n/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_module_js__WEBPACK_IMPORTED_MODULE_0__);\n{};\nconsole.log(_module_js__WEBPACK_IMPORTED_MODULE_0___default.a.s);\n\n//# sourceURL=webpack:///./src/index.js?");
  },
  "./src/module.js": function (module, exports) {
    eval("{};var s = 123;\nconsole.log(s);\nmodule.exports = {\n  s: s\n};\n\n//# sourceURL=webpack:///./src/module.js?");
  }
}]);

