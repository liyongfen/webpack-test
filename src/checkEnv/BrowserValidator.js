import UAParser from './UAParser';

let uaParser = new UAParser();
class BrowserValidator {
    static ALLOWED_BROWSERS = [
        {
            name: 'chrome',
            minVersion: 54,
            download: 'https://www.baidu.com/s?wd=chrome',
        }
    ];
    static STATUS = {
        OK: 0,
        NOT_SUPPORT: -1,
        NEED_UPGRADE: -2,
    };
    validate() {
        let curBrowserInfo = uaParser.getBrowser(),
            allowedBrowsers = BrowserValidator.ALLOWED_BROWSERS,
            allowedBrowser = allowedBrowsers.find(b => b.name === curBrowserInfo.name),
            STATUS = BrowserValidator.STATUS,
            result = {
                msg: '',
                status: STATUS.OK,
                curBrowser: curBrowserInfo,
                allowedBrowsers: allowedBrowsers
            };

        if (allowedBrowser) {
            let curVersion = parseInt(curBrowserInfo.version, 10);

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
}

export default BrowserValidator;