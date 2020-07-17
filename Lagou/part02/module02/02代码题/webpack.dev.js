const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    devServer: {
        host: 'localhost',
        port: '2001',
        open: true, // 启动服务时，自动打开浏览器
        hot: true, // 开启热更新功能
        contentBase: 'public'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})