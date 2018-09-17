/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/static/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/static/src/index.js":
/*!*********************************!*\
  !*** ./app/static/src/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_serializeForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/serializeForm */ "./app/static/src/utils/serializeForm.js");


function* foo() {
    yield 13
    yield 31
}

/***/ }),

/***/ "./app/static/src/utils/serializeForm.js":
/*!***********************************************!*\
  !*** ./app/static/src/utils/serializeForm.js ***!
  \***********************************************/
/*! exports provided: serializeForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeForm", function() { return serializeForm; });
/*
序列化表单
1. 对表单字段的名称和值进行 URL 编码，使用和号(&)分隔。
2. 不发送禁用的表单字段。
3. 只发送勾选的复选框和单选按钮。
4. 不发送 type 为'reset'和'button'的按钮。
5. 多选选择框中的每个选中的值单独一个条目。
6. 在单击提交按钮提交表单的情况下，也会发送提交按钮否则，不发送提交按钮。也包括 type 为'image'的<input>元素。
7. <select>元素的值，就是选中的<option>元素的 value 特性的值。如果<option>元素没有 value 特性，则是<option>元素的文本值。
8. 在表单序列化过程中，一般不包含任何按钮字段，因为结果字符串很可能是通过其他方式提交的 除此之外的其他上述规则都应该遵循。
 */
function serializeForm(form){
        let parts = [],
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i]
            switch(field.type){
                case 'select-one':
                case 'select-multiple':
                    if (field.name.length){
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j]
                            if (option.selected) {
                                optValue = ""
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute('value') ? option.value : option.text)
                                } else {
                                    optValue = (option.attributes['value'].specified ? option.value : option.text)
                                }
                                parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
                            }
                        }
                    }
                    break
                case undefined:             // 字段集
                case 'file':                // 文件输入
                case 'submit':              // 提交按钮
                case 'reset':               // 重置按钮
                case 'button':              // 自定义按钮
                    break
                case 'radio':               // 单选按钮
                case 'checkbox':            // 复选按钮
                    if (!field.checked){
                        break
                    }
                // 执行默认操作
                default:
                    // 不包含没有名字的表单字段
                    if (field.name.length){
                        parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
                    }
            }
        }
        return parts.join('&')
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3N0YXRpYy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3N0YXRpYy9zcmMvdXRpbHMvc2VyaWFsaXplRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ0xBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxZQUFZO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9zdGF0aWMvc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHtzZXJpYWxpemVGb3JtfSBmcm9tICcuL3V0aWxzL3NlcmlhbGl6ZUZvcm0nXG5cbmZ1bmN0aW9uKiBmb28oKSB7XG4gICAgeWllbGQgMTNcbiAgICB5aWVsZCAzMVxufSIsIi8qXG7luo/liJfljJbooajljZVcbjEuIOWvueihqOWNleWtl+auteeahOWQjeensOWSjOWAvOi/m+ihjCBVUkwg57yW56CB77yM5L2/55So5ZKM5Y+3KCYp5YiG6ZqU44CCXG4yLiDkuI3lj5HpgIHnpoHnlKjnmoTooajljZXlrZfmrrXjgIJcbjMuIOWPquWPkemAgeWLvumAieeahOWkjemAieahhuWSjOWNlemAieaMiemSruOAglxuNC4g5LiN5Y+R6YCBIHR5cGUg5Li6J3Jlc2V0J+WSjCdidXR0b24n55qE5oyJ6ZKu44CCXG41LiDlpJrpgInpgInmi6nmoYbkuK3nmoTmr4/kuKrpgInkuK3nmoTlgLzljZXni6zkuIDkuKrmnaHnm67jgIJcbjYuIOWcqOWNleWHu+aPkOS6pOaMiemSruaPkOS6pOihqOWNleeahOaDheWGteS4i++8jOS5n+S8muWPkemAgeaPkOS6pOaMiemSruWQpuWIme+8jOS4jeWPkemAgeaPkOS6pOaMiemSruOAguS5n+WMheaLrCB0eXBlIOS4uidpbWFnZSfnmoQ8aW5wdXQ+5YWD57Sg44CCXG43LiA8c2VsZWN0PuWFg+e0oOeahOWAvO+8jOWwseaYr+mAieS4reeahDxvcHRpb24+5YWD57Sg55qEIHZhbHVlIOeJueaAp+eahOWAvOOAguWmguaenDxvcHRpb24+5YWD57Sg5rKh5pyJIHZhbHVlIOeJueaAp++8jOWImeaYrzxvcHRpb24+5YWD57Sg55qE5paH5pys5YC844CCXG44LiDlnKjooajljZXluo/liJfljJbov4fnqIvkuK3vvIzkuIDoiKzkuI3ljIXlkKvku7vkvZXmjInpkq7lrZfmrrXvvIzlm6DkuLrnu5PmnpzlrZfnrKbkuLLlvojlj6/og73mmK/pgJrov4flhbbku5bmlrnlvI/mj5DkuqTnmoQg6Zmk5q2k5LmL5aSW55qE5YW25LuW5LiK6L+w6KeE5YiZ6YO95bqU6K+l6YG15b6q44CCXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVGb3JtKGZvcm0pe1xuICAgICAgICBsZXQgcGFydHMgPSBbXSxcbiAgICAgICAgICAgIGZpZWxkID0gbnVsbCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBsZW4sXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgb3B0TGVuLFxuICAgICAgICAgICAgb3B0aW9uLFxuICAgICAgICAgICAgb3B0VmFsdWVcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgZmllbGQgPSBmb3JtLmVsZW1lbnRzW2ldXG4gICAgICAgICAgICBzd2l0Y2goZmllbGQudHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0LW9uZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLm5hbWUubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDAsIG9wdExlbiA9IGZpZWxkLm9wdGlvbnMubGVuZ3RoOyBqIDwgb3B0TGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBmaWVsZC5vcHRpb25zW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRWYWx1ZSA9IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5oYXNBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbHVlID0gKG9wdGlvbi5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykgPyBvcHRpb24udmFsdWUgOiBvcHRpb24udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdFZhbHVlID0gKG9wdGlvbi5hdHRyaWJ1dGVzWyd2YWx1ZSddLnNwZWNpZmllZCA/IG9wdGlvbi52YWx1ZSA6IG9wdGlvbi50ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGZpZWxkLm5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdFZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDogICAgICAgICAgICAgLy8g5a2X5q616ZuGXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6ICAgICAgICAgICAgICAgIC8vIOaWh+S7tui+k+WFpVxuICAgICAgICAgICAgICAgIGNhc2UgJ3N1Ym1pdCc6ICAgICAgICAgICAgICAvLyDmj5DkuqTmjInpkq5cbiAgICAgICAgICAgICAgICBjYXNlICdyZXNldCc6ICAgICAgICAgICAgICAgLy8g6YeN572u5oyJ6ZKuXG4gICAgICAgICAgICAgICAgY2FzZSAnYnV0dG9uJzogICAgICAgICAgICAgIC8vIOiHquWumuS5ieaMiemSrlxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzogICAgICAgICAgICAgICAvLyDljZXpgInmjInpkq5cbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6ICAgICAgICAgICAgLy8g5aSN6YCJ5oyJ6ZKuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmllbGQuY2hlY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5omn6KGM6buY6K6k5pON5L2cXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiN5YyF5ZCr5rKh5pyJ5ZCN5a2X55qE6KGo5Y2V5a2X5q61XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC5uYW1lLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChmaWVsZC5uYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChmaWVsZC52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFydHMuam9pbignJicpXG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=