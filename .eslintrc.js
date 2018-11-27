module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    /**
     * 如果代码中存在babel实验特性，请使用babel-eslint解析以避免误报错
     * 注意babel-eslint版本要与eslint版本严格对应
     * 参看babel-estlint进展 https://www.npmjs.com/package/babel-eslint
     * 参看babel实验特性(stage-x) https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
     */
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "rules": {
        //off=0 or warn=1 or error=2
        "indent": [
            1,
            4
        ],
        "linebreak-style": [
            0,
            "windows"
        ],
        "quotes": [
            0,
            "double"
        ],
        "semi": [
            0,
            "always"
        ],
        'no-extra-boolean-cast': 0,
        "no-console": 0,
        "no-debugger": 0,
        "no-useless-escape": 0,
        "no-cond-assign": 1,
        "no-control-regex": 0,
        "no-unused-vars": 0,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
    },
    /**
     * 指定全局变量以通过检测
     * true代表允许重写、false代表不允许重写
     */
    "globals": {
        "__Env": false,
        "comos": true,
        "$": true,
        "tinymce": true,
        "comosEditor": true,
        "define": true //兼容sea.js
    }
};