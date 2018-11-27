import BrowserValidator from './BrowserValidator';

let browserValidator = new BrowserValidator();

function checkBrowser() {
    let validateResult = browserValidator.validate(),
        status = BrowserValidator.STATUS;

    if (needReport(validateResult)) {
        reportor.report(validateResult).saveReportTime();
    }

    function needReport(validateResult) {
        let lastValidateTime = reportor.getReportTime(),
            hourRange = 0;

        if (typeof lastValidateTime !== 'number' || Number.isNaN(lastValidateTime))
            return true;

        hourRange = (Date.now() - lastValidateTime) / 1000 / 60 / 60;//计算小时

        if (validateResult.status === status.NEED_UPGRADE && hourRange > 6) {
            return true;
        } else if (validateResult.status === status.NOT_SUPPORT && hourRange > 1) {
            return true;
        } else {
            return false;
        }
    }
}

let reportor = {
    report: function (validateResult) {
        let curBrowser = validateResult.curBrowser,
            allowedBrowsers = BrowserValidator.ALLOWED_BROWSERS,
            status = BrowserValidator.STATUS,
            style = {
                p: 'font-size: 16px; line-height: 24px;',
            },
            reportHTML = '';

        if (validateResult.status === status.NEED_UPGRADE) {
            let downloadURL = allowedBrowsers.find(b => b.name === curBrowser.name).download,
                upperCastName = this.upperCaseFirst(curBrowser.name);

            reportHTML = `<p style="${style.p}">CMS只支持最新版${upperCastName}浏览器，请升级或重装浏览器; 下载地址: <b style="padding: 0 5px; font-size: 18px;">
                            ${downloadURL ? `<a class="icon-external-link-sign" href="${downloadURL}" target="_blank">${upperCastName}</a>` : upperCastName}</b>
                        浏览器</p>
                        <p style="${style.p}">请使用<b>Win7及Win7</b>以上操作系统。</p>`;
        } else if (validateResult.status === status.NOT_SUPPORT) {
            let browserNames = [],
                downloadContents = [];

            allowedBrowsers.forEach((b) => {
                let upperCaseName = this.upperCaseFirst(b.name),
                    downloadURL = b.download;

                browserNames.push(upperCaseName);
                downloadContents.push(`<a class="icon-external-link-sign" href="${downloadURL}" target="_blank">${upperCaseName}</a>`);
            });
            reportHTML = `<p style="${style.p}">CMS只支持${browserNames.join('/')}浏览器; 下载地址: <b style="padding: 0 5px; font-size: 18px;">${downloadContents.join(' / ')}</b></p>
                            <p style="${style.p}">请使用<b>Win7及Win7</b>以上操作系统。</p>`;
        } else
            reportHTML = ``;

        if (!reportHTML)
            return this;

        let comos = window.top.comos;

        if (comos && comos.ui && comos.ui.toast) {
            let toastObj = comos.ui.toast.error({
                msg: reportHTML,
                timeout: 10000000,
                position: 'bottom right',
                closeBtn: 0,
            });

            setTimeout(() => {
                toastObj.showCloseBtn();
            }, 10000);
        } else {
            let tooltipPane = document.createElement('div'),
                closeBtn = document.createElement('a');

            tooltipPane.setAttribute('style', 'position: fixed; bottom: 10px; right: 10px; border: 1px solid #dd605c; background-color: #fff1f0; color: #ca3d3b; padding: 3px 8px; line-height: 1.5em; font-size: 16px; box-shadow: 0 0 5px 1px;');
            tooltipPane.innerHTML = reportHTML;

            closeBtn.innerHTML = 'x';
            closeBtn.setAttribute('style', 'position: absolute; right: 3px; top: 3px; font-size: 14px; line-height: 1; color: #222; cursor: pointer; text-decoration: none; display: none;');

            tooltipPane.appendChild(closeBtn);
            window.top.document.body.appendChild(tooltipPane);
            setTimeout(() => {
                closeBtn.style.display = 'block';
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    tooltipPane.remove();
                });
            }, 10000);
        }

        return this;
    },
    getReportTime: function () {
        let report = null;

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
    saveReportTime: function (timestamp) {
        let report = null;

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
    isPlainObject: function (v) {
        return Object.prototype.toString.call(v) === '[object Object]';
    },
    isString: function (v) {
        return Object.prototype.toString.call(v) === '[object String]';
    },
    upperCaseFirst: function (str) {
        if (!this.isString(str)) {
            throw new Error('argument must be a string');
        }
        if (str.length < 1) {
            return str;
        }
        return str[0].toUpperCase() + str.substr(1);
    },
};

setTimeout(() => {
    checkBrowser();
}, 2000);