const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        main: './app/static/src/index.js',
        /* 测试lazy loading */
        test: './app/static/src/testVue.js'
    },
    /* 若使用typeScript，则需配置resolve */
    // resolve: {
    //     extensions: ['.tsx', '.ts', 'js']
    // },
    output: {
        filename: "[name].bundle.js",
        /* change to chunkhash in production */
        // filename: "[name].[chunkhash].js",
        path: path.join(__dirname, 'app/static/js'),
        /* lazy loading时此选项对应输入目录的公开URL，默认为根目录 */
        publicPath: "/static/js",
        chunkFilename: "[id].chunk.js",
        // chunkFilename: "[name].[chunkhash].js",
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
            },
            /* 配置ts的loader，此外，还需额外配置tsconfig.json */
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // }
        ]
    },
    plugins: [
        // 开发环境下不要配置生产环境下用到的工具，如uglify
        // TODO: 若代码用到了es6的特征，uglify会报错
        // new UglifyJSPlugin({sourceMap: true}),
        new CleanWebpackPlugin([
            path.join(__dirname, 'app/static/js/')
        ]),
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        /* 生产环境下配合chunkhash，防止vendor等未修改的bundle hash发生变化 */
        // new webpack.HashedModuleIdsPlugin()
    ],
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: '/node_modules/',
        poll: 1000
    },
    optimization: {
        /* 将第三方库提取到单独的vendor chunk中，可以有效利用缓存 */
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all"
                },
                commons: {
                    name: 'commons',
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    devtool: "inline-source-map",
    mode: "development"
}
