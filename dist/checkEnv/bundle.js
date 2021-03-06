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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./src/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _BrowserValidator = __webpack_require__(26);

var _BrowserValidator2 = _interopRequireDefault(_BrowserValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserValidator = new _BrowserValidator2.default();

function checkBrowser() {
    var validateResult = browserValidator.validate(),
        status = _BrowserValidator2.default.STATUS;

    if (needReport(validateResult)) {
        reportor.report(validateResult).saveReportTime();
    }

    function needReport(validateResult) {
        var lastValidateTime = reportor.getReportTime(),
            hourRange = 0;

        if (typeof lastValidateTime !== 'number' || Number.isNaN(lastValidateTime)) return true;

        hourRange = (Date.now() - lastValidateTime) / 1000 / 60 / 60; //计算小时

        if (validateResult.status === status.NEED_UPGRADE && hourRange > 6) {
            return true;
        } else if (validateResult.status === status.NOT_SUPPORT && hourRange > 1) {
            return true;
        } else {
            return false;
        }
    }
}

var reportor = {
    report: function report(validateResult) {
        var _this = this;

        var curBrowser = validateResult.curBrowser,
            allowedBrowsers = _BrowserValidator2.default.ALLOWED_BROWSERS,
            status = _BrowserValidator2.default.STATUS,
            style = {
            p: 'font-size: 16px; line-height: 24px;'
        },
            reportHTML = '';

        if (validateResult.status === status.NEED_UPGRADE) {
            var downloadURL = allowedBrowsers.find(function (b) {
                return b.name === curBrowser.name;
            }).download,
                upperCastName = this.upperCaseFirst(curBrowser.name);

            reportHTML = '<p style="' + style.p + '">CMS\u53EA\u652F\u6301\u6700\u65B0\u7248' + upperCastName + '\u6D4F\u89C8\u5668\uFF0C\u8BF7\u5347\u7EA7\u6216\u91CD\u88C5\u6D4F\u89C8\u5668; \u4E0B\u8F7D\u5730\u5740: <b style="padding: 0 5px; font-size: 18px;">\n                            ' + (downloadURL ? '<a class="icon-external-link-sign" href="' + downloadURL + '" target="_blank">' + upperCastName + '</a>' : upperCastName) + '</b>\n                        \u6D4F\u89C8\u5668</p>\n                        <p style="' + style.p + '">\u8BF7\u4F7F\u7528<b>Win7\u53CAWin7</b>\u4EE5\u4E0A\u64CD\u4F5C\u7CFB\u7EDF\u3002</p>';
        } else if (validateResult.status === status.NOT_SUPPORT) {
            var browserNames = [],
                downloadContents = [];

            allowedBrowsers.forEach(function (b) {
                var upperCaseName = _this.upperCaseFirst(b.name),
                    downloadURL = b.download;

                browserNames.push(upperCaseName);
                downloadContents.push('<a class="icon-external-link-sign" href="' + downloadURL + '" target="_blank">' + upperCaseName + '</a>');
            });
            reportHTML = '<p style="' + style.p + '">CMS\u53EA\u652F\u6301' + browserNames.join('/') + '\u6D4F\u89C8\u5668; \u4E0B\u8F7D\u5730\u5740: <b style="padding: 0 5px; font-size: 18px;">' + downloadContents.join(' / ') + '</b></p>\n                            <p style="' + style.p + '">\u8BF7\u4F7F\u7528<b>Win7\u53CAWin7</b>\u4EE5\u4E0A\u64CD\u4F5C\u7CFB\u7EDF\u3002</p>';
        } else reportHTML = '';

        if (!reportHTML) return this;

        var comos = window.top.comos;

        if (comos && comos.ui && comos.ui.toast) {
            var toastObj = comos.ui.toast.error({
                msg: reportHTML,
                timeout: 10000000,
                position: 'bottom right',
                closeBtn: 0
            });

            setTimeout(function () {
                toastObj.showCloseBtn();
            }, 10000);
        } else {
            var tooltipPane = document.createElement('div'),
                closeBtn = document.createElement('a');

            tooltipPane.setAttribute('style', 'position: fixed; bottom: 10px; right: 10px; border: 1px solid #dd605c; background-color: #fff1f0; color: #ca3d3b; padding: 3px 8px; line-height: 1.5em; font-size: 16px; box-shadow: 0 0 5px 1px;');
            tooltipPane.innerHTML = reportHTML;

            closeBtn.innerHTML = 'x';
            closeBtn.setAttribute('style', 'position: absolute; right: 3px; top: 3px; font-size: 14px; line-height: 1; color: #222; cursor: pointer; text-decoration: none; display: none;');

            tooltipPane.appendChild(closeBtn);
            window.top.document.body.appendChild(tooltipPane);
            setTimeout(function () {
                closeBtn.style.display = 'block';
                closeBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    tooltipPane.remove();
                });
            }, 10000);
        }

        return this;
    },
    getReportTime: function getReportTime() {
        var report = null;

        try {
            report = JSON.parse(localStorage.getItem('_browserCheckReport'));
        } catch (e) {
            //
        }

        if (!this.isPlainObject(report)) {
            return;
        }

        return report.reportTime;
    },
    saveReportTime: function saveReportTime(timestamp) {
        var report = null;

        try {
            report = JSON.parse(localStorage.getItem('_browserCheckReport'));
        } catch (e) {
            //
        }

        timestamp = Number.isNaN(parseInt(timestamp)) ? Date.now() : parseInt(timestamp);
        if (this.isPlainObject(report)) {
            report.reportTime = timestamp;
        } else {
            report = { reportTime: timestamp };
        }

        localStorage.setItem('_browserCheckReport', JSON.stringify(report));

        return this;
    },
    isPlainObject: function isPlainObject(v) {
        return Object.prototype.toString.call(v) === '[object Object]';
    },
    isString: function isString(v) {
        return Object.prototype.toString.call(v) === '[object String]';
    },
    upperCaseFirst: function upperCaseFirst(str) {
        if (!this.isString(str)) {
            throw new Error('argument must be a string');
        }
        if (str.length < 1) {
            return str;
        }
        return str[0].toUpperCase() + str.substr(1);
    }
};

