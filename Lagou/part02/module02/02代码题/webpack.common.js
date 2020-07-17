const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 配合 vue-loader 使用，用于编译转换 .vue 文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 用于生成 index.html 文件

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // 配置 eslint-loader 检查代码规范，应用到 .js 和 .vue 文件
            {
                test: /\.(js|vue)$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
                    }
                },
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/, // 不检查的文件
                include: [__dirname + '/src'], // 要检查的目录
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            // 配置 less-loader ，应用到 .less 文件，转换成 css 代码
            {
                test: /\.less$/,
                // loader: ['style-loader', 'css-loader', 'less-loader'],
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // 值要求的是一个代码片段
            BASE_URL: JSON.stringify('')
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'lxcan vue project',
            template: './public/index.html'
        }),
    ]
}