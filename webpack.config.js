const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        main: './app/static/src/index.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, 'app/static/js'),
        // lazy loading时此选项对应输出目录的公开URL，默认为根目录
        publicPath: '/static/js/',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                // exclude: '',
                // options: {},
                use: ['vue-style-loader', 'style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // TODO: 若代码用到了es6的特征，uglify会报错
        // new UglifyJSPlugin({sourceMap: true}),
        new CleanWebpackPlugin([
            path.join(__dirname, 'app/static/js/')
        ]),
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
        /* 将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk，可以防止在多个bundle中重复引用 */
        // new webpack.optimize.CommonsChunkPlugin({
        //     /* 指定公共bundle的名称: https://www.webpackjs.com/guides/code-splitting */
        //     name: 'common'
        // })
    ],
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: '/node_modules/',
        poll: 1000
    },
    devtool: "inline-source-map",
    mode: "development"
}
