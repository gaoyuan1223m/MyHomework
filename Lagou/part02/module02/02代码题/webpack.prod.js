const common = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包之前清除 dist 目录
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态文件至输出目录

module.exports = merge(common, {
    mode: 'none',
    output: {
        filename: 'js/bundle-[contenthash:8].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(['public'])
    ]
})