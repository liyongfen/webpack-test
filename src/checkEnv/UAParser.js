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

const EMPTY = '',
    NAME = 'name',
    VERSION = 'version';

let mapper = {

    rgx: function (ua, arrays) {
        let i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {

            let regex = arrays[i],       // even sequence (0,2,4,..)
                props = arrays[i + 1];   // odd sequence (1,3,5,..)
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
    },
};

let regexes = {

    browser: [[

        // Presto based
        /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
        /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
        /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
    ], [NAME, VERSION], [

        /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
    ], [[NAME, 'Opera Mini'], VERSION], [

        /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
    ], [[NAME, 'Opera'], VERSION], [

        // Mixed
        /(kindle)\/([\w\.]+)/i,                                             // Kindle
        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
        // Lunascape/Maxthon/Netfront/Jasmine/Blazer

        // Trident based
        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
        // Avant/IEMobile/SlimBrowser/Baidu
        /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

        // Webkit/KHTML based
        /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i
        // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
    ], [NAME, VERSION], [

        /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
    ], [[NAME, 'IE'], VERSION], [

        /(edge)\/((\d+)?[\w\.]+)/i                                          // Microsoft Edge
    ], [NAME, VERSION], [

        /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
    ], [[NAME, 'UCBrowser'], VERSION], [

        /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
    ], [[NAME, /_/g, ' '], VERSION], [

        /(micromessenger)\/([\w\.]+)/i                                      // WeChat
    ], [[NAME, 'WeChat'], VERSION], [

        /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
    ], [NAME, VERSION], [

        /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
    ], [NAME, VERSION], [

        /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
    ], [VERSION, [NAME, 'MIUI Browser']], [

        /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
    ], [VERSION, [NAME, 'Facebook']], [

        /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
    ], [VERSION, [NAME, 'Chrome Headless']], [

        /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
    ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

        /((?:oculus|samsung)browser)\/([\w\.]+)/i
    ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                    // Oculus / Samsung Browser

        /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
    ], [VERSION, [NAME, 'Android Browser']], [

        /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i      // Chrome/OmniWeb/Arora/Tizen/Nokia
    ], [NAME, VERSION], [

        /(dolfin)\/([\w\.]+)/i                                              // Dolphin
    ], [[NAME, 'Dolphin'], VERSION], [

        /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
    ], [[NAME, 'Chrome'], VERSION], [

        /(coast)\/([\w\.]+)/i                                               // Opera Coast
    ], [[NAME, 'Opera Coast'], VERSION], [

        /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
    ], [VERSION, [NAME, 'Firefox']], [

        /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
    ], [VERSION, [NAME, 'Mobile Safari']], [

        /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
    ], [VERSION, NAME], [

        /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
    ], [[NAME, 'GSA'], VERSION], [
        /(swiftfox)/i,                                                      // Swiftfox
        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
        // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
        // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

        // Other
        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
        // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
        /(links)\s\(([\w\.]+)/i,                                            // Links
        /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
        /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
        /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
    ], [NAME, VERSION]
    ],
};

class UAParser {
    getBrowser(uaString) {
        let ua = uaString ? String(uaString) : ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY),
            browser = { name: undefined, version: undefined };

        mapper.rgx.call(browser, ua, regexes.browser);

        let nameProp = browser[NAME];
        typeof nameProp === 'string' && (browser[NAME] = nameProp.toLowerCase());

        return browser;
    }
}

export default UAParser;