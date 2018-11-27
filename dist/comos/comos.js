webpackJsonp([2],{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (window) {
    if (window.top.comos !== undefined) {
        if (window.comos === undefined) {
            window.comos = window.top.comos;
        }
        return;
    }
    var _baseUrl = '';

    var toString = Object.prototype.toString,
        isArray = Array.isArray || function (v) {
        return v && toString.call(v) === '[object Array]';
    },
        isPlainObject = function isPlainObject(v) {
        return v && toString.call(v) === '[object Object]' && 'isPrototypeOf' in v;
    },
        isFunction = function isFunction(v) {
        return v && toString.call(v) === '[object Function]';
    },
        isString = function isString(v) {
        return toString.call(v) === '[object String]';
    },
        isNumber = function isNumber(v) {
        return toString.call(v) === '[object Number]';
    },
        isBoolean = function isBoolean(v) {
        return toString.call(v) === '[object Boolean]';
    },
        isUndefined = function isUndefined(v) {
        return v === undefined;
    },
        isRegExp = function isRegExp(v) {
        return toString.call(v) === '[object RegExp]';
    },
        isEmptyObject = function isEmptyObject(v) {
        var p;
        if (!isPlainObject(v)) {
            return false;
        }
        for (p in v) {
            if (v.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    },
        SKIP_TYPE_VALIDATION = ['[object Number]', '[object String]', '[object Boolean]'],
        equal = function equal(v1, v2, isStrongType) {
        var i,
            len,
            type1 = toString.call(v1),
            type2 = toString.call(v2),
            property;

        if (isStrongType || SKIP_TYPE_VALIDATION.indexOf(type1) == -1 || SKIP_TYPE_VALIDATION.indexOf(type2) == -1) {
            if (type1 !== type2) {
                return false;
            }
        }

        if (comos.isArray(v1)) {
            if (v1.length !== v2.length) {
                return false;
            }
            for (i = 0, len = v1.length; i < len; i++) {
                if (!equal(v1[i], v2[i], isStrongType)) {
                    return false;
                }
            }
        } else if (comos.isPlainObject(v1)) {
            if (Object.keys(v1).length != Object.keys(v2).length) {
                return false;
            }
            for (property in v1) {
                if (!(v1.hasOwnProperty(property) && v2.hasOwnProperty(property)) || !equal(v1[property], v2[property], isStrongType)) {
                    return false;
                }
            }
        } else {
            return isStrongType === true ? v1 === v2 : v1 == v2;
        }

        return true;
    },
        mix = function mix(dest, source, isDeep) {
        isDeep = isDeep === undefined ? true : isDeep;

        for (var p in source) {
            var src = source[p],
                target = dest[p];
            if (isDeep && (isArray(src) || isPlainObject(src))) {
                var clone = dest[p] = target && (isArray(target) || isPlainObject(target)) ? target : isArray(src) ? [] : {};
                mix(clone, src);
            } else {
                //修正android webview下的遍历bug，会把prototype属性遍历出来，在继承mix时造成对prototype的重写
                if (p == 'prototype') {
                    continue;
                }
                dest[p] = src;
            }
        }
        return dest;
    },
        clone = function clone(obj) {
        if (comos.isArray(obj)) {
            return mix([], obj);
        }
        if (comos.isPlainObject(obj)) {
            return mix({}, obj);
        }
        return obj;
    },
        apply = function apply(obj, config, defaults) {
        if (defaults) {
            apply(obj, defaults);
        }
        return mix(obj, config);
    },
        delegate = function delegate(obj, func) {
        var presetArgs = Array.prototype.splice.call(arguments, 2),
            delegate = function delegate() {
            var args = presetArgs.concat(Array.prototype.slice.call(arguments));
            return func.apply(obj, args);
        };
        return delegate;
    },
        create = isFunction(Object.create) ? Object.create : function (obj) {
        var F = function F() {};
        F.prototype = obj.hasOwnProperty('prototype') ? obj.prototype : obj;
        return new F();
    },
        comos = {
        ui: {},
        mixin: {},
        keyboard: {
            ENTER: 13
        },
        env: {
            dev: /^(dev|vip)\.cms\.pub\.sina\.com\.cn/.test(window.location.hostname)
        }
    };
    comos.host = window;
    mix(comos, {
        mix: mix,
        clone: clone,
        apply: apply,
        create: create,
        emptyFn: function emptyFn() {},
        emptyAbstractFn: function emptyAbstractFn() {
            throw new Error('cannot call abstract method');
        },
        isArray: isArray,
        isString: isString,
        isFunction: isFunction,
        isPlainObject: isPlainObject,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isUndefined: isUndefined,
        isEmptyObject: isEmptyObject,
        isRegExp: isRegExp,
        equal: equal,
        delegate: delegate,
        upperCaseFirst: function upperCaseFirst(str) {
            if (!isString(str)) {
                throw new Error('argument must be a string');
            }
            if (str.length < 1) {
                return str;
            }
            return str[0].toUpperCase() + str.substr(1);
        },
        nl2br: function nl2br(str) {
            return str.replace(/\n/g, '<br/>');
        },
        calculateCharsByteLength: function calculateCharsByteLength(str) {
            return str.replace(/[^\x00-\xff]/g, '__').length;
        },
        calculateMobileCharsLength: function calculateMobileCharsLength(str) {
            var CHAR_MAP = { "0": 38.4, "1": 38.4, "2": 38.4, "3": 38.4, "4": 38.4, "5": 38.4, "6": 38.4, "7": 38.4, "8": 38.4, "9": 38.4, "A": 40, "B": 40, "C": 41, "D": 43, "E": 35, "F": 35, "G": 43, "H": 45, "I": 18, "J": 35, "K": 40, "L": 35, "M": 55, "N": 45, "O": 44, "P": 40, "Q": 45, "R": 41, "S": 39, "T": 38, "U": 43, "V": 40, "W": 55, "X": 40, "Y": 40, "Z": 38 },
                i,
                strLen,
                charCode,
                charLen,
                result = 0;

            if (!str && str !== 0) {
                return 0;
            }
            str = String(str);
            for (i = 0, strLen = str.length; i < strLen; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0x0001 && charCode <= 0x007e || 0xff60 <= charCode && charCode <= 0xff9f) {
                    charLen = CHAR_MAP.hasOwnProperty(str[i]) ? CHAR_MAP[str[i]] / 64 : 0.5;
                } else {
                    charLen = 1;
                }
                result += charLen;
            }

            result = result == result.toFixed(0) ? result : result.toFixed(3);
            return Number(result);
        },
        FrameManager: {
            _activeFrame: null,
            active: function active(win) {
                var hasFrames = comos.isUndefined(win.frames) ? false : true;

                this._activeFrame = {
                    name: win.name,
                    win: win,
                    content: hasFrames ? win.frames['contentFrame'] : null,
                    sidebar: hasFrames ? win.frames['sidebarFrame'] : null
                };

                return this;
            },
            getActiveFrame: function getActiveFrame() {
                return this._activeFrame;
            },
            refreshSidebar: function refreshSidebar() {
                this._activeFrame.sidebar.location.reload();
            },
            refreshContent: function refreshContent() {
                this._activeFrame.content.location.reload();
            }
        },
        setSiteBaseUrl: function setSiteBaseUrl(url) {
            _baseUrl = url;
        },
        getSiteBaseUrl: function getSiteBaseUrl() {
            return _baseUrl;
        },
        SkinManager: function () {
            var DEFAULT_SKIN = 'dark-blue',
                COMOS_SKIN_STORAGE_KEY = '__comosSkinId',
                SKINS = {
                'dark-blue': {
                    name: '深海蓝',
                    css: {
                        main: '/res/css/main2',
                        dialog: '/res/js/comos/ui/dialog2'
                    }
                },
                'light-blue': {
                    name: '天空蓝',
                    css: {
                        main: '/res/css/main',
                        dialog: '/res/js/comos/ui/dialog'
                    }
                }
            };
            function setSkin(id) {
                if (SKINS.hasOwnProperty(id) && window.localStorage) {
                    window.localStorage.setItem(COMOS_SKIN_STORAGE_KEY, id);
                } else {
                    comos.Debugger.dump('不存在的皮肤或浏览器不支持localStorage');
                }
            }
            function getCurrentSkinId() {
                var id;
                if (window.localStorage) {
                    id = window.localStorage.getItem(COMOS_SKIN_STORAGE_KEY);
                }
                id = id && SKINS.hasOwnProperty(id) ? id : DEFAULT_SKIN;
                return id;
            }
            function getOutput() {
                var skin = SKINS[getCurrentSkinId()],
                    css = skin.css,
                    q,
                    output = '';

                for (q in css) {
                    if (css.hasOwnProperty(q)) {
                        output += '<link href="' + comos.addVersion(comos.getSiteBaseUrl() + css[q] + '.css') + '" rel="stylesheet" type="text/css" />';
                    }
                }

                return output;
            }
            function getSkins() {
                return SKINS;
            }

            return {
                setSkin: setSkin,
                getSkins: getSkins,
                getOutput: getOutput,
                getCurrentSkinId: getCurrentSkinId
            };
        }(),
        ajax: {
            sync: {
                _data: null,
                get: function get(url) {
                    $.ajax({
                        url: url,
                        async: false,
                        success: delegate(this, this._success),
                        error: delegate(this, this._error),
                        dataType: 'text'
                    });

                    return this._data;
                },
                post: function post(url, data) {
                    $.ajax({
                        type: 'post',
                        url: url,
                        async: false,
                        data: data,
                        success: delegate(this, this._success),
                        error: delegate(this, this._error),
                        dataType: 'text'
                    });

                    return this._data;
                },
                _success: function _success(data) {
                    this._data = data;
                },
                _error: function _error() {
                    throw new Error('request failed!');
                }
            }
        },
        getQS: function () {
            var parse = function parse(url) {
                var search = $.trim(url).replace(/.*\?/, ''),
                    QS = {},
                    QSs;

                if (!search) {
                    return QS;
                }

                QSs = search.split("&");
                QSs.forEach(function (q) {
                    var t = q.split('=');

                    t.length === 2 && (QS[t[0]] = t[1]);
                });

                return QS;
            };

            var QS = parse(window.location.search);

            return function (name, url) {
                name = $.trim(name);
                url = $.trim(url);

                return (url ? parse(url)[name] : QS[name]) || "";
            };
        }(),
        loadScript: function loadScript(url, callback, doc, errorCallback) {
            var script, head;

            doc = doc ? doc : document;
            script = document.createElement("script");
            script.type = "text/javascript";

            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        done();
                    }
                };
            } else {
                script.onload = done;
            }

            function done() {
                //script.remove();

                if (script) {
                    script.onreadystatechange = script.onload = null;
                }

                if (isFunction(callback)) {
                    callback();
                }
            }

            function errorHandle() {
                if (typeof console !== "undefined" && console.log) {
                    console.log("加载失败: " + url);
                }
                if (errorCallback && isFunction(callback)) {
                    errorCallback();
                }
            }

            script.src = url;
            script.onerror = errorHandle;
            head = doc.getElementsByTagName("head")[0];
            if (head) {
                head.appendChild(script);
            } else {
                doc.documentElement.insertBefore(script, doc.documentElement.children[0]);
            }
        },
        ScriptLoader: function () {
            function klass(doc) {
                this._doc = doc || document;
                this._callbacks = {};
                this._urlQueue = [];
                this._stateQueue = [];
                this._stateURL = {};
            }
            klass.prototype = {
                LOADING: 1,
                LOADED: 2,
                FAIL: 3,
                _curQueuePos: 0,
                _lastCallback: null,
                _loadScript: function _loadScript(url) {
                    var self = this;
                    comos.loadScript(url, function () {
                        self._loadScriptWrapCbk(url);
                    }, self._doc);
                },
                add: function add(url, callback) {
                    var self = this;

                    self._urlQueue = self._urlQueue[self._urlQueue.length - 1] ? self._urlQueue : [[]];
                    self._urlQueue[self._urlQueue.length - 1].push(url);

                    self._callbacks[url] = self._callbacks[url] ? self._callbacks[url] : [];
                    if (callback) {
                        self._callbacks[url].push(callback);
                    }
                    return self;
                },
                then: function then() {
                    this._urlQueue.push([]);
                    return this;
                },
                _checkCurQueueLoaded: function _checkCurQueueLoaded() {
                    var self = this,
                        i = self._curQueuePos,
                        urls = self._urlQueue[i],
                        j,
                        len,
                        loaded = self.LOADED;

                    for (j = 0, len = urls.length; j < len; j++) {
                        if (self._stateURL[urls[j]] !== self.LOADED) {
                            loaded = self.LOADING;
                            break;
                        }
                    }
                    if (loaded === self.LOADED) {
                        self._stateQueue[i] = self.LOADED;
                    }

                    return loaded === self.LOADED ? true : false;
                },
                _loadScriptWrapCbk: function _loadScriptWrapCbk(url) {
                    var self = this,
                        callbacks = self._callbacks[url],
                        i,
                        len,
                        t;
                    if (callbacks && isArray(callbacks)) {
                        for (i = 0, len = callbacks.length; i < len; i++) {
                            callbacks[i]();
                        }
                    }
                    self._stateURL[url] = self.LOADED;
                    if (self._checkCurQueueLoaded()) {
                        self._loadNextQueue();
                    }
                },
                _loadNextQueue: function _loadNextQueue() {
                    var self = this;

                    self._curQueuePos += 1;
                    if (self._curQueuePos < self._urlQueue.length) {
                        self._loadQueue(self._curQueuePos);
                    } else if (self._lastCallback) {
                        self._lastCallback();
                    }
                },
                _loadQueue: function _loadQueue() {
                    var self = this,
                        urls = self._urlQueue[self._curQueuePos],
                        url,
                        i = 0,
                        len = urls.length;

                    for (; i < len; i++) {
                        url = urls[i];
                        self._loadScript(url);
                    }
                },
                load: function load(callback) {
                    var self = this;

                    self._lastCallback = callback;
                    self._curQueuePos = 0;
                    self._loadQueue();
                }

            };

            return klass;
        }(),
        json: {
            encode: JSON.stringify,
            decode: JSON.parse,
            parse: function parse(sth, obj) {
                var result = null;

                obj = obj || null;
                if ((typeof sth === 'undefined' ? 'undefined' : _typeof(sth)) === 'object') {
                    result = sth;
                } else {
                    try {
                        result = JSON.parse(sth);
                    } catch (e) {
                        try {
                            sth = sth.replace(/^\s*(\{.*?\})\s*$/, '$1') || sth.replace(/^\s*(\[.*?\])\s*$/, '$1');
                            if (/^\{.*?\}$|^\[.*?\]$/.test(sth)) {
                                result = eval('(' + sth + ')');
                            }
                        } catch (e) {
                            //
                        }
                    }
                }
                return result && (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' ? result : (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj || null;
            },
            stringify: function stringify(sth) {
                var result = '';
                if (typeof sth === 'string') {
                    result = sth;
                } else {
                    try {
                        result = JSON.stringify(sth);
                    } catch (e) {
                        console.error(e);
                    }
                }
                return result;
            }
        },
        removeZWSP: function removeZWSP(content) {
            //删除零宽空格(ZWSP), ZWSP参考：https://zh.wikipedia.org/wiki/%E7%A9%BA%E6%A0%BC
            if (content === undefined || content === null || content === '') {
                return '';
            }
            return (content + '').replace(/[\ufeff\u200b\u200c\u200d]/g, '');
        },
        object: {
            watch: function watch(obj, prop, setHandler, getHandler) {
                var val = obj[prop];
                if ((setHandler && typeof setHandler == 'function' || getHandler && typeof getHandler == 'function') && Object.defineProperty) {
                    if (delete obj[prop]) {
                        Object.defineProperty(obj, prop, {
                            enumerable: true,
                            get: function get() {
                                getHandler && getHandler.call(obj, prop, val);
                                return val;
                            },
                            set: function set(newVal) {
                                setHandler && setHandler.call(obj, prop, val, newVal);
                                val = newVal;
                            }
                        });
                    }
                }
            },
            unwatch: function unwatch(obj, prop) {
                var val = obj[prop];
                var _obj = Object.assign({}, obj);
                _obj[prop] = val;
                return obj = _obj;
            },
            //polyfill Object.values
            values: function values(obj) {
                var key,
                    val,
                    vals = [];

                if (Object.prototype.toString.call(obj) !== '[object Object]') {
                    if (Array.isArray(obj)) {
                        return obj;
                    } else if (typeof obj === 'string') {
                        return obj.split('');
                    } else {
                        return [];
                    }
                }

                for (key in obj) {
                    val = obj[key];

                    if (!obj.hasOwnProperty(key)) continue;

                    vals.push(val);
                }

                return vals;
            }
        },
        encodeHtml: function encodeHtml(text) {
            return $('<div/>').text(text).html();
        },
        classify: function classify(obj) {
            var F = function F() {};
            F.prototype = obj.hasOwnProperty('prototype') ? obj.prototype : obj;
            F.prototype.constructor = F;

            return F;
        },
        extend: function extend(subclass, superclass) {
            subclass.prototype = comos.create(superclass.prototype);
            subclass.prototype.constructor = subclass;
            subclass.prototype.__class = subclass;
            subclass.prototype.super = superclass.prototype;
            subclass.prototype.superclass = superclass;

            return subclass;
        },
        createClass: function createClass() {
            var superclass,
                instance,
                clazz = function clazz() {};
            if (arguments.length == 2) {
                superclass = arguments[0];
                instance = arguments[1];
                if (!isFunction(superclass)) {
                    throw new Error('argument error:Superclass must be a class');
                } else {
                    clazz = instance.hasOwnProperty('constructor') ? instance.constructor : function () {
                        superclass.apply(this, $.makeArray(arguments));
                    };

                    clazz = comos.extend(clazz, superclass);
                    comos.mix(clazz.prototype, instance);
                }
            } else if (arguments.length == 1) {
                clazz = comos.extend(arguments[0].hasOwnProperty('constructor') ? arguments[0].constructor : clazz, comos.classify(arguments[0]));
            }

            return clazz;
        },
        JsonClient: {
            status: {
                OK: 1
            },
            get: function get(url, params) {
                url = this.buildUrl(url, params);
                return this._processResponse(comos.ajax.sync.get(url));
            },
            post: function post(url, data) {
                return this._processResponse(comos.ajax.sync.post(url, data));
            },
            buildUrl: function buildUrl(url, params) {
                if (!params || comos.isEmptyObject(params)) {
                    return url;
                }
                return url + (url.indexOf('?') > -1 ? '&' : '?') + this._buildQueryStr(params);
            },
            _buildQueryStr: function _buildQueryStr(params) {
                var query = [],
                    key,
                    val;
                for (key in params) {
                    val = params[key];
                    if (isFunction(val)) {
                        continue;
                    }
                    if (isArray(val)) {
                        query.push(this._buildArrayQueryStr(key, val));
                    } else {
                        query.push(key + '=' + encodeURIComponent(val));
                    }
                }

                return query.join('&');
            },
            _buildArrayQueryStr: function _buildArrayQueryStr(key, arr) {
                var i,
                    len = arr.length,
                    query = [];

                for (i = 0; i < len; i++) {
                    query.push(key + encodeURIComponent('[]') + '=' + encodeURIComponent(arr[i]));
                }

                return query.join('&');
            },
            _processResponse: function _processResponse(response) {
                var data;
                if (!response) {
                    throw new Error('fail to get data from server!');
                }
                try {
                    data = comos.json.decode(response);
                    if (isUndefined(data.status)) {
                        throw new Error('invalid response format');
                    }
                } catch (e) {
                    throw new Error('invalid response format');
                }
                if (data.status != comos.JsonClient.status.OK) {
                    throw new Error('server exception:' + data.msg);
                }

                return data.data;
            }
        },
        Toast: {
            _$toast: null,
            _timeoutId: -1,
            icon: {
                LOADING: 'toast-icon-loading',
                INFO: 'toast-icon-info',
                WARN: 'toast-icon-warn',
                MSG: 'toast-icon-msg',
                ERROR: 'toast-icon-error'
            },
            MAX_TIMEOUT: 8000,
            TIMEOUT_MSG: '异常：超时关闭',
            AUTO_HIDE_DELAY: 800,

            makeToast: function makeToast() {
                this._$toast = $('#comosToast');
                if (this._$toast.length == 0) {
                    this._$toast = $('<div id="comosToast" class="comos-toast"><span class="comos-toast-icon"></span><span class="comos-toast-msg"></span></div>');
                    $(document.body).append(this._$toast);
                }
            },
            show: function show(icon, msg, timeout, timeoutMsg) {
                this.makeToast();
                if (this._$toast.is(':visible')) {
                    //清除自动关闭定时器
                    if (this._timeoutId !== -1) {
                        clearTimeout(this._timeoutId);
                        this._timeoutId = -1;
                    }
                }
                //设置超时时间
                if (comos.isUndefined(timeout) || isNaN(parseInt(timeout))) {
                    timeout = comos.Toast.MAX_TIMEOUT;
                    timeoutMsg = this.TIMEOUT_MSG;
                } else {
                    timeout = parseInt(timeout);
                }

                this.setIcon(icon).setMessage(msg);

                this._$toast.css({
                    marginTop: -this._$toast.outerHeight() / 2,
                    marginLeft: -this._$toast.outerWidth() / 2,
                    display: 'block'
                });
                if (timeout !== 0) {
                    this._timeoutId = setTimeout(comos.delegate(this, this.hide, timeoutMsg, this.AUTO_HIDE_DELAY), timeout);
                }

                return this;
            },
            hide: function hide(msg, delay) {
                //清除自动关闭定时器
                if (this._timeoutId !== -1) {
                    clearTimeout(this._timeoutId);
                    this._timeoutId = -1;
                }
                if (!this._$toast.is(':visible')) {
                    return this;
                }
                if (!comos.isUndefined(msg)) {
                    this.setMessage(msg);
                }
                delay = parseInt(delay);
                if (isNaN(delay)) {
                    this._doHide();
                } else {
                    this._timeoutId = setTimeout(comos.delegate(this, this._doHide), delay);
                }

                return this;
            },
            _doHide: function _doHide() {
                //清除自动关闭定时器
                if (this._timeoutId !== -1) {
                    clearTimeout(this._timeoutId);
                    this._timeoutId = -1;
                }
                this._$toast.removeAttr('style').css('display', 'none');
                this._$toast.find('.comos-toast-icon').attr('class', 'comos-toast-icon');

                return this;
            },
            loading: function loading(msg, timeout, timeoutMsg) {
                this.show(comos.Toast.icon.LOADING, msg, timeout, timeoutMsg);
                return this;
            },
            info: function info(msg, timeout, timeoutMsg) {
                this.show(comos.Toast.icon.INFO, msg, timeout, timeoutMsg);
                return this;
            },
            warn: function warn(msg, timeout, timeoutMsg) {
                this.show(comos.Toast.icon.WARN, msg, timeout, timeoutMsg);
                return this;
            },
            msg: function msg(_msg, timeout, timeoutMsg) {
                this.show(comos.Toast.icon.MSG, _msg, timeout, timeoutMsg);
                return this;
            },
            error: function error(msg, timeout, timeoutMsg) {
                this.show(comos.Toast.icon.ERROR, msg, timeout, timeoutMsg);
                return this;
            },
            alert: function alert(msg) {
                window.alert(msg.toString());
            },
            setMessage: function setMessage(msg) {
                this._$toast.find('.comos-toast-msg').text(msg);
                return this;
            },
            setIcon: function setIcon(icon) {
                this._$toast.find('.comos-toast-icon').attr('class', 'comos-toast-icon').addClass(icon);
                return this;
            }
        },
        ObjectReader: {
            ROOT_PATH: '.',
            ARRAY_ITEM_PATTERN: /^\d+$/,
            PATH_SEPERATOR: '.',
            ARGUMENTS_SCHEMA: {
                type: 'object',
                properties: {
                    path: { type: 'string' },
                    object: {
                        oneOf: [{ type: 'array' }, { type: 'object' }]
                    }
                }
            },
            /**
            *@param string path
            *@param object|array object
            *@return mix
            */
            read: function read(path, object) {
                var parts,
                    part,
                    currentObject = object,
                    partsOfRead = [];

                if (arguments.length != 2) {
                    throw new Error('[comos.ObjectReader::read]expect exactly 2 arguments, but ' + arguments.length + ' given');
                }
                if (!window.tv4.validate({ path: path, object: object }, this.ARGUMENTS_SCHEMA)) {
                    throw new Error('[comos.ObjectReader::read]arguments type error(expect path is string, data is object or array)');
                }

                if (this._isRoot(path)) {
                    return currentObject;
                }
                parts = this._extractPathParts(path);
                while (part = parts.shift()) {
                    partsOfRead.push(part);
                    if (comos.isArray(currentObject) && !this._isArrayItemPart(part)) {
                        throw new Error('[comos.ObjectReader::read]cannot read array item using non integer index(index:"' + part + '", path:' + partsOfRead.join('.') + ')');
                    }
                    if (comos.isUndefined(currentObject)) {
                        throw new Error('[comos.ObjectReader::read]cannot read property on undefined value(path:' + partsOfRead.join('.') + ')');
                    }
                    if (comos.isArray(currentObject)) {
                        currentObject = this._readArrayItem(part, currentObject, partsOfRead);
                    } else if (comos.isPlainObject(currentObject)) {
                        currentObject = this._readProperty(part, currentObject, partsOfRead);
                    } else {
                        throw new Error('[comos.ObjectReader::read]can only read on object or array');
                    }
                }

                return currentObject;
            },
            _readArrayItem: function _readArrayItem(index, array, partsOfRead) {
                index = parseInt(index);

                if (index < 0 || index >= array.length) {
                    throw new Error('[comos.ObjectReader::_readArrayItem]index is out of array limit(index:' + index + ', array:[' + comos.json.encode(array) + '], path:' + partsOfRead.join('.') + ')');
                }

                return array[index];
            },
            _readProperty: function _readProperty(property, object, partsOfRead) {
                if (!object.hasOwnProperty(property)) {
                    throw new Error('[comos.ObjectReader::_readProperty]property not found in object(property:' + property + ', object:' + comos.json.encode(object) + ', path:' + partsOfRead.join('.') + ')');
                }

                return object[property];
            },
            _isRoot: function _isRoot(path) {
                return path === this.ROOT_PATH;
            },
            _isArrayItemPart: function _isArrayItemPart(part) {
                return this.ARRAY_ITEM_PATTERN.test(part);
            },
            _extractPathParts: function _extractPathParts(path) {
                return path.split(this.PATH_SEPERATOR);
            }
        },
        DateFormatter: {
            _formatFunc: {
                Y: function Y(date) {
                    return date.getFullYear();
                },
                y: function y(date) {
                    return Number(String(new Date().getFullYear()).substr(-2));
                },
                m: function m(date) {
                    return this._pad(date.getMonth() + 1);
                },
                d: function d(date) {
                    return this._pad(date.getDate());
                },
                H: function H(date) {
                    return this._pad(date.getHours());
                },
                i: function i(date) {
                    return this._pad(date.getMinutes());
                },
                s: function s(date) {
                    return this._pad(date.getSeconds());
                }
            },
            format: function format(date, _format) {
                var that = this;
                return _format.replace(/[YymdHis]/g, function (k) {
                    var fn = that._formatFunc[k];
                    if (comos.isFunction(fn)) {
                        return fn.call(that, date);
                    }
                    return k;
                });
            },
            _pad: function _pad(v) {
                if (!comos.isString(v)) {
                    v = String(v);
                }
                return v.length > 1 ? v : '0' + v;
            }
        },
        Debugger: {
            dump: function dump() {
                console.log(Array.prototype.slice.call(arguments));
            }
        },
        addVersion: function addVersion(url) {
            var version;
            if (url === undefined) {
                return;
            }
            version = comos.isPlainObject(window.__cmsConfig) && window.__cmsConfig.version;
            if (version) {
                return comos.JsonClient.buildUrl(url, { v: version });
            } else {
                return comos.JsonClient.buildUrl(url, { v: new Date().getTime() });
            }
        },
        isDebugMode: function isDebugMode() {
            var isDebug = false;

            try {
                isDebug = comos.getQS('_debug', top.window.location.href) == '1';
            } catch (e) {
                //cross domain
                isDebug = false;
            }

            if (!isDebug) isDebug = comos.getQS('_debug', window.location.href) == '1';

            return isDebug;
        }
    });
    window['comos'] = comos;
})(window);

/***/ })

},[28]);
//# sourceMappingURL=comos.js.map