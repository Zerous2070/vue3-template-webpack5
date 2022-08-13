const webpack = require('webpack');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
const path = require('path');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createNotifierCallback, config } = require('./utils');

const devWebpackConfig = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    cache: {
        type: 'filesystem'
    },
    optimization: {
        moduleIds: 'named'
    },
    stats: 'none',
    devServer: {
        liveReload: false,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        client: {
            logging: 'error',
            overlay: {
                warnings: false,
                errors: true
            }
        },
        host: config.host,
        port: config.port,
        watchFiles: {
            paths: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
            options: {
                usePolling: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.port;
    portfinder.getPort((err, port) => {
        console.log('err,port :>>', err, port);
        if (err) {
            reject(err);
        } else {
            process.env.PORT = port;
            devWebpackConfig.devServer.port = port;

            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
                        ]
                    },
                    onErrors: createNotifierCallback()
                })
            );
            resolve(devWebpackConfig);
        }
    });
});
