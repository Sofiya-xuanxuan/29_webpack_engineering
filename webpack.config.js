const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    //mode
    mode: 'development',
    //入口配置文件  string | array | object
    //entry:'./src/index.js',
    entry: {
        index: './src/index.js',
        list: './src/list.js',
        detail: './src/detail.js'
    },
    //出口文件
    output: {
        //必须是绝对路径
        path: path.resolve(__dirname, 'dist'),
        //[]占位符
        filename: '[name].js',
        //打包后的文件前面的前缀
        //publicPath:''
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    //file-loader
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',//[hash]哈希占位符，解决缓存entity   [ext]表示占位符
                        outputPath: 'imgs/',//图片输出目录
                        limit: 2048//⼩小于2048，才转换成base64
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    //"style-loader",//需要打包成单独的css文件，则不需要style-loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: "postcss",
                            plugins: [require('autoprefixer')]
                        }
                    },
                    "sass-loader"]//sass-loade：遇到scss后缀的文件，转成css文件，css-loader：识别.css文件，然后用style-loader将css的代码放到html的头部，是动态插入
            },
            {
                test: /\.css$/,
                use: [
                    //"style-loader",//需要打包成单独的css文件，则不需要style-loader
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: "postcss",
                            plugins: [require('autoprefixer')]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),//打包之前将dist目录删除，重新打包
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),//将css打成一个独立的文件
        new htmlWebpackPlugin({
            title: 'hello 我是首页',//页面title，可以使用ejs模板语法插入进去
            template: './index.html',//以哪个为模板
            inject: 'body',//表示打包后的js文件放到哪里
            filename: 'index.html',//输出的 HTML 文件名
            chunks: ["index"]//只允许添加一些块（例如，只允许单元测试块）
        }),
        new htmlWebpackPlugin({
            title: 'hello 我是列表页',
            template: './index.html',
            inject: 'body',//表示打包后的js文件放到哪里
            filename: 'list.html',//输出文件的名称
            chunks: ["list"]
        }),
        new htmlWebpackPlugin({
            title: 'hello 我是详情页',
            template: './index.html',
            inject: true,
            filename: 'detail.html',
            chunks: ["detail"]
        })
    ]
}