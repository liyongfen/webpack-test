/**
 * Created by jiangyu3 on 2017/7/18.
 */
const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let config = module.exports = {
    context: __dirname,
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            __dirname,
            'node_modules',
        ]
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /(\.jsx|\.js)$/,
                        exclude: /(node_modules)/,
                        // exclude: function () {
                        //     console.log(arguments);
                        //     return //;
                        // },
                        use: [
                            'babel-loader?cacheDirectory=true',
                            //'babel-loader',
                            'eslint-loader'
                        ]
                    },
                    {
                        test: /\.css$/,
                        loader: 'style-loader!css-loader?sourceMap!postcss-loader',
                    },
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            //'css-loader',
                            {
                                loader: 'css-loader',
                                options: Object.assign({
                                    modules: true,
                                    localIdentName: '[hash:base64:8]'
                                },{}),
                            },
                            'postcss-loader',
                            'less-loader',
                        ]
                    },
                    {
                        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)(\?.*)?$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    outputPath: 'assets/',
                                    // emitFile: false,
                                },
                            }
                        ]
                    },
                    {// support artTemplate.js
                        test: /\.tmpl$/,
                        use: 'raw-loader'
                    },
                ]
            },
        ]
    },
    entry: {
        './dist/vendor': ['react', 'react-dom', 'prop-types'],
        './dist/doclist/bundle': './src/doclist/index',
        './dist/userLog/bundle': './src/userLog/index',
        './dist/checkEnv/bundle': './src/checkEnv/index',
        './dist/comos/comos': './src/comos/comos',
    },
    output: {
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.min.js?[chunkhash:8]',
        publicPath: './src/',
    }
};
config.plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,//美化代码
        mangle: {// js混淆
            screw_ie8: true,//clean ie8 related code
            keep_fnames: true//keep function name
        },
        sourceMap: true,
        compress: {
            screw_ie8: true,
            drop_console: false,
            drop_debugger: false
        },
        comments: false
    }),
    new CommonsChunkPlugin({
        name: './dist/vendor',
        chunks: Object.keys(config.entry).filter(n => ['./src/comos/comos', './dist/checkEnv/bundle'].indexOf(n) === -1)
    }),
    // new CommonsChunkPlugin({
    //     name: './dist/xxx/bundle',
    //     chunks: Object.keys(config.entry).filter(n => ['./dist/vendor', './src/comos/comos', './dist/checkEnv/bundle'].indexOf(n) === -1)
    // }),
];