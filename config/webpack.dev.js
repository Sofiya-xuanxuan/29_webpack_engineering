const webpack = require('webpack')

const devConfig = {
    devtool: "cheap-module-eval-source-map",
    mode: 'development',
    devServer: {
        contentBase: "./dist",//资源文件目录
        open: true,//自动打开浏览器
        port: 8081,//服务器端口
        hot: true,//开启热模块功能
        hotOnly: true,//即便HMR不生效，浏览器也不自动刷新，就开启hotOnly
        proxy: {
            '/api': {
                target: 'http://localhost:9092'
            }
        }
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = devConfig