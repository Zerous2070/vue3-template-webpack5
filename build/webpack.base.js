const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index');

const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { joinPrePath, assetsPath } = require('./utils');

module.exports = {
    entry: ['./src/main.ts'],
    target: 'web',
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.tsx'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: '/.vue$/',
                loader: 'vue-loader'
            },
            {
                test: '.js$',
                use: ['babel-loader'],
                include: [joinPrePath('src')]
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: joinPrePath('tsconfig.json'),
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: assetsPath('img/[name].[contenthash:8][ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 处理静态文件夹 static 复制到打包的 static 文件夹
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: 'static'
                }
            ]
        }),
        // 创建一个新进程来执行ts类型检查，利用多核资源提升编译速度
        new ForkTsCheckerWebpackPlugin()
    ]
};