setTimeout(function () {
    checkBrowser();
}, 2000);

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UAParser = __webpack_require__(27);

var _UAParser2 = _interopRequireDefault(_UAParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uaParser = new _UAParser2.default();

var BrowserValidator = function () {
    function BrowserValidator() {
        _classCallCheck(this, BrowserValidator);
    }

    _createClass(BrowserValidator, [{
        key: 'validate',
        value: function validate() {
            var curBrowserInfo = uaParser.getBrowser(),
                allowedBrowsers = BrowserValidator.ALLOWED_BROWSERS,
                allowedBrowser = allowedBrowsers.find(function (b) {
                return b.name === curBrowserInfo.name;
            }),
                STATUS = BrowserValidator.STATUS,
                result = {
                msg: '',
                status: STATUS.OK,
                curBrowser: curBrowserInfo,
                allowedBrowsers: allowedBrowsers
            };

            if (allowedBrowser) {
                var curVersion = parseInt(curBrowserInfo.version, 10);

                if (!Number.isNaN(curVersion) && curVersion < allowedBrowser.minVersion) {
                    result.status = STATUS.NEED_UPGRADE;
                    return result;
                }
            } else {
                result.status = STATUS.NOT_SUPPORT;
                return result;
            }

            return result;
        }
    }]);

    return BrowserValidator;
}();

BrowserValidator.ALLOWED_BROWSERS = [{
    name: 'chrome',
    minVersion: 54,
    download: 'https://www.baidu.com/s?wd=chrome'
}];
BrowserValidator.STATUS = {
    OK: 0,
    NOT_SUPPORT: -1,
    NEED_UPGRADE: -2
};
exports.default = BrowserValidator;

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * author jiangyu3
 * 代码摘抄自UAParser.js
 * UAParser.js v0.7.17
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 & MIT
 */

var EMPTY = '',
    NAME = 'name',
    VERSION = 'version';

var mapper = {

    rgx: function rgx(ua, arrays) {
        var i = 0,
            j = void 0,
            k = void 0,
            p = void 0,
            q = void 0,
            matches = void 0,
            match = void 0;
        while (i < arrays.length && !matches) {

            var regex = arrays[i],
                // even sequence (0,2,4,..)
            props = arrays[i + 1]; // odd sequence (1,3,5,..)
            j = k = 0;

            while (j < regex.length && !matches) {

                matches = regex[j++].exec(ua);

                if (!!matches) {
                    for (p = 0; p < props.length; p++) {
                        match = matches[++k];
                        q = props[p];
                        if (Array.isArray(q) && q.length > 0) {
                            if (q.length === 2) {
                                this[q[0]] = q[1];
                            } else if (q.length === 3) {
                                this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                            }
                        } else {
                            this[q] = match ? match : undefined;
                        }
                    }
                }
            }
            i += 2;
        }
    }
};

var regexes = {

    browser: [[

    // Presto based
    /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
    /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
    /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
    /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
    ], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
    ], [[NAME, 'Opera Mini'], VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
    ], [[NAME, 'Opera'], VERSION], [

    // Mixed
    /(kindle)\/([\w\.]+)/i, // Kindle
    /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
    // Lunascape/Maxthon/Netfront/Jasmine/Blazer

    // Trident based
    /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
    // Avant/IEMobile/SlimBrowser/Baidu
    /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

    // Webkit/KHTML based
    /(rekonq)\/([\w\.]+)*/i, // Rekonq
    /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i
    // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
    ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
    ], [[NAME, 'IE'], VERSION], [/(edge)\/((\d+)?[\w\.]+)/i // Microsoft Edge
    ], [NAME, VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
    ], [[NAME, 'UCBrowser'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
    ], [[NAME, /_/g, ' '], VERSION], [/(micromessenger)\/([\w\.]+)/i // WeChat
    ], [[NAME, 'WeChat'], VERSION], [/(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
    ], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
    ], [NAME, VERSION], [/xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
    ], [VERSION, [NAME, 'MIUI Browser']], [/;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
    ], [VERSION, [NAME, 'Facebook']], [/headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
    ], [VERSION, [NAME, 'Chrome Headless']], [/\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
    ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [// Oculus / Samsung Browser

    /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
    ], [VERSION, [NAME, 'Android Browser']], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
    ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
    ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
    ], [[NAME, 'Chrome'], VERSION], [/(coast)\/([\w\.]+)/i // Opera Coast
    ], [[NAME, 'Opera Coast'], VERSION], [/fxios\/([\w\.-]+)/i // Firefox for iOS
    ], [VERSION, [NAME, 'Firefox']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
    ], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
    ], [[NAME, 'GSA'], VERSION], [/(swiftfox)/i, // Swiftfox
    /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
    /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
    /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

    // Other
    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
    /(links)\s\(([\w\.]+)/i, // Links
    /(gobrowser)\/?([\w\.]+)*/i, // GoBrowser
    /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
    /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
    ], [NAME, VERSION]]
};

var UAParser = function () {
    function UAParser() {
        _classCallCheck(this, UAParser);
    }

    _createClass(UAParser, [{
        key: 'getBrowser',
        value: function getBrowser(uaString) {
            var ua = uaString ? String(uaString) : window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY,
                browser = { name: undefined, version: undefined };

            mapper.rgx.call(browser, ua, regexes.browser);

            var nameProp = browser[NAME];
            typeof nameProp === 'string' && (browser[NAME] = nameProp.toLowerCase());

            return browser;
        }
    }]);

    return UAParser;
}();

exports.default = UAParser;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map